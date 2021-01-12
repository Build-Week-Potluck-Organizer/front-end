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
    const {user} = useContext(UserContext); 
    const {push} = useHistory();
    const [eventsNoPrimaryKey, setEventsNoPrimaryKey] = useState([]);
    const [userEvents, setUserEvents] = useState([]);
    const [allEvents, setAllEvents] = useState([]);
    const [allInvites, setAllInvites] = useState([]);
    const [userInvites, setUserInvites] = useState([]);

    useEffect(() => {
        /*gets user events. Data does not include primary key for each event. Only name and description which is
            not unique*/
        axiosWithAuth()
            .get(`/users/${user.id}/events`)
            .then((res) => {
                setEventsNoPrimaryKey(res.data)
            })
        /*gets all events. More data than userEvents and has both the primary key for the event_id
            and a secondary key for the user_id.*/
        axiosWithAuth()
            .get(`/events`)
            .then((res) => {
                setAllEvents(res.data)
            })
    }, []);

    /*extract the userEvents from allEvents so our list has both primary and secondary ids for the event
            and the user*/
       useEffect(()=> {
            const filteredEvents = allEvents.filter((el) => {
                return el.organizer_id === user.id
            })
            setUserEvents(filteredEvents)

    /*get user invites. No endpoint to get invites by user id so we will have to loop through invites by event id
    look for user id
    // no endpoint to get invites by guest_id and get-events endpoint does not contain guestlist.
    // 1. loop through get-events to get all the event_ids
    // 2. get-guest-list-by-event-id for each id and search for user's id in each guestlist
    // 3. add these events to myInvites
    */
    //first we have to find all the invites
            allEvents.map((el) => {
                axiosWithAuth()
                    .get(`/events/${el.event_id}/guestlist`)
                    .then((res) => {
                        setAllInvites([
                            ...allInvites,
                            res
                        ])
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
       }, [allEvents])

       //filter all invites that have a guest id of user id
       useEffect(() => {
            const filteredInvites = allInvites.filter((el) => {
                return el.data.guest_id === user.id
            })
            setUserInvites(filteredInvites)
       }, [allInvites])

    //events with no primary or secondary id
    console.log(eventsNoPrimaryKey)
    //all events from all users
    console.log(allEvents)
    //events user with primary and secondary id
    console.log(userEvents)
    //all invites for all users
    console.log(allInvites)
    //invites for user
    console.log(userInvites)



    const Edit = (e) => {
        push(`editevent/${e.target.id}`)
    }

    const Delete = (e) => {
        e.preventDefault()
        axiosWithAuth()
            .delete(`/events/${e.target.id}`)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
        {!localStorage.getItem("token") ? push('/login'):
        <div>
            <h2>Welcome, {user.username}!</h2>
            <Link to='/newevent'><button>Create an event</button></Link>
            <Header3>Your Events</Header3>
                {userEvents.length >= 1 ? userEvents.map((el) => {
                    //looped through all events to extract user's events
                        return (
                            <Flex key={el.event_id}>
                                <p>{el.event_name}</p>
                                <FlexButtons>
                                    <Button id={el.event_id} onClick={Edit}>Edit</Button>
                                    <Button id={el.event_id} onClick={Delete}>Delete</Button>
                                </FlexButtons>
    
                            </Flex>
                        )
                }) : <p>You have no events.</p>}
        <Break></Break>
            <p>Your user id is {user.id}. Your friends will need this number to invite you to their events.</p>
                <Header3>Your Invites</Header3>
        </div>}
        </>
    )
};