import React, { Component } from 'react';
import LoginButton from '../Signin/LoginButton';
import ManageProfile from '../ManageProfile/ManageProfile';
import { Jumbotron, Button } from 'react-bootstrap';

class Home extends Component {

    state = { 
        loggedIn : true,

     }

     logIn = (googleUser) => { // login happens checks if user already exists in the database, create a new profile if not
        console.log("login success");
        console.log(googleUser); // get data from this and send it to server

        const email = googleUser.Qt.zu
        const firstName = googleUser.Qt.IW
        const lastName = googleUser.Qt.IU;

        console.log(email, firstName, lastName)
        this.setState({loggedIn : true})
        /*const name = googleUser
        const firstName = 
        const lastName = */
        
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