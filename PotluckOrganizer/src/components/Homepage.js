import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {EventContext} from "../context/EventContext";
import { axiosWithAuth } from '../utils/axiosWithAuth';
import {useHistory} from 'react-router-dom';

const Break = styled.hr`
    width: 75%;
    margin-top: 30px;
`;

const Header3 = styled.h3`
    margin-right: 50%;
`;

const Flex = styled.div`
    width: 50%;
    display: flex;
    justify-content: space-evenly;
    margin-left: 25%;
    margin-top: 20px;
`;

const Button = styled.button`
    width: 55px;
    height: 25px; 
`;

const FlexButtons = styled.div`
    width: 25%;
    display: flex;
    justify-content: space-evenly;
    margin-top: 15px;
`;

export const Homepage = () => {
    const user = {
        id: parseInt(localStorage.getItem("id")),
        username: localStorage.getItem("username")
      }
    const {push} = useHistory();
    const [allEvents, setAllEvents] = useState()
    const {setEvent} = useContext(EventContext)

    useEffect(() => {
        axiosWithAuth()
            .get(`/api/events`)
            .then((res) => {
                setAllEvents(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    //there is no endpoint for a user's events so I had to extract the specifics user's event from all events

    const Delete = (e) => {
        //delete endpoint returns the event being deleted, not all events without the deleted item
        axiosWithAuth()
            .delete(`/api/events/${e.target.id}`)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const Edit = (e) => {
        setEvent(e.target.id)
        push('/editevent')
    }

    return (
        <>
        {!localStorage.getItem("token") ? push('/login'):
        <div>
            <h2>Welcome, {user.username}!</h2>
            <Link to='/newevent'><button>Create an event</button></Link>
            <Header3>Your Events</Header3>
                {allEvents ? allEvents.map((el) => {
                    //looped through all events to extract user's events
                    if (el.organizer_id === user.id) {
                        return (
                            <Flex key={el.event_id}>
                                <p>{el.event_name}</p>
                                <FlexButtons>
                                    <Button id={el.event_id} onClick={Edit}>Edit</Button>
                                    <Button id={el.event_id} onClick={Delete}>Delete</Button>
                                </FlexButtons>
    
                            </Flex>
                        )
                    }
                }) : <p>You have no events.</p>}
        <Break></Break>
        </div>}
        </>
    )
};