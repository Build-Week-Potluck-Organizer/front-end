import React, { useState, useEffect } from "react";

import axios from "axios";
import * as yup from "yup";

const formSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required.")
    .min(2, "Name must be at least 2 characters long.")
    .matches(/[a-zA-z][a-zA-Z]{2,}/, "Name must be letters only."),
  password: yup.string().required("Must input password."),
  coordinator: yup.boolean(),
  guest: yup.boolean(),
});

const Login = () => {
  const [formState, setFormState] = useState({
    name: "",
    password: "",
    coordinator: false,
    guest: false,
  });

  const [errorState, setErrorState] = useState({
    name: "",
    password: "",
    coordinator: "",
    guest: "",
  });

  //form validation
  const validate = (e) => {
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    yup
      .reach(formSchema, e.target.name)
      .validate(value)
      .then((valid) => {
        setErrorState({ ...errorState, [e.target.name]: "" });
      })
      .catch((err) => {
        //console.log(err.errors);
        setErrorState({ ...errorState, [e.target.name]: err.errors[0] });
      });
  };

  const [buttonDisabled, setButtonDisabled] = useState(true);
  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  const inputChange = (e) => {
    e.persist();
    validate(e);
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormState({ ...formState, [e.target.name]: value });
  };

  const [postedData, setPostedData] = useState([]); //place to hold the data coming back from the server
  const submitForm = (e) => {
    e.preventDefault();
    console.log("Form submited!!");
    setFormState({
      name: "",
      password: "",
      coordinator: "",
      guest: "",
    });
    axios
      .post("https://reqres.in/api/users", formState)
      .then((res) => {
        console.log(res);
        // setPostedData(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <form onSubmit={submitForm}>
        <h3>Log in</h3>

        <label htmlFor='name'>
          <h4>Username</h4>
          {errorState.name.length > 0 ? <p>{errorState.name}</p> : null}
        </label>
        <input
          placeholder='Full Name'
          type='text'
          name='name'
          value={formState.name}
          onChange={inputChange}
        />

        <label htmlFor='name'>
          <h4>Password</h4>
          {errorState.password.length > 0 ? <p>{errorState.password}</p> : null}
        </label>
        <textarea
          name='password'
          placeholder='Password'
          value={formState.password}
          onChange={inputChange}
        />
        <br />
        <div>
          <h4>Which one are you?</h4>

          <label htmlFor='coordinator'>Coordinator</label>
          <input
            className='checkbox'
            type='checkbox'
            name='coordinator'
            value={formState.coordinator}
            onChange={inputChange}
          />
          <label htmlFor='guest'>Guest</label>
          <input
            className='checkbox'
            type='checkbox'
            name='guest'
            value={formState.guest}
            onChange={inputChange}
          />
          <br />
        </div>
        <button disabled={buttonDisabled} type='submit'>
          Sign in
        </button>
      </form>
      <pre>{JSON.stringify(postedData, null, 2)}</pre>
    </>
  );
};

export default Login;
