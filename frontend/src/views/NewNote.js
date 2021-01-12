import React from 'react'

function NewNote() {
    const handleClick = (event) => {
        const newnote = document.getElementById("newnote").value
        const password = document.getElementById("password").value
    }

    return (
        <div>
            <textarea id="newnote"/>
            <input type="password" id="password"/>
            <button onClick={handleClick}/>
        </div>
    );
}

export default NewNote;