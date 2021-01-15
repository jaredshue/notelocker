import React from "react";

const crypto = require("crypto");

function ViewNote() {
    var query = new URLSearchParams(window.location.search);

    const [ state, setState ] = React.useState({
        note: undefined,
        decrypted: false,
        errors: 0
    });

    React.useEffect(() => {
        var getData = async () => {
            var response = await fetch(`http://localhost:3001/notes/${query.get("guid")}`);

            if (response.status === 200) {
                var data = await response.json();

                setState({ ...state, note: data });
            }
            else {
                setState({ ...state, note: null });
            }
        }

        if (state.note !== undefined) return;

        getData();
    });

    const createHash = (message, key) => {
        var hmac = crypto.createHmac("sha256", key);
        hmac.update(message);
        return hmac.digest("hex");
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

    const decryptNote = (note, key) => {
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
            var key = createKey(password);
            var note = decryptNote(state.note.note, key);
            var hash = createHash(note, key);

            var response = await fetch(`http://localhost:3001/notes/${state.note.guid}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    guid: state.note.guid,
                    hash: hash
                })
            });

            if (response.status === 200) {
                setState({
                    ...state,
                    note: {
                        ...state.note,
                        note: note
                    },
                    decrypted: true,
                    errors: 0
                });
            }
        }
        catch {
            setState({ ...state, errors: state.errors + 1 });
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
        <>
            {
                !state.decrypted && state.note !== null
                ? (
                    <>
                        <h2 className='text'>Password: </h2>
                        <input type="password" id="password" placeholder="enter password" />
                        <p className='togglePassword'><input type="checkbox"onClick={ togglePassword }/>  Show Password</p> 
                        <button onClick={ attemptPassword }>Submit</button>
                        {
                            state.errors !== 0
                            ? (<h1 className='text'>Wrong password!</h1>)
                            : null
                        }
                    </>
                )
                : (
                    <>
                        {
                            state.decrypted
                            ? <h1 className='text'>{ state.note.note }</h1>
                            : <h1 className='text'>That note does not exist!</h1>
                        }
                    </>
                )
            }
        </>
    );
}

export default ViewNote;
