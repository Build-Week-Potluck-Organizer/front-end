import axios from 'axios';
import React, {useState, useContext} from 'react';
import {UserContext} from '../context/UserContext';
import {useHistory, Link} from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';

export const NewEvent = () => {
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

    const Submit = () => {
        axiosWithAuth()
            .post(`/events`, form)
            .then((res) => {
                console.log('created an event', res)
                push('/homepage')
            })
            .catch(err=> {
                console.log(err)
            })
        push('/homepage')
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
                <button type="submit">Submit</button>
            </form>
        </div>
    )
};