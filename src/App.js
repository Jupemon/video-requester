import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Login from './Components/Login/Login';
import ViewProfile from './Components/ViewProfile/ViewProfile';
import NotFound from './Components/NotFound';

function App() { // /viewprofile"
  return (<Router basename="/video-requester">
    <Switch>
      <Route exact path="/">
        <Login />
      </Route>
      <Route path='/viewprofile'>
        <ViewProfile />
      </Route>
      <Route component={NotFound}/>
    </Switch>

  </Router>)

}

export default App;