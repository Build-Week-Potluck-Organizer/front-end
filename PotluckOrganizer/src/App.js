import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";

function App() {
  return (
    <div className='App'>
      <h1>Potluck Organizer</h1>
      <Router>
        <Switch>
          <Route exact path='/' />
          <Route exact path='/login'>
            <Login />
          </Route>
          <PrivateRoute exact path='/homepage' />
          <PrivateRoute exact path='/newevent' />
          <PrivateRoute exact path='/rsvp' />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
