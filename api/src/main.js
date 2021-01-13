require("dotenv").config();

const cors = require("cors");
const uuid = require("uuid");
const express = require("express");
const database = require("./database.js");

const app = express();

app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

const SERVER_LISTEN_PORT = 3001;

app.post("/notes", async (req, res) => {
    var keys = Object.keys(req.body);
    if (keys.length !== 1 || !keys.includes("note")) {
        res.status(400).json({ error: "Bad request" });
        return;
    }

    if (typeof(req.body.note) !== "string"){
        res.status(400).json({ error: "Bad request" });
        return;
    }

    if (req.body.note.length % 2 !== 0) {
        res.status(400).json({ error: "Bad request" });
        return;
    }

    var validCharacters = "0123456789abcdefABCDEF";
    for(var i = 0; i < req.body.note.length; i++){
        if(!validCharacters.includes(req.body.note[i])){
            res.status(400).json({ error: "Bad request" });
            return;
        }
    }

    try {
        var guid;

        for (var i = 0; i < 5; i++){
            guid = uuid.v1();

            var notes = await database
                .select("guid")
                .from("notes")
                .where("guid", guid);

            if (notes.length === 0) {
                break;
            }

            if (i == 4){
                res.status(500).json({ error: "An unknown problem occured" });
                return;
            }
        }

        await database.into("notes").insert({
            guid: guid,
            note: req.body
        });

        res.status(200).json({ guid: guid });
    }
    catch {
        res.status(500).json({ error: "Failed to add note to database" });
    }
})

app.listen(SERVER_LISTEN_PORT, () => {
    console.log(`Server listening at port ${SERVER_LISTEN_PORT}!`);
});

module.exports = app
