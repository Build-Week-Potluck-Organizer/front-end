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
        event_name: event.event_name,
        description: event.description,
        date: event.date,
        time: event.time
    })

    const [guest, setGuest] = useState({
              "guest_id": 0,
              "username": "",
              "event_id": event,
              "attending": false
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

    const handleGuestChanges = (e) => {
        e.persist();
        setGuest({
            ...guest,
            [e.target.name]: e.target.value
        })
        console.log(guest)
    }

    const AddGuest = (e) => {
        e.preventDefault()
        axiosWithAuth() 
            .post(`/api/events/${event}/guestlist`, guest)
            .then((res) => {
                console.log("res", res)
            })
            .catch((err) => {
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
                    Description:
                    <input type='textarea'
                        name='description'
                        id='description'
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
                <Link to="/homepage"><button>Cancel</button></Link>
            </form>

            <h2>Invite a guest:</h2>
                <form onSubmit={AddGuest}>
                <label>
                    Guest id:
                    <input
                        name='guest_id'
                        id='guest_id'
                        onChange={handleGuestChanges}
                    ></input>
                </label>
                <br></br>
                <label>
                    Username:
                    <input
                        name='username'
                        id='username'
                        onChange={handleGuestChanges}
                    ></input>
                </label>
                <br></br>
                <button type="submit">Invite</button>
                </form>
        </div>
    )
};