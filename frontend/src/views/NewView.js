import React, { useState } from "react";
import "./NewView.css";
import Note from "./Note";


function NewView() {

    const [ password, setPassword ] = useState("");
    const [ renderSumbit, setRenderSumbit ] = useState(false);
    const mockPassword = "fjewofj32oijf"

    return (
        <>
            <div className="enter-password">
                <h1>Password: </h1>
                <input type="text" onChange={e => setPassword(e.target.value)} placeholder="enter password" ></input>
                {/* after MVP: toggle password visibility*/}
                <button onClick={() => { setRenderSumbit(true) }} id="sumbitted-password">Sumbit</button>

            </div>

            {
                // if the password is correct, we will make an GET request from the API
                renderSumbit === true && password === mockPassword &&
                <>
                    <h1>the entered password is: {password} </h1>
                    <h1>Here is your note: <Note />   </h1>
                </>
                // Note we want to get - create_notes.js : ae1a824fe857f86a7e7e777c210e2c673abfba3ac8ae3fdd3bbcf51110f5c98c
            }
            {
                // if the password is wrong
                renderSumbit === true && password !== mockPassword &&
                <h1>wrong password</h1>
            }
        </>
    );
}

export default NewView;
