import React, {createContext, useState} from 'react';
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute"
import {Header} from "./components/Header";
import Login from "./components/Login";
import {Register} from './components/Register';
import { Homepage } from "./components/Homepage";
import {NewEvent} from './components/NewEvent';
import {EditEvent} from './components/EditEvent';

export const UserContext = createContext();
console.log(UserContext)

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(1);

  return (
      <div className='App'>
      <UserContext.Provider value={user, setUser, loggedIn, setLoggedIn}>
        <Router>
          <Header/>
          <hr></hr>
          <Switch>
            <Route exact path='/' />
            <Route exact path='/login' component={Login}/>
            <Route exact path='/register' component={Register}/>
            <Route exact path='/homepage' component={Homepage}/>
            <Route exact path='/newevent' component={NewEvent}/>
            <Route exact path='/editevent' component={EditEvent}/>
            <Route exact path='/rsvp' />
          </Switch>
        </Router>
        </UserContext.Provider>
      </div>
  );
}

export default App;
