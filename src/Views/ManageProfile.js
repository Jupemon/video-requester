import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import LoginScreen from '../Components/LoginScreen/LoginScreen';
import Profile from '../Components/Profile/Profile';
import SetupProfile from '../Components/Profile/SetupProfile';
import VideoRequests from '../Components/VideoRequests/VideoRequests';

class ManageProfile extends Component {

    state = {
        profile : false
    }

    loadProfile = (profile) => { // Called once user signs in, loads the profile

        this.setState({ profile })
    }

    updateRequests = (updatedVideorequests) => { // Re renders updated videorequests

        const { profile } = this.state

        profile.videoRequests = updatedVideorequests

        this.setState({ profile })
    }

    render() { 

        const { profile } = this.state
        
        const { videoRequests, user_id } = profile

        if (profile) { // Load the user profile

            return ( 
            <Container>
                <Profile profile={profile}/>
                <VideoRequests updateRequests={this.updateRequests} videoRequests={videoRequests} userId={user_id}/>
            </Container> 
            );
        }

        else { // User needs to sign in
            return ( 
            <Container>
                <LoginScreen loadProfile={this.loadProfile}/>
            </Container>
            );
        }

    }
}

 
export default ManageProfile