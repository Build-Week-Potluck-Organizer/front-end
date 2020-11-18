import React from 'react';
import styled from 'styled-components';

const Break = styled.hr`
    width: 75%;
    margin-top: 30px;
`;

export const Homepage = () => {
    return (
        <div>
            <h2>Welcome, username!</h2>
            <button>Create an event</button>
            <h3>Your Events</h3>
            <span>Event name </span><span>date</span>
            <button>edit</button>
            <button>delete</button>
            <Break></Break>
            <h3>Invites</h3>
            <span>Event name </span><span>date</span>
            <button>RSVP</button>
        </div>
    )
};