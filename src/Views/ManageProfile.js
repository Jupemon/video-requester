import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import LoginScreen from '../Components/LoginScreen/LoginScreen';
import Profile from '../Components/Profile/Profile';
import VideoRequests from '../Components/VideoRequests/VideoRequests';

class ManageProfile extends Component {

    state = {
        profileData : false
    }

    loadProfile = (profileData) => { // Called once user gets profile with the login screen

        this.setState({ profileData })
    }

    updateProfileData = (updatedData) => { // Update profile data
        console.log("UPDRAGE")
        
        const { profileData } = this.state
        console.log(profileData, "EXISTING")   
        console.log(updatedData, "UPDATED")
        profileData.requests = updatedData.requests

        profileData.status = updatedData.status

        this.setState({ profileData })
    }

    render() { 

        const { profileData } = this.state

        const { requests, status, user_id } = profileData

        if (profileData) { // Load the user profile
            console.log(profileData)
            return ( 
            <Container>
                <Profile profile={profileData}/>
                <VideoRequests updateProfileData={this.updateProfileData} profileData={profileData}/>
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