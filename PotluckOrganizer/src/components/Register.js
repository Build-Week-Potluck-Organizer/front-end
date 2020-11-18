import React, {useState} from 'react';
import axios from 'axios';

export const Register = () => {
    const [form, setForm] = useState({
        username: "",
        password: ""
    });

    return (
        <div>
            <h2>Register</h2>
            <form>
                <label htmlFor="username">
                    Username:
                    <input
                    id='username'
                    name='username'
                    ></input>
                </label>
                <br></br>
                <label htmlFor="password">
                    Password:
                    <input
                    id='password'
                    name='password'
                    ></input>
                </label>
            </form>
        </div>
    )
};