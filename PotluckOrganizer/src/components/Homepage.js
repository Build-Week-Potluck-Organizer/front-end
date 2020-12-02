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
    const {user, setUser} = useContext(UserContext);
    const [userEvents, setUserEvents] = useState({});
    const [allEvents, setAllEvents] = useState({});

    console.log('user', user)
    
    useEffect(() => {


    //       axiosWithAuth()
    //         .get(`/users/${parseInt(localStorage.getItem("id"))}`)
    //         .then(res => {
    //             console.log("user res", res)
    //             console.log(user.id)
    //         })

        axiosWithAuth()
            .get(`https://build-week-potluck-organizer.herokuapp.com/api/users/${user.id}/events`)
            .then(res => {
                console.log('events', res)
                setUserEvents(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    //     axiosWithAuth()
    //         .get(`/events/`)
    //         .then((res) => {
    //             console.log(res.data)
    //             setAllEvents(res.data)
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         });

    //         // {setUserEvents(allEvents.filter((el) => {
    //         //     return el.organzier_id === user.id
    //         // }))}

    //         // console.log('userevents', userEvents);
    //         console.log('allevents', allEvents);

    }, [])

    // console.log('user', user)

    // axiosWithAuth()
    //         .get(`/events/`)
    //         .then((res) => {
    //             console.log('all events', res)
    //             setAllEvents([res.data])
    //             console.log('allevents', allEvents)
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         });



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
        {!localStorage.getItem("token") ? push('/login'):
        <div>
            <h2>Welcome, {user.username}!</h2>
            <Link to='/newevent'><button>Create an event</button></Link>
            <Header3>Your Events</Header3>
            {userEvents.length ? userEvents.map((el) => {
                return (
                        <Flex>
                            <p>{el.event_name}</p>
                            <FlexButtons>
                                <Link to='/editevent'><Button>Edit</Button></Link>
                                <Button id={el.event_id}>Delete</Button>
                            </FlexButtons>
                            
                        </Flex>
                    )
        }) : (<div>You have no events.</div>)
    
    }
        <Break></Break>
        </div>}
        </>
    )
};