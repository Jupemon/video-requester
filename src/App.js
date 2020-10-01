import React from 'react';
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import ManageProfile from './Views/ManageProfile';
import NotFound from './Views/NotFound';
import ViewProfile from './Views/ViewProfile';


function App() { // /viewprofile"
  return (
  <Router basename="/video-requester">
    <Switch>
    
      <Route exact path="/">
        <ManageProfile/>
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