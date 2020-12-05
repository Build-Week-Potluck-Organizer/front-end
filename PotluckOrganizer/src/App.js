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
import {EventContext} from './context/EventContext';


function App() {
  const [event, setEvent] = useState()
  return (
        <div className='App'>
        <EventContext.Provider value={{event, setEvent}}>
        <Router>
          <Header/>
          <hr></hr>
          <Switch>
            <Route exact path='/' />
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <PrivateRoute path='/homepage' component={Homepage}/>
            <PrivateRoute path='/newevent' component={NewEvent}/>
            <PrivateRoute path='/editevent' component={EditEvent}/>
            <PrivateRoute path='/rsvp' />
          </Switch>
        </Router>
        </EventContext.Provider>
      </div>
  );
}

export default App;
