import React, { Component } from 'react';
import LoginButton from '../Signin/LoginButton';
import ManageProfile from '../ManageProfile/ManageProfile';
import { Jumbotron, Button } from 'react-bootstrap';

class Home extends Component {

    state = { 
        loggedIn : false,
        errorInfo : ""
     }

     logIn = (googleUser) => { // login happens checks if user already exists in the database, create a new profile if not
        console.log("login success");
        console.log(googleUser); // get data from this and send it to server

        const email = googleUser.Qt.zu
        const firstName = googleUser.Qt.IW
        const lastName = googleUser.Qt.IU;
        const token_id = googleUser.tokenId;

        console.log(email, firstName, lastName)
        console.log("id token", googleUser.tokenId)

        fetch("http://localhost:3001/signin", {
            method : "POST",
            headers : {
              'Content-Type' : "application/json"
            },
            body : JSON.stringify({
              token_id : token_id
              
            })
          }).then(res => {
            if (res.status === 200) {
              res.json().then(data => {
                console.log("data is here", data)
              })
            }
            else {
              console.log("no bueno status is not 200 ok")
              this.setState({errorInfo : "Something went wrong while signin in"})
            }
            this.setState({loadingData : false})
          })
          .catch(er => {
            console.log(er)
            this.setState({errorInfo : "Couldn't connect to the server"})
            console.log("yo man, there is an error connecting to server")
          })
        //this.setState({loggedIn : true})
        /*const name = googleUser
        const firstName = 
        const lastName = */
        
     }

     logInFailure = () => { // Something went wrong with  google authentication login
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
  <p style={{color:"red"}}>{this.state.errorInfo}</p>
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