import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import Home from './Components/Home/Home';
import ViewProfile from './Components/ViewProfile/ViewProfile';;

function App() {
  return (<Router>
    <Switch>
    <Route path="/signin">
      <Signin />
    </Route>
    <Route path="/viewprofile">
      <ViewProfile />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
    <Route path="/">
      <Home />
    </Route>
  </Switch>
    </Router>
  );
}

export default App;
