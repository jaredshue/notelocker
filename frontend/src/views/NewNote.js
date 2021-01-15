import React from "react";
const crypto = require("crypto");

function NewNote() {
    const [ state, setState ] = React.useState({});

    const createHash = (message, key) => {
        var hmac = crypto.createHmac("sha256", key);
        hmac.update(message);
        return hmac.digest("hex");
    }

    const encryptNote = (message, key) => {
        var iv = crypto.randomBytes(16);
        var cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
        var ct = cipher.update(message, "utf8", "hex");
        ct += cipher.final("hex");

        return `${iv.toString("hex")}${ct}`;
    }

    const createKey = (password) => {
        return crypto.pbkdf2Sync(
            password,
            crypto.createHash("sha256")
                .update(password)
                .digest(),
            256000,
            32,
            "sha256"
        );
    }

    const handleClick = async (event) => {
        const note = document.getElementById("note").value;
        const password = document.getElementById("password").value;

        var key = createKey(password);

        var response = await fetch("http://localhost:3001/notes", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                hash: createHash(note, key),
                note: encryptNote(note, key)
            })
        });

        if (response.status === 200) {
            var data = await response.json();
            setState({ ...state, guid: data.guid });
        }
    }
    const togglePassword = () => {
        var x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    return (
        <div className= "return-page">
            {
                !state.guid
                ? (
                    <div className="container">
                        <textarea id="note" placeholder="enter note"/>
                        <input type="password" id="password" placeholder="enter password" />
                        <input type="checkbox" onClick={ togglePassword }/>Show Password
                        <button id="submit" onClick={ handleClick }> Submit </button>
                    </div>
                )
                : (
                    <>
                        <h1 className='text'>
                            Your note has been created! <br />
                            <a href={`http://localhost:3000/view?guid=${state.guid}`}>
                                http://localhost:3000/view?guid={ state.guid }
                            </a>
                        </h1>
                    </>
                )
            }

        </div>
    )
}

export default NewNote;
