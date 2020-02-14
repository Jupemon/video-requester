import React, { Component } from 'react';
import LoginButton from '../Signin/LoginButton';
import ManageProfile from '../ManageProfile/ManageProfile';
import { Jumbotron, Button } from 'react-bootstrap';

class Home extends Component {

    state = { 
        loggedIn : false,

     }

     logIn = (googleUser) => { // login happens checks if user already exists in the database, create a new profile if not
        console.log("login success");
        console.log(googleUser);
        /*
        console.log("ID: " + profile.getId()); // Don't send this directly to your server!
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log("Image URL: " + profile.getImageUrl());
        console.log("Email: " + profile.getEmail());*/

        
     }

     logInFailure = () => { // Something went wrong with login
        console.log("failed to log in")
     }

    render() { 
        if (!this.state.loggedIn) {
            return ( <div>
                <Jumbotron>
  <h1>Requstenator</h1>
  <p>
  Create and sell custom video content for companies!
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