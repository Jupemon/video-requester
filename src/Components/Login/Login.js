import React, { Component } from 'react';
import LoginButton from './LoginButton';
import ManageProfile from '../ManageProfile/ManageProfile';
import './Login.css'
import { Row, Col, Jumbotron, Container } from 'react-bootstrap';
import Profile from '../ManageProfile/Profile';


class Login extends Component {

  state = { 
      isLoading : false,
      errorInfo : "", // Shown to user if error happens
      data : false // user data gotten from server
    }

    handleClick = (googleUser) => { 

      const data = JSON.parse(localStorage.getItem("user_data"))

      if (data) { // Load profile from localstorage
        this.setState({ data, loggedIn : true })
      }

      else { // Get profile from server
        this.logIn(googleUser)
      }
    }

    logIn = (googleUser) => { // login happens checks if user already exists in the database, create a new profile if not

      this.setState({isLoading : true})

      const token_id = googleUser.tokenId;

      fetch("http://localhost:3001/signin", {
        method : "POST",
        headers : {
          'Content-Type' : "application/json"
        },
        body : JSON.stringify({
          token_id : token_id              
        })

      })
      .then(res => {
        if (res.status === 200) { // user alredy exists
            res.json().then(data => {
            this.setState({loggedIn : true, data : data})
            window.localStorage.setItem('token_id', token_id) // Used to verify user on some get requests
            window.localStorage.setItem('user_data', JSON.stringify(data))
          })
        }

        else if (res.status === 201) { // new user created
          res.json().then(data => {
            this.setState({loggedIn : true, data : data})
            window.localStorage.setItem('token_id', token_id) // Used to verify user on some get requests
            window.localStorage.setItem('user_data', JSON.stringify(data)) 
            })
        }

        else { // Login failed
            this.setState({errorInfo : "Something went wrong, couldn't sign in"})
        }
          
      })
      .catch(er => {
        this.setState({errorInfo : "Couldn't connect to the server"})
      })
      .finally(() => {
        this.setState({isLoading : false})
      })   

    }


     logInFailure = () => { // Something went wrong with  google authentication login
        alert("failed to login")
    }

    render() {

      const {errorInfo, isLoading, data} = this.state

      if (!data) {
        return ( 
          <div className="Content">
            <Container>
            <Profile userName={"jupemon@gmail.com"} user_id={"134"} price={"50"} currency={"EUR"}/>
              <Jumbotron>
                <h1 style={{fontSize:"85px"}} className="display-4">Vregs</h1>
                <p className="lead">Allows youtubers to get video requests and sell custom video content</p>
                <hr className="my-4" />
                <LoginButton isLoading={isLoading} logInFailure={this.logInFailure} logIn={this.logIn}/>
                <p style={{color:"red"}}>{errorInfo}</p>
              </Jumbotron>

              <Row>
                <Col >
                  <div className="box-1">
                    <i style={{marginBottom : "25px"}} className="fas fa-user-plus fa-4x"></i>
                    <h1 classNameName="display-4">1. Sign in</h1>
                    <p classNameName="lead">Setup your account by signing in with your youtube/google account</p>
                  </div>
                </Col>

                <Col>
                <div className="box-2">
                    <i style={{marginBottom : "25px"}} className="fas fa-upload fa-4x"></i>
                    <h1 classNameName="display-4">2. Setup your account</h1>
                    <p classNameName="lead">Setup your account and start accepting custom video requests</p>
                  </div>
                </Col>

                <Col >
                <div className="box-3">
                    <i style={{marginBottom : "25px"}} className="fas fa-dollar-sign fa-4x"></i>
                    <h1 classNameName="display-4">3. Gain revenue</h1>
                    <p classNameName="lead">Fullfill custom video requests and gain revenue</p>
                  </div>
                </Col>
              </Row>

            </Container>
          </div>
        );
      }
        else if (data) {
            return (<div>
                <ManageProfile data={data}/>
            </div>)
        }
    }
}
 
 
export default Login;