import React from 'react';
import {NavLink} from 'react-router-dom';

export const Navigation = () => {
    
    return (
        <>
            <h1>Potluck Organizer</h1>
            <div>
                <NavLink to='/login'>
                    <button>
                        Login
                        </button>
                    </NavLink>
                <NavLink to='/register'>
                    <button>
                        Register
                    </button>
                </NavLink>
            </div>
        </>
    )
}