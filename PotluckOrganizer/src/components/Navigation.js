import React from 'react';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';

export const Navigation = () => {

    const Header = styled.div`
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
    
    return (
        <Header>
            <Title>Potluck Organizer</Title>
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
        </Header>
    )
}