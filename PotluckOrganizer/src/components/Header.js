import React from 'react';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';

const Heading = styled.div`
        display: flex;
        justify-content: space-between;
    `;

    const Title = styled.h1`
        margin-left: 75px;
    `;

    const NavBar = styled.div`
        margin-top: 30px;
        margin-right: 75px;
        width: 200px;
        display: flex;
        justify-content: space-between;
    `;

    const Button = styled.button`
        width: 75px;
        height: 30px;
    `;

export const Header = () => {
    
    return (
        <Heading>
            <Title>Potluck Organizer</Title>
                {localStorage.getItem("token") ? 
                    <NavBar>
                        <NavLink to='/login'>
                            <Button onClick = {() => {
                                localStorage.clear()
                            }}>
                                Log out
                            </Button>
                        </NavLink>
                    </NavBar> :
                    <NavBar>
                        <NavLink to='/login'>
                            <Button>
                                Login
                            </Button>
                        </NavLink>
                    <NavLink to='/register'>
                         <Button>
                            Register
                        </Button>
                    </NavLink>
                </NavBar>
                }
        </Heading>
    )};