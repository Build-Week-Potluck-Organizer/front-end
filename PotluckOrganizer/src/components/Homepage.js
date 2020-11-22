import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {UserContext} from "../context/UserContext";
import { axiosWithAuth } from '../utils/axiosWithAuth';
import {axios} from 'axios'

const Break = styled.hr`
    width: 75%;
    margin-top: 30px;
`;

const Header3 = styled.h3`
    margin-right: 50%;
`;

const Flex = styled.div`
    width: 60%;
    display: flex;
    justify-content: space-evenly;
    margin-left: 20%;
`;

export const Homepage = () => {
    const {user, setUser, loggedIn} = useContext(UserContext);
    const [events, setEvents] = useState({
        
    });

    console.log('user', user)
    console.log('loggedIn', loggedIn)
    
    useEffect(() => {
        axiosWithAuth()
            .get(`/users/${user.id}/events`)
            .then(res => {
                console.log('events', res)
                setEvents(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])


        // axiosWithAuth()
        //     .get(`/users/${user.id}/events`)
        //     .then(res => {
        //         console.log('events', res)
        //         setEvents(res.data)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
        
    // const Delete = (e) => {
    //     axiosWithAuth()
    //         .delete(`/events/${e.target.id}`)
    //         .then(res => {
    //             console.log('delete', res)
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }

    return (
        <div>
            <h2>Welcome, {user.username}!</h2>
            <Link to='/newevent'><button>Create an event</button></Link>
            <Header3>Your Events</Header3>
            {/* {events.length > 1 ? 
                events.map((el) => {
                    return (
                        <Flex>
                            <p>{el.event_name}</p>
                            <Link to='/editevent'><button>Edit</button></Link>
                            <button id={el.event_id}>Delete</button>
                        </Flex>
                    )
                }) : <p>You have no events</p>
        } */}
        </div>
    )
};