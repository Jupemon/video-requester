import React, { Component } from 'react';
import LoginButton from '../Signin/LoginButton';
import ManageProfile from '../ManageProfile/ManageProfile';
import './Home.css'
import { Jumbotron, Button, Popover, OverlayTrigger } from 'react-bootstrap';


class Home extends Component {

    state = { 
        isLoading : false,
        loggedIn : false,
        errorInfo : "",
        data : false
     }

     logIn = (googleUser) => { // login happens checks if user already exists in the database, create a new profile if not

        this.setState({isLoading : true})

        const token_id = googleUser.tokenId;

        fetch("https://requstenator-server.herokuapp.com/signin", {
            method : "POST",
            headers : {
              'Content-Type' : "application/json"
            },
            body : JSON.stringify({
              token_id : token_id
              
            })
          }).then(res => {
            if (res.status === 200) { // user alredy exists
              res.json().then(data => {
                this.setState({loggedIn : true, data : data})
                window.localStorage.setItem('token_id', token_id)
              })
            }
            else if (res.status === 201) { // new user created
              res.json().then(data => {
                console.log(data)
                this.setState({loggedIn : true, data : data})
                window.localStorage.setItem('token_id', token_id)
              })
            }
            else {
              console.log("no bueno status is not 200 ok")
              this.setState({errorInfo : "Something went wrong while signin in"})
            }  
          })
          .catch(er => {
            console.log(er)
            this.setState({errorInfo : "Couldn't connect to the server"})
            console.log("yo man, there is an error connecting to server")
          })
          .finally(() => {
            this.setState({isLoading : false})
          })
        
     }

     logInFailure = () => { // Something went wrong with  google authentication login
        console.log("failed to log in")
     }

    render() { 
        if (!this.state.loggedIn) {
            return ( <div style={{textAlign : "center", marginTop : "290px"}}>
              <h1 className="intro-headline">Hey youtuber!</h1>
  <p className="intro-text">
  Create youtube videos based on audience suggestions!
  </p>
                <Jumbotron className="intro-slider">
  <div className="intro-slider-content">
  <p>Sign in with your google account!</p>
  <p>
  <LoginButton isLoading={this.state.isLoading} logInFailure={this.logInFailure} logIn={this.logIn}/>
  </p>
  <p style={{color:"red"}}>{this.state.errorInfo}</p>
  </div>
</Jumbotron>
            </div> );
        }
        else if (this.state.loggedIn) {
            return <div>
                <ManageProfile data={this.state.data}/>
            </div>
        }
    }
}
 
 
export default Home;