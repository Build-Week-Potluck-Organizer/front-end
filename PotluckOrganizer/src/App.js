import React, {useContext, useState} from 'react';
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute"
import {Header} from "./components/Header";
import Login from "./components/Login";
import {Register} from './components/Register';
import {Homepage} from "./components/Homepage";
import {NewEvent} from './components/NewEvent';
import {EditEvent} from './components/EditEvent';
import {UserContext} from './context/UserContext';


function App() {

  const [user, setUser] = useState({
    id: parseInt(localStorage.getItem("id")),
    username: localStorage.getItem("username")})
    //set initial state to localStorage so data will persist when page is refreshed while loggedin

  return (
      <div className='App'>
        <UserContext.Provider value={{user, setUser}}>
          {/*providing the UserContext to be used by all components*/}
            <Router>
              <Header/>
              <hr></hr>
                <Switch>
                  <Route exact path='/' />
                    <Route path='/login'><Login/></Route>
                    <Route path='/register' component={Register}/>
                      <PrivateRoute path='/homepage' component={Homepage}/>
                      <PrivateRoute path='/newevent' component={NewEvent}/>
                      <PrivateRoute path='/editevent/:id' component={EditEvent}/>
                      <PrivateRoute path='/rsvp' />
                </Switch>
            </Router>
            </UserContext.Provider>
      </div>

  );
}

export default App;
