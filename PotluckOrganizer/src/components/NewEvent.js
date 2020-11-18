import React, {useState} from 'react';

export const NewEvent = () => {
    const [form, setForm] = useState({
        event_id: 1,
        event_name: "",
        description: "",
        organizer_id: 1,
        date: "",
        time: ""
    });

    return (
        <div>
            <h2>Create a new event:</h2>
            <form>
               
            </form>
        </div>
    )
};