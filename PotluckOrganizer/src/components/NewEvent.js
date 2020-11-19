import axios from 'axios';
import React, {useState, useContext} from 'react';
import {UserContext} from '../App';
import {useHistory} from 'react-router-dom';

export const NewEvent = () => {
    const {push} = useHistory();
    const [form, setForm] = useState({
        organizer_id: 1,
        event_name: "",
        date: "",
        time: ""
    }) 

    const handleChanges = (e) => {
        e.persist();
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        console.log(form)
    }

    const Submit = (e) => {
        e.preventDefault();
        axios
            .post(`https://build-week-potluck-organizer.herokuapp.com/api/events/`, form)
            .then((res) => {
                console.log(res)
            })
            .catch(err=> {
                console.log(err)
            })
            push('/homepage');
    }


    return (
        <div>
            <h2>Create a new event:</h2>
            <form onSubmit={Submit}>
                <label
                >
                    Event Name:
                    <input
                    name='event_name'
                    id='event_name'
                    onChange={handleChanges}
                    ></input>
                </label>
                <br></br>
                <label>
                    Date:
                    <input
                        name='date'
                        id='date'
                        onChange={handleChanges}
                    ></input>
                </label>
                <br></br>
                <label>
                    Time:
                    <input
                    name='time'
                    id='time'
                    onChange={handleChanges}
                    ></input>
                </label>
                <br></br>
                <button>Submit</button>
            </form>
        </div>
    )
};