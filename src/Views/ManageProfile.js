import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Footer from '../Components/Footer/Footer';
import LoginScreen from '../Components/LoginScreen/LoginScreen';
import Profile from '../Components/Profile/Profile';
import TopNav from '../Components/TopNav/TopNav';
import VideoRequests from '../Components/VideoRequests/VideoRequests';

class ManageProfile extends Component {

    state = {
        profileData : false
    }

    loadProfile = (profileData) => { // Called once user gets profile with the login screen

        this.setState({ profileData })
    }

    updateProfileData = (updatedData) => { // Update profile data
        
        const { profileData } = this.state

        profileData.requests = updatedData.requests

        profileData.status = updatedData.status

        this.setState({ profileData })
    }

    render() { 

        const { profileData } = this.state

        const { requests, status, user_id } = profileData

        if (profileData) { // Load the user profile

            return (<div>
            <TopNav/>
            <Container>
                <Profile profile={profileData}/>
                <VideoRequests updateProfileData={this.updateProfileData} profileData={profileData}/>
            </Container> 
            <Footer/>
            </div>
            );
        }

        else { // User needs to sign in
            return (<div>
            <TopNav/>
            
            <Container>
                <LoginScreen loadProfile={this.loadProfile}/>
            </Container>
            <Footer/>
            </div>);
        }

    }
}

 
export default ManageProfile