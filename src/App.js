import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Home from './Components/Home/Home';
import ViewProfile from './Components/ViewProfile/ViewProfile';;

function App() { // /viewprofile"
return (<BrowserRouter>
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/viewprofile" component={ViewProfile} />
    <Route component={<div>Not found</div>} />
  </Switch>
</BrowserRouter>)


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