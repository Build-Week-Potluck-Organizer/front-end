import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from '../context/UserContext';
import {useHistory, Link, useParams} from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';

export const AddGuest = () => {
    const {user} = useContext(UserContext)
    const {push} = useHistory()
    const {id} = useParams()
    const [guests, setGuests] = useState([])

    //getting entire current event by id.
    useEffect(() => {
        axiosWithAuth()
            .get(`/events/${id}`)
            .then((res) => {
                console.log("res", res)
                setGuests(res.data.guestlist)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    console.log("guests", guests)

    const [guestForm, setGuestForm] = useState({
              guest_id: null,
              username: "",
              event_id: {id},
              attending: false
            })

    const handleChanges = (e) => {
        e.persist();
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const AddGuest = (e) => {
        e.preventDefault()
        axiosWithAuth()
            .post(`/events/${id}/guestlist`)
            .then((res) => {
                console.log(res)
            })
    }

    const handleGuestChanges = (e) => {
        e.persist();
        setGuestForm({
            ...guestForm,
            [e.target.name]: e.target.value
        })
    }

    // const AddGuest = (e) => {
    //     e.preventDefault()
    //     axiosWithAuth() 
    //         .post(`/events/${event}/guestlist`, guest)
    //         .then((res) => {
    //             console.log("res", res)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    //     push('/homepage')
    // }

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
            {guests.length >= 1 ? guests.map((el) => {
                return <p>{el.guest_id}</p>
            }) : <p>You have not invited anyone to this event.</p>}
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
    </>
    )
};