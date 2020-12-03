import React, {useState} from 'react';
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute"
import {Header} from "./components/Header";
import Login from "./components/Login";
import {Register} from './components/Register';
import { Homepage } from "./components/Homepage";
import {NewEvent} from './components/NewEvent';
import {EditEvent} from './components/EditEvent';
import {UserContext} from './context/UserContext';


function App() {
  const user =({
    id: parseInt(localStorage.getItem("id")),
    username: localStorage.getItem("username")
  })

  return (
        <div className='App'>
        <UserContext.Provider value={{}}>
        <Router>
          <Header/>
          <hr></hr>
          <Switch>
            <Route exact path='/' />
            <Route path='/login' component={Login} user={user}/>
            <Route path='/register' component={Register}/>
            <PrivateRoute path='/homepage' component={Homepage} user={user}/>
            <PrivateRoute path='/newevent' component={NewEvent} user={user}/>
            {/* <PrivateRoute path='/editevent' component={EditEvent}/>
            <PrivateRoute path='/rsvp' /> */}
          </Switch>
        </Router>
        </UserContext.Provider>
      </div>
  );
}

export default App;
