import React, { Component } from 'react';
import LoginButton from './LoginButton';
//import ManageProfile from '../ManageProfile/ManageProfile';
import './LoginScreen.css'
import { Row, Col, Jumbotron, Container } from 'react-bootstrap';
//import Profile from '../ManageProfile/Profile';


class LoginScreen extends Component {

  state = { 
      isLoading : false,
      errorMessage : "",
      data : false // user data gotten from server
    }


    fetchData = async ( googleUser )=> { // Send google token_id to be verified on server

      this.setState({isLoading : true})


      const token_id = googleUser.tokenId;

      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/signin`, {
        method : "POST",
        headers : {
          'Content-Type' : "application/json"

        },
        body : JSON.stringify({
          token_id : token_id
        })
      })
  
      if (response.status === 200 || response.status === 201) {

        const parsedData = await response.json()

        window.localStorage.setItem('token_id', token_id) // Used to verify user on some http requests

        this.props.loadProfile(parsedData)
  
      }
  
      else {
        
        this.setState({errorMessage : "Couldn't sign in"})
  
      }
    }

    logInFailure = (er) => {
      console.log(er, "ERROR")
    }
    
    render() {

      const {errorMessage, isLoading, data} = this.state

      if (!data) {
        return ( 
          <div className="Content">
            <Container>
              <Jumbotron>
                <h1 style={{fontSize:"85px"}} className="display-4">Requestnium</h1>
                <p className="lead">Allows youtubers to get video requests and sell custom video content</p>
                <hr className="my-4" />
                <LoginButton isLoading={isLoading} logInFailure={this.logInFailure} logIn={this.fetchData}/>
                <p style={{color:"red"}}>{errorMessage}</p>
              </Jumbotron>

              <Row>
                <Col >
                  <div className="box-1">
                    <i style={{marginBottom : "25px"}} className="fas fa-user-plus fa-4x"></i>
                    <h1 className="display-4">1. Sign in</h1>
                    <p className="lead">Setup your account by signing in with your youtube/google account</p>
                  </div>
                </Col>

                <Col>
                <div className="box-2">
                    <i style={{marginBottom : "25px"}} className="fas fa-upload fa-4x"></i>
                    <h1 className="display-4">2. Setup your account</h1>
                    <p className="lead">Setup your account and start accepting custom video requests</p>
                  </div>
                </Col>

                <Col >
                <div className="box-3">
                    <i style={{marginBottom : "25px"}} className="fas fa-dollar-sign fa-4x"></i>
                    <h1 className="display-4">3. Gain revenue</h1>
                    <p className="lead">Fullfill custom video requests and gain revenue</p>
                  </div>
                </Col>
              </Row>

            </Container>
          </div>
        );
      }
        else if (data) {
            return (<div>
                
            </div>)
        }
    }
}
 
 
export default LoginScreen;