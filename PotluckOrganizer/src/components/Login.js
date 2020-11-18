import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";

const formSchema = yup.object().shape({
  username: yup
    .string()
    .required("Name is required.")
    .min(2, "Name must be at least 2 characters long.")
    .matches(/[a-zA-z][a-zA-Z]{2,}/, "Name must be letters only."),
  password: yup.string().required("Must input password.")
});

const Login = () => {
  const [formState, setFormState] = useState({
    username: "",
    password: ""
  });

  const [errorState, setErrorState] = useState({
    username: "",
    password: ""
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
    console.log(formState)
  };

  const [postedData, setPostedData] = useState([]); //place to hold the data coming back from the server
  const submitForm = (e) => {
    e.preventDefault();
    console.log("Form submited!!");
    setFormState({
      username: "",
      password: ""
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

        <label htmlFor='username'>
          <h4>Username</h4>
          {errorState.username.length > 0 ? <p>{errorState.username}</p> : null}
        </label>
        <input
          placeholder='Full Name'
          type='text'
          name='username'
          id='username'
          value={formState.username}
          onChange={inputChange}
        />

        <label htmlFor='password'>
          <h4>Password</h4>
          {errorState.password.length > 0 ? <p>{errorState.password}</p> : null}
        </label>
        <textarea
          name='password'
          id='password'
          placeholder='Password'
          value={formState.password}
          onChange={inputChange}
        />
        <br />
        <div>
          <br />
        </div>
        <button disabled={buttonDisabled} type='submit'>
          Sign in
        </button>
      </form>
    </>
  );
};

export default Login;
