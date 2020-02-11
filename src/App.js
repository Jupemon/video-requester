import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import Home from './Components/Home/Home';
import ViewProfile from './Components/ViewProfile/ViewProfile';;

function App() {
  return (<Router>
    <Switch>
    <Route path="/viewprofile">
      <ViewProfile />
    </Route>
    <Route path="/">
      <Home />
    </Route>
  </Switch>
    </Router>
  );
}

export default App;
