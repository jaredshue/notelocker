import React from "react";
import "./NewView.css";

const crypto = require("crypto");

function NewView() {
    var query = new URLSearchParams(window.location.search);

    const [ state, setState ] = React.useState({
        note: null,
        decrypted: false,
        errors: 0
    });

    React.useEffect(async () => {
        if (state.note !== null) return;

        var response = await fetch(`http://localhost:3001/notes/${query.get("guid")}`);

        if (response.status === 200) {
            var data = await response.json();

            setState({ ...state, note: data });
        }
    });

    const readNote = (note, password) => {
        var salt = crypto.createHash("sha256").update(password).digest();
        var key = crypto.pbkdf2Sync(password, salt, 256000, 32, "sha256");

        var buffer = Buffer.from(note, "hex");
        var iv = buffer.slice(0, 16);
        var data = buffer.slice(16, buffer.length);
        var cipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
        var pt = cipher.update(data, "hex", "utf8");
        pt += cipher.final("utf8");

        return pt;
    }

    const attemptPassword = async () => {
        const password = document.getElementById("password").value;

        try {
            var contents = readNote(state.note.note, password);

            setState({
                ...state,
                note: {
                    ...state.note,
                    note: contents
                },
                decrypted: true,
                errors: 0
            });
        }
        catch {
            setState({ ...state, errors: state.errors + 1 });
        }
    }

    return (
        <>
            {
                !state.decrypted && state.note !== null
                ? (
                    <>
                        <h2>Password: </h2>
                        <input type="text" id="password" placeholder="enter password" />
                        <button onClick={ attemptPassword }>Submit</button>
                        {
                            state.errors !== 0
                            ? (<h1>Wrong password!</h1>)
                            : (null)
                        }
                    </>
                )
                : (
                    <>
                        {
                            state.decrypted
                            ? <p>{ state.note.note }</p>
                            : <h1>That note does not exist!</h1>
                        }
                    </>
                )
            }
        </>
    );
}

export default NewView;
