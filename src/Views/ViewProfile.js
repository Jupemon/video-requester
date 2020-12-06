import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Footer from '../Components/Footer/Footer';
import TopNav from '../Components/TopNav/TopNav';
import VideoRequests from '../Components/VideoRequests/VideoRequests';


class ViewProfile extends Component {

    state = { 
        loading : true,
        errorMessage : "",
        profileData : false
     }


    getUserId = (location) => { // returns userID from href

        return location.split('viewprofile/')[1]
    }

    fetchProfile = async (user_id) => { // Fetch profile data

        try {
            
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/videorequests/${user_id}`)

            if (response.status === 200) {

                const profileData = await response.json()

                this.setState({ profileData, loading : false })
            }
    
            else {

                this.setState({error : true, errorMessage : "Profile doesn't exist", loading : false})
            }
        }
        
        catch {

            this.setState({error : true, errorMessage : "Could not get profile", loading : false})
        }
    }

    updateProfileData = (updatedData) => { // Update profile data
        let { profileData } = this.state

        profileData.requests = updatedData.requests
        
        profileData.status = updatedData.status

        this.setState({profileData : profileData})
    }


    componentDidMount() {

        const profileData = this.state.profileData

        if (!profileData) { // ONLY Fetch profile data if it doesnt exist

            const userId = this.getUserId(window.location.href)

            this.fetchProfile(userId)
        }
        

    }


    render() { 
        
        const userId = this.getUserId(window.location.href)
        
        const { profileData, loading, errorMessage } = this.state

        if (loading) { // Loading
            return <div>Loading</div>
        }
        
        if (profileData) { // Profile data gotten
            //const { videoPrice, currency, channel_name, requests, status, user_id } = profileData

            return (
                <div>
                        <TopNav/>
                        <VideoRequests viewOnly profileData={profileData} updateProfileData={this.updateProfileData}/>
                        <Footer/>
                </div>
            )
        }

        else { // Show error
            
            return <div>{errorMessage}</div>

        }

    }
}
 
export default ViewProfile;