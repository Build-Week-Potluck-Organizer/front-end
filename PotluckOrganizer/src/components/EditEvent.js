import React from 'react';

export const EditEvent = () => {
    return (
        <div>
            <h2>Change event:</h2>
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
                <br></br>
                <button>Submit</button>
            </form>
        </div>
    )
}