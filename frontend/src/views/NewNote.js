import React from "react";
const crypto = require("crypto");

function NewNote() {
    const [ state, setState ] = React.useState({});

    const createNote = (message, password) => {
        var salt = crypto.createHash("sha256").update(password).digest();
        var key = crypto.pbkdf2Sync(password, salt, 256000, 32, "sha256");
        var iv = crypto.randomBytes(16);
        var cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
        var ct = cipher.update(message, "utf8", "hex");
        ct += cipher.final("hex");

        return `${iv.toString("hex")}${ct}`;
    }

    const handleClick = async (event) => {
        const newnote = document.getElementById("newnote").value;
        const password = document.getElementById("password").value;

        var response = await fetch("http://localhost:3001/notes", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                note: createNote(newnote, password)
            })
        });
        console.log(response); //cors 500 error when posting
        // if(response.status == 200){
        //     setState({...state, guid: response.body.note.guid})
        // }
    }

    return (
        <div>
            <textarea id="newnote" />
            <input type="password" id="password" />
            <button onClick={ handleClick } />
        </div>
    );
}

export default NewNote;
