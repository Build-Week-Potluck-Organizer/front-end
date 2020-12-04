import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {UserContext} from "../context/UserContext";
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
    const {push} = useHistory();
    const user = {
        id: parseInt(localStorage.getItem('id')),
        username: localStorage.getItem('username')
    }
    const [events, setEvents] = useState()

    useEffect(() => {
        axiosWithAuth()
            .get(`/api/users/${user.id}/events`)
            .then((res) => {
                console.log(res.data)
                setEvents(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    console.log("events", events)
    return (
        <>
        {!localStorage.getItem("token") ? push('/login'):
        <div>
            <h2>Welcome, {user.username}!</h2>
            <Link to='/newevent'><button>Create an event</button></Link>
            <Header3>Your Events</Header3>
            {events ? events.map((el) => {
                return <p>{el.event_name}</p>
            }) : <p>you have no events</p>}
        <Break></Break>
        </div>}
        </>
    )
};