import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import Price from './Price';
import SetupProfile from './SetupProfile';


class Profile extends Component {
    state = {  }
    render() {
        
        const {channel_name, user_id, onboarding_completed, google_consent, video_price, currency} = this.props.profile
        const token_id = window.localStorage.getItem("token_id")
        console.log("PROOOOOOPS", this.props.profile)
        if (!onboarding_completed || !google_consent) {
            return (
                <SetupProfile onboarding_completed={onboarding_completed} google_consent={google_consent} token_id={token_id}/>
            )
        }
        else {
            return (
                    <Jumbotron>
                        <h1>Hello, {channel_name}</h1>
                        <hr/>
                        <p>
                            People can now request custom youtube videos from you using this shareable link : <a href={`http://localhost:3000/viewprofile/${user_id}`}>{`http://localhost:3000/viewprofile/${user_id}`}</a>
                        </p>
                        <Price video_price={video_price} user_id={user_id} currency={currency}/>
                    </Jumbotron>
                );
        }

    }
}

export default Profile;