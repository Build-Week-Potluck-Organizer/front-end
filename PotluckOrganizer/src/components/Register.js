import React, {useState, useContext} from 'react';
import axios from 'axios';
import {UserContext} from '../App';
import {useHistory} from 'react-router-dom';


export const Register = () => {
    const {push} = useHistory();
    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const handleChanges = (e) => {
        e.persist();
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        console.log(form)
    };

    const submitForm = (e) => {
        e.preventDefault();
        axios
            .post(`https://build-week-potluck-organizer.herokuapp.com/api/auth/register`, form)
            .then((res) => {
                console.log('register', res)
                push('/login')

            })
            .catch((err)=> {
                console.log(err)
            })

    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={submitForm}>
                <label htmlFor="username">
                    Username:
                    <input
                    id='username'
                    name='username'
                    onChange={handleChanges}
                    value={form.usename}
                    ></input>
                </label>
                <br></br>
                <br></br>
                <label htmlFor="password">
                    Password:
                    <input
                    id='password'
                    name='password'
                    onChange={handleChanges}
                    value={form.password}
                    ></input>
                </label>
                <br></br>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
};