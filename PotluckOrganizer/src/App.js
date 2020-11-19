import React, {createContext} from 'react';
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute"
import {Header} from "./components/Header";
import Login from "./components/Login";
import {Register} from './components/Register';
import { Homepage } from "./components/Homepage";
import {NewEvent} from './components/NewEvent';
import {EditEvent} from './components/EditEvent';


function App() {
    const UserContext = createContext();
  return (
    <UserContext.Provider>
      <div className='App'>
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
      </div>
    </UserContext.Provider>
  );
}

export default App;
