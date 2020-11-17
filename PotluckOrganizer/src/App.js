import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from "./components/PrivateRoute";
import {Navigation} from "./components/Navigation";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation/>
        <Switch>
          <Route exact path="/"/>
          <Route exact path="/login"/>
          <PrivateRoute exact path="/homepage"/>
          <PrivateRoute exact path="/newevent"/>
          <PrivateRoute exact path="/rsvp"/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
