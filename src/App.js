import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Home from './Components/Home/Home';
import ViewProfile from './Components/ViewProfile/ViewProfile';
import NotFound from './Components/NotFound';

function App() { // /viewprofile"
return (<Router basename="/video-requester">
  <Switch>
  <Route exact path="/">
    <Home />
  </Route>
  <Route path='/viewprofile'>
    <ViewProfile />
  </Route>
  <Route component={NotFound}/>
</Switch>
  </Router>
)

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