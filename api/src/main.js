require("dotenv").config();

const cors = require("cors");
const uuid = require("uuid");
const express = require("express");
const database = require("./database.js");

const app = express();

app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

async function prepareDatabase() {
    try {
        await database.from("notes").select("*");
    }
    catch {
        try {
            console.log("migrating database...");
            database.migrate.latest();
            console.log("database migrated!");
        }
        catch {
            console.log("failed to migrate database!");
        }
    }
}

const SERVER_LISTEN_PORT = 3001;

app.post("/notes", async (req, res) => {
    var keys = Object.keys(req.body);
    if (keys.length !== 2 || !keys.includes("hash") || !keys.includes("note")) {
        res.status(400).json({ error: "Bad request" });
        return;
    }

    if (typeof(req.body.hash) !== "string" || req.body.hash.length % 2 !== 0) {
        res.status(400).json({ error: "Bad request" });
        return;
    }

    if (typeof(req.body.note) !== "string" || req.body.note.length % 2 !== 0) {
        res.status(400).json({ error: "Bad request" });
        return;
    }

    var validCharacters = "0123456789abcdefABCDEF";
    for (var i = 0; i < req.body.hash.length; i++) {
        if (!validCharacters.includes(req.body.hash[i])) {
            res.status(400).json({ error: "Bad request" });
            return;
        }
    }

    for (var i = 0; i < req.body.note.length; i++) {
        if (!validCharacters.includes(req.body.note[i])) {
            res.status(400).json({ error: "Bad request" });
            return;
        }
    }

    try {
        var guid;

        for (var i = 0; i < 5; i++) {
            guid = uuid.v1();

            var notes = await database
                .select("guid")
                .from("notes")
                .where("guid", guid);

            if (notes.length === 0) {
                break;
            }

            if (i === 4) {
                res.status(500).json({ error: "An unknown problem occured" });
                return;
            }
        }

        await database.into("notes").insert({
            guid: guid,
            hash: req.body.hash,
            note: req.body.note
        });

        res.status(200).json({ guid: guid });
    }
    catch {
        res.status(500).json({ error: "Failed to add note to database" });
    }
});

app.get("/notes/:guid", async (req, res) => {
    try {
        var notes = await database
            .select("*")
            .from("notes")
            .where("guid", req.params.guid);

        if (notes.length === 0) {
            res.status(410).json({ error: "Note does not exist" });
            return;
        }

        res.status(200).json({ guid: notes[0].guid, note: notes[0].note });
    }
    catch {
        res.status(500).json({ error: "Failed to retrieve note from the database" });
    }
})

app.delete("/notes/:guid", async (req, res) => {
    var keys = Object.keys(req.body);
    if (keys.length !== 2 || !keys.includes("guid") || !keys.includes("hash")) {
        res.status(400).json({ error: "Bad request" });
        return;
    }

    if (typeof(req.body.guid) !== "string" || req.body.guid.length % 2 !== 0) {
        res.status(400).json({ error: "Bad request" });
        return;
    }

    if (typeof(req.body.hash) !== "string" || req.body.hash.length % 2 !== 0) {
        res.status(400).json({ error: "Bad request" });
        return;
    }

    var validCharacters = "0123456789abcdefABCDEF-";

    for (var i = 0; i < req.body.guid.length; i++) {
        if (!validCharacters.includes(req.body.guid[i])) {
            res.status(400).json({ error: "Bad request" });
            return;
        }
    }

    validCharacters = "0123456789abcdefABCDEF";
    for (var i = 0; i < req.body.hash.length; i++) {
        if (!validCharacters.includes(req.body.hash[i])) {
            res.status(400).json({ error: "Bad request" });
            return;
        }
    }

    try {
        var notes = await database
            .select("*")
            .from("notes")
            .where("guid", req.body.guid);

        if (notes.length === 0) {
            res.status(410).json({ error: "Note does not exist" });
            return;
        }

        if (notes[0].hash !== req.body.hash) {
            res.status(422).json({ error: "Incorrect hash" });
            return;
        }

        try {
            await database
                .from("notes")
                .where("guid", req.body.guid)
                .delete();
        }
        catch {
            res.status(500).json({ error: "Failed to delete note from database" });
            return;
        }

        res.status(200).json({ success: true });
    }
    catch {
        res.status(500).json({ error: "Failed to retrieve note from the database" });
    }
});

async function main() {
    await prepareDatabase();

    app.listen(SERVER_LISTEN_PORT, () => {
        console.log(`Server listening at port ${SERVER_LISTEN_PORT}!`);
    });
}

main();

module.exports = app;
