import React, { Component } from 'react';

class ViewProfile extends Component {
    state = { 
        loadingProfile : true,
        loadedProfile : false
     }

    getProfile = () => { // gets user profile and updates state with it
        setInterval(() => {this.setState({loadingProfile : false})}, 5000)
    }

    componentDidMount () {
        console.log("mounting", window.location.hash);
        const loadedProfile = {name : window.location.hash}
        this.getProfile()
        this.setState({loadedProfile : loadedProfile, loadingProfile : false})
    }
    render() { 
        const { loadedProfile, loadingProfile } = this.state
        if (loadedProfile) {
            return (<div>
                {loadingProfile ? "loading" : "allows making new video requests and list all of the current video requests from" + loadedProfile.name}
                
            </div>)
        }
        else {
            return (<div>
                Profile not found
            </div>)
        }
    }
}
 
export default ViewProfile;