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

function App() { // /viewprofile"

  if (window.location.href.includes("viewprofile")) {
    return <ViewProfile />
  }
  else {
    return <Home />
  }

}

export default App;


/*  return (<Router>
    <Switch>
    <Route path={process.env.PUBLIC_URL + '/viewprofile'}>
      <ViewProfile />
    </Route>
    <Route path="/">
      <Home />
    </Route>
  </Switch>
    </Router>
  ); */