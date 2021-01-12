require("dotenv").config();

const express = require("express");
const database = require("./database.js");

const app = express();
const uuid =require("uuid");

app.use(express.json());

const SERVER_LISTEN_PORT = 3001;

app.post("/notes", async (req, res) =>{
    var keys = Object.keys(req.body)
    if(keys.length != 1 || !keys.includes("note")){
        res.status(400).json({error: "Bad Request"})
        return
    }

    if(typeof(req.body.note) != "string"){
        res.status(400).json({error: "Bad Request"})
        return
    }

    if(req.body.note.length%2 != 0){
        res.status(400).json({error: "Bad Request"})
        return
    }
    var validChars = "0123456789abcdefABCDEF"
    for(var i = 0; i < req.body.note.length; i++){
        if(!validChars.includes(req.body.note[i])){
            res.status(400).json({error: "Bad Request"})
            return
        }
    }

    try{
        var guid;

        for(var i = 0; i < 5; i++){
            guid = uuid.v1()
            var notes = await database.select("guid").from("notes").where("guid", guid)
            if(notes.length == 0)
                break
            if(i == 4){
                res.status(500).json({error: "Unknown problem occured"})
                return
            }
        }

        await database.into("notes").insert({
            guid: guid,
            note: req.body
        })
        res.status(200).json({guid: guid})
    }catch{
        res.status(500).json({error: "Failed to add note to database"})
    }
})

app.listen(SERVER_LISTEN_PORT, () => {
    console.log(`Server listening at port ${SERVER_LISTEN_PORT}!`);
});

module.exports = app
