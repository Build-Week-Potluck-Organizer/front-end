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
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  return (
  
      <div className='App'>
        <Router>
          <Header/>
          <hr></hr>
          <UserContext.Provider value={{user, setUser, loggedIn, setLoggedIn}}>
          <Switch>
            <Route exact path='/' />
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <PrivateRoute path='/homepage' component={Homepage}/>
            <PrivateRoute path='/newevent' component={NewEvent}/>
            <PrivateRoute path='/editevent' component={EditEvent}/>
            <PrivateRoute path='/rsvp' />
          </Switch>
          </UserContext.Provider>
        </Router>
      </div>
  );
}

export default App;
