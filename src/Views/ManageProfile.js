import React, { Component } from 'react';
import { Row, Col, Jumbotron, Container } from 'react-bootstrap';
import LoginScreen from '../Components/LoginScreen/LoginScreen';
import Profile from '../Components/Profile/Profile';
import VideoRequests from '../Components/VideoRequests/VideoRequests';

class ManageProfile extends Component {

    state = {
        profile : null
    }

    localSignin = () => { // Loads profile from localstorage
        
        const profile = JSON.parse(localStorage.getItem('profile'))

        if (profile !== null ) {
            this.setState({ profile })
        }
    }

    loadProfile = (profile) => { // Called by loginscreen component

        window.localStorage.setItem('profile', JSON.stringify(profile)) // Used to verify user on some get requests
        this.setState({ profile })
    }

    componentDidMount() {
        this.localSignin()
    }

    render() { 
        const { profile } = this.state
        console.log(profile, "DING")
        if (profile !== null) {

            return ( 
            <Container>
                <Profile profile={profile}/>
                <VideoRequests user_id={profile.user_id}/>
            </Container> 
            );
        }

        else {
            return ( 
            <Container>
                <LoginScreen loadProfile={this.loadProfile}/>
            </Container>
            );
        }

    }
}
 
export default ManageProfile;