import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from '../context/UserContext';
import {useHistory, Link, useParams} from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';

export const AddGuest = () => {
    const {user} = useContext(UserContext)
    const {push} = useHistory()
    const {id} = useParams()
    const [guests, setGuests] = useState([])

    //getting event guestlist by id.
    useEffect(() => {
        axiosWithAuth()
            .get(`/events/${id}`)
            .then((res) => {
                setGuests(res.data.guestlist)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    console.log("guests", guests)


    /* users can not be added as guests to events because guest_id is an autoincrementing primary key. There are
    no foreign keys which can point to a user. :( */
    const [form, setForm] = useState({
              guest_id: guests.guest_id,
              username: guests.guest_name,
              event_id: id,
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
            .post(`/events/${id}/guestlist`, form)
            .then((res) => {
                alert('Guest added successfully!')
                console.log(res)
            })
            .then((err) => {
                alert('Guest could not be added')
                console.log(err)
            })
    }

    return (
    <>
             {guests.length >= 1 ? guests.map((el) => {
                return <p>{el.guest_name}</p>
            }) : <p>You have not invited anyone to this event.</p>}
           <h2>Invite a guest:</h2>
                <form onSubmit={AddGuest}>
                <label>
                    Guest id:
                    <input
                        name='guest_id'
                        id='guest_id'
                        onChange={handleChanges}
                    ></input>
                </label>
                <br></br>
                <label>
                    Username:
                    <input
                        name='username'
                        id='username'
                        onChange={handleChanges}
                    ></input>
                </label>
                <br></br>
                <button type="submit">Invite</button>
           </form>
    </>
    )
};