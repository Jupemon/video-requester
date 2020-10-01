import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import CreateVideoRequest from '../Components/CreateVideoRequest/CreateVideoRequest';
import VideoRequests from '../Components/VideoRequests/VideoRequests';


class ViewProfile extends Component {

    state = { 
        loading : true,
        videoRequests : false,
        errorMessage : ""
     }


    getUserId = (location) => { // returns userID from href
        return location.split('viewprofile/')[1]
    }

    fetchVideoRequests = async (user_id) => { // Fetch all videorequests with a certain user id

        try {
            
            const response = await fetch(`http://localhost:3001/videorequests/${user_id}`)

            if (response.status === 200) {
                const videoRequests = await response.json()
                this.setState({ videoRequests, loading : false })
            }
    
            else {
                this.setState({error : true, errorMessage : "Profile doesn't exist", loading : false})
            }
        }
        
        catch {
            this.setState({error : true, errorMessage : "Could not get profile", loading : false})
        }
    }

    updateVideorequests = (updatedVideorequests) => { // Re renders videorequests, called by createvideorequest component
        this.setState({videoRequests : updatedVideorequests})
    }

    componentDidMount() {

        const userId = this.getUserId(window.location.href)
        this.fetchVideoRequests(userId)
    }


    render() { 
        const userId = this.getUserId(window.location.href)
        const { videoRequests, loading, errorMessage } = this.state

        if (loading) { // Loading
            return <div>Loading</div>
        }
        
        if (videoRequests) { // Render videorequests
            return (
                <Container>
                    <CreateVideoRequest updateVideorequests={this.updateVideorequests} userId={userId}/>
                        <VideoRequests viewOnly videoRequests={videoRequests}/>
                </Container>
            )
        }

        else { // Show error
            
            return <div>{errorMessage}</div>

        }

    }
}
 
export default ViewProfile;