import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

import {Header} from "./components/Header";


import Login from "./components/Login";

import {Register} from './components/Register';
import { Homepage } from "./components/Homepage";


function App() {
  return (
    <div className='App'>
      <Router>
        <Header/>
        <hr></hr>
        <Switch>
          <Route exact path='/' />
          <Route exact path='/login' component={Login}/>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/homepage' />
          <Route exact path='/newevent' />
          <Route exact path='/rsvp' />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
