import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from '../context/UserContext';
import {useHistory, Link, useParams} from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import {AddGuest} from './AddGuest';

export const EditEvent = () => {
    const {user} = useContext(UserContext)
    const {push} = useHistory()
    const {id} = useParams()
    const [event, setEvent] = useState([])

    //getting entire current event by id.
    useEffect(() => {
        axiosWithAuth()
            .get(`/events/${id}`)
            .then((res) => {
                console.log("res", res)
                setEvent(res.data.event)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    console.log("Event", event)
    
    const [form, setForm] = useState({
        event_name: event.event_name,
        description: event.description,
        date: event.date,
        time: event.time
    })

    const handleChanges = (e) => {
        e.persist();
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        console.log(form)
    }

    const EditEvent = (e) => {
        e.preventDefault()
        axiosWithAuth()
            .put(`/events/${id}`, form)
            .then((res) => {
                console.log(res)
            })
            .catch(err=> {
                console.log(err)
            })
        push('/homepage')
    }

    return (
        <>
            <h2>{user.username}, edit {event.event_name}:</h2>
            <form onSubmit={EditEvent}>
                <label htmlFor='event_name'>
                    Event Name:
                    <input
                        name='event_name'
                        id='event_name'
                        onChange={handleChanges}
                        placeholder={event.event_name}
                    ></input>
                </label>

                <br></br>

                <label>
                    Description:
                    <input type='textarea'
                        name='description'
                        id='description'
                        onChange={handleChanges}
                        placeholder={event.description}
                    ></input>
                </label>

                <br></br>

                <label>
                    Date:
                    <input
                        name='date'
                        id='date'
                        onChange={handleChanges}
                        placeholder={event.date}
                    ></input>
                </label>

                <br></br>

                <label>
                    Time:
                    <input
                    name='time'
                    id='time'
                    onChange={handleChanges}
                    placeholder={event.time}
                    ></input>
                </label>

                <br></br>

                <button type="submit">Submit</button>
                <Link to="/homepage"><button>Cancel</button></Link>
            </form>

            <br></br>
            
            <AddGuest/>
    </>
    )
};