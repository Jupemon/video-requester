import React, { Component } from 'react';
import LoginButton from '../Signin/LoginButton';
import ManageProfile from '../ManageProfile/ManageProfile';
import { Jumbotron, Button } from 'react-bootstrap';

class Home extends Component {

    state = { 
        loggedIn : true,

     }

     logIn = () => { // login happens checks if user already exists in the database, create a new profile if not
        console.log("login success");
        this.setState({loggedIn : true})
        
     }

     logInFailure = () => { // Something went wrong with login
        console.log("failed to log in")
     }

    render() { 
        if (!this.state.loggedIn) {
            return ( <div>
                <Jumbotron>
  <h1>Hello, world!</h1>
  <p>
    This is a simple hero unit, a simple jumbotron-style component for calling
    extra attention to featured content or information.
  </p>
  <p>
  <LoginButton logInFailure={this.logInFailure} logIn={this.logIn}/>
  </p>
</Jumbotron>
            </div> );
        }
        else if (this.state.loggedIn) {
            return <div>
                <ManageProfile />
            </div>
        }
    }
}
 
 
export default Home;