import React, {useState} from 'react';

export const NewEvent = () => {
    const [form, setForm] = useState({
        
        });


    return (
        <div>
            <h2>Create a new event:</h2>
            <form>
                <label>
                    Event Name:
                    <input></input>
                </label>
                <br></br>
                <label>
                    Description:
                    <input type='textbox'></input>
                </label>
                <br></br>
                <label>
                    Date:
                    <input></input>
                </label>
                <br></br>
                <label>
                    Time:
                    <input></input>
                </label>
            </form>
        </div>
    )
};