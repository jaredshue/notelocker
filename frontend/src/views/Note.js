import React, { useState, useEffect } from "react";

function Note() {
    const [noteData, setNoteData] = useState("");

    const getData = async () => {
        const response = await fetch("http://localhost:3000/notes/ae1a824fe857f86a7e7e777c210e2c673abfba3ac8ae3fdd3bbcf51110f5c98c", {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            redirect: "follow"
        });

        const data = await response.json();
        setNoteData(JSON.stringify(data));
    }

    useEffect(() => { getData() }, []);

    return (
        <div>{noteData}</div>
    )

}

export default Note;
