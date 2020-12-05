import axios from 'axios';
import React, {useState, useContext} from 'react';
import {EventContext} from '../context/EventContext';
import {useHistory, Link} from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';

export const EditEvent = () => {
    const user = {
        id: parseInt(localStorage.getItem("id")),
        username: localStorage.getItem("username")
    }
    const {event} = useContext(EventContext)
    console.log(event)
    const {push} = useHistory();
    const [form, setForm] = useState({
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
        e.preventDefault()
        axiosWithAuth()
            .put(`/api/events/${event}`, form)
            .then((res) => {
                console.log(res)
            })
            .catch(err=> {
                console.log(err)
            })
        push('/homepage')
    }


    return (
        <div>
            <h2>Edit event:</h2>
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
                <button type="submit">Submit</button>
            </form>
        </div>
    )
};