import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { NewEvent } from './NewEvent';

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

    const [events, setEvents] = useState([]);
    const [number, setNumber] = useState();
    const [guestlists, setGuestlists] = useState([]);
    const [allEvents, setAllEvents] = useState([])

    useEffect(() => {
        axios
            .get(`https://build-week-potluck-organizer.herokuapp.com/api/users/1/events`)
            .then((res) => {
                console.log(res)
                console.log(res.data)
                setEvents(
                    res.data
                );
            })
            .catch(err => {
                console.log(err)
            });

            axios
                .get(`https://build-week-potluck-organizer.herokuapp.com/api/events`)
                .then((res) => {
                    console.log(res.data)
                    setNumber(
                        res.data.length
                    );
                    setAllEvents(
                        res.data
                    )
                });

            for (let i = 0; i < number; i++) {
                axios
                .get(`https://build-week-potluck-organizer.herokuapp.com/api/events/${i}/guestlist`)
                .then(res => {
                    setGuestlists([
                        ...guestlists,
                        res.data
                    ])
                })
                .catch(err => {
                    console.log(err)
                }) 
            };
            
    }, []);

    const Edit = () => {
        
    }

    console.log(guestlists)

    return (
        <div>
            <h2>Welcome, username!</h2>
            <Link to='/newevent'><button>Create an event</button></Link>
            <Header3>Your Events</Header3>
            {events.map((el) => {
                return (
                    <Flex>
                        <span>{el.event_name}</span>
                        <div>
                            <button>edit</button>
                            <button>delete</button>
                        </div>
                    </Flex>
            )})}
            <Break></Break>
            <Header3>Invitations</Header3>
            {guestlists.map((el) => {
                if (guestlists[el].username === events[0].username) {
                    return (<Flex>
                    <span>Event name </span><span>date</span>
                    <button>RSVP</button>
                </Flex>)
                }
            })
               }
        </div>
    )
};