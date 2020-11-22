import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';
import {UserContext} from '../context/UserContext';

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

    const {loggedIn} = useContext(UserContext);
    
    return (
        <Heading>
            <Title>Potluck Organizer</Title>
                {loggedIn ? 
                    <NavBar>
                        <NavLink to='/login'>
                            <Button>
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