import React from 'react';
import styled from 'styled-components';


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
    return (
        <div>
            <h2>Welcome, username!</h2>
            <button>Create an event</button>
            <Header3>Your Events</Header3>
            <Flex>
                <span>Raine's Amazing Birthday Party </span><span>date</span>
                <div>
                    <button>edit</button>
                    <button>delete</button>
                </div>
            </Flex>
            <Break></Break>
            <Header3>Invitations</Header3>
            <Flex>
                <span>Event name </span><span>date</span>
                <button>RSVP</button>
            </Flex>
        </div>
    )
};