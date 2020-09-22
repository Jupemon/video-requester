import React, { Component } from 'react';
import VideoRequests from '../Components/VideoRequests/VideoRequests';




class ViewProfile extends Component {
    state = { 
        responseStatus : null,
        loading : true,
        userId : undefined
     }

    fetchVideoRequests = async (userId) => { // Gets 

        const response = await fetch(`http://localhost:3001/getvideorequests/${userId}`)

        if (response.status === 404) {
            this.setState({responseStatus : 404, loading : false})
        }
        
        if (response.status === 200) {
            this.setState({ responseStatus: 200, userId : userId, loading : false })
        }
        else {
            this.setState({ responseStatus : 400, loading : false })
        }
        
    }



    getUserId = (location) => { // returns userID from href
        return location.split('viewprofile/')[1]
    }

    componentDidMount() {
        const userId = this.getUserId(window.location.pathname)
        this.fetchVideoRequests(userId)
    }

    render() { 
        const { videoRequests, loading, responseStatus, userId } = this.state
        console.log(responseStatus, "MON")

        if (loading) {
            return <div>Loading</div>
        }

        if (responseStatus === 200) { // Render Video Requests
            return <VideoRequests viewOnly userId={userId}/>
        }

        else {
            return <div>User Not found</div>
        }
    }
}
 
export default ViewProfile;