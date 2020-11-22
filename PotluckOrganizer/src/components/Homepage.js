import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {UserContext} from "../context/UserContext";
import { axiosWithAuth } from '../utils/axiosWithAuth';
import {axios} from 'axios'
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
    const {user, loggedIn} = useContext(UserContext);
    const [events, setEvents] = useState({});

    console.log('user', user)
    
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
        <>
        {!loggedIn ? push('/login'):
        <div>
            <h2>Welcome, {user.username}!</h2>
            <Link to='/newevent'><button>Create an event</button></Link>
            <Header3>Your Events</Header3>
            {events.length > 1 ? 
                events.map((el) => {
                    return (
                        <Flex>
                            <p>{el.event_name}</p>
                            <FlexButtons>
                                <Link to='/editevent'><Button>Edit</Button></Link>
                                <Button id={el.event_id}>Delete</Button>
                            </FlexButtons>
                            
                        </Flex>
                    )
                }) : <p>You have no events</p>
        }
        <Break></Break>
        </div>}
        </>
    )
};