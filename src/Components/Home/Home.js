import React, { Component } from 'react';
import LoginButton from '../Signin/LoginButton';
import ManageProfile from '../ManageProfile/ManageProfile';
import './Home.css'
import { Jumbotron, Row, Col } from 'react-bootstrap';


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
        alert("failed to login")
     }

    render() { 
        if (!this.state.loggedIn) {
            return ( 
<div clas style={{textAlign:"center"}}>

    <div class="jumbotron">
      <h1 style={{fontSize:"85px"}} className="display-4">Vregs</h1>
      <p className="lead">Allows youtubers to get video requests and sell custom video content</p>
      <hr className="my-4" />
      <LoginButton isLoading={this.state.isLoading} logInFailure={this.logInFailure} logIn={this.logIn}/>
    </div>

  <div className="container">
    <Row>
      <Col >
        <div className="jumbotron" style={{backgroundColor:"white"}}>
          <i style={{marginBottom : "25px"}} className="fas fa-user-plus fa-4x"></i>
          <h1 classNameName="display-4">1. Sign in</h1>
          <p classNameName="lead">Setup your account by signing in with your youtube/google account</p>
        </div>
      </Col>
      <Col >
        <div className="jumbotron" style={{backgroundColor:"white"}}>
          <i style={{marginBottom : "25px"}} className="fas fa-upload fa-4x"></i>
          <h1 classNameName="display-4">2. Setup your account</h1>
          <p classNameName="lead">Setup your account and start accepting custom video requests</p>
        </div>
      </Col>
      <Col >
        <div className="jumbotron" style={{backgroundColor:"white"}}>
          <i style={{marginBottom : "25px"}} className="fas fa-dollar-sign fa-4x"></i>
          <h1 classNameName="display-4">3. Gain revenue</h1>
          <p classNameName="lead">Fullfill custom video requests and gain revenue</p>
        </div>
      </Col>
    </Row>
  </div>
</div>
);
        }
        else if (this.state.loggedIn) {
            return (<div>
                <ManageProfile data={this.state.data}/>
            </div>)
        }
    }
}
 
 
export default Home;