import React, { Component } from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
import './SetupProfile.css';

class SetupProfile extends Component { // Force user to setup their profile before managing it
    state = {  }

    disableScrolling = () => { // Take a guess what this function does
        document.body.style.overflow = "hidden"
    }


    render() { 
        const { onboarding_completed, google_consent, token_id } = this.props
        this.disableScrolling()
        if (!google_consent) {
            return (<div className="setup-profile">
                <Jumbotron>
                <h1>Google consent</h1>
                <p>
                    Click The button to give consent to the application access to your youtube account.
                </p>
                <p>
                    <Button href={"http://localhost:3001/handle-consent/" + token_id} variant="primary">Google Consent</Button>
                </p>
                </Jumbotron>
    
    
            </div> );
        }

        else if (!onboarding_completed) {
            return (<div className="setup-profile">
                <Jumbotron>
                <h1>Integrade stripe</h1>
                <p>
                    Follow the instructions given here to create a stripe onboarding account, this will allow you to collect payments from you viewers
                </p>
                <p>
                    <Button  href={"http://localhost:3001/handle-onboarding/" + token_id} variant="primary">Instegrate stripe</Button>
                </p>
                </Jumbotron>
    
    
            </div> );
        }
       else {
           return null
       }
    }
}
 
export default SetupProfile;