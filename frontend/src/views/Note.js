import React, { useState, useEffect } from "react";

function Note() {
    const [noteData, setNoteData] = useState("");

    const getData = async () => {
        const response = await fetch("http://localhost:3001/notes/bdc048c0-551d-11eb-8291-7733037ea32b", {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            redirect: "follow"
        });

        const data = await response.json();
        setNoteData(JSON.stringify(data.note));
    }

    useEffect(() => { getData() }, []);

    return (
        <div>{noteData}</div>
    )
}

export default Note;