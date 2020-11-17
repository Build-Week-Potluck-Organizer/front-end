import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from "./components/PrivateRoute";
import {Header} from "./components/Header";

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Switch>
          <Route exact path="/"/>
          <Route exact path="/login"/>
          <PrivateRoute exact path="/homepage"/>
          <PrivateRoute exact path="/newevent"/>
          <PrivateRoute exact path="/rsvp"/>
        </Switch>
      </Router>
      <hr></hr>
    </div>
  );
}

export default App;
