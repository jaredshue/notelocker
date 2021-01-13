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
        const note = document.getElementById("note").value;
        const password = document.getElementById("password").value;

        var response = await fetch("http://localhost:3001/notes", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                note: createNote(note, password)
            })
        });

        if (response.status === 200) {
            var data = await response.json();
            setState({ ...state, guid: data.guid });
        }
    }

    return (
        <div>
            {
                !state.guid
                ? (
                    <>
                        <textarea id="note" />
                        <input type="password" id="password" />
                        <button onClick={ handleClick } />
                    </>
                )
                : (
                    <>
                        <p>
                            Your note has been created! <br />
                            <a href={`http://localhost:3000/view?guid=${state.guid}`}>
                                http://localhost:3000/view?guid={ state.guid }
                            </a>
                        </p>
                    </>
                )
            }

        </div>
    );
}

export default NewNote;
