import React, { Component } from 'react';
import { Jumbotron, Row, Col, Button, InputGroup, Spinner } from 'react-bootstrap';

class CreateVideoRequest extends Component {

    state = { 
        infoMessage : "",
        loading : false,

        requester : "",
        title : "",
        description : ""
        
    }

    sendVideoRequest = async (body) => { // Sends and creates a videorequest on the DB

        try {
            
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/handle-checkout`, {
                method : "POST",
                headers : {
                  'Content-Type' : "application/json"
                },
                body : JSON.stringify(body)
            })
    
            this.clearInput()
            let checkoutSessionId

            if (response.status === 201) { // New videorequest was created
                
                const updatedRequests = await response.json()

                this.setState({loading : false, infoMessage : "New videorequest added"})
                
                this.props.updateRequests(updatedRequests)

                

            }

            else if (response.status === 200) { // Send user to payment screen
                checkoutSessionId = await response.json()
    
                const stripe = window.Stripe(process.env.REACT_APP_PUBLIC_KEY)
        
                stripe.redirectToCheckout({
    
                    // Make the id field from the Checkout Session creation API response
                    // available to this file, so you can provide it as argument here
                    // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
                    sessionId: checkoutSessionId
                  })
                  // If `redirectToCheckout` fails due to a browser or network
                  // error, display the localized error message to your customer
                  // using `error.message`.
            }


            else {
                throw "Fetch failed"
            }


        }

        catch (er){
            console.log(er, "ERROR HERE")
            this.setState({loading : false, infoMessage : "Something went wrong"})
        }
      
    }

    clearInput = () => { // Clear user input
        this.setState({
            requester : "",
            title : "",
            description : ""
        })
    }

    validateInput = () => { // Validate user input, returns boolean

        const { title, description } = this.state

        if (title.length > 0 && description.length > 0) {

            return true
        }


        else {

            return false
        }

    }


    handleClick = () => {

        const { userId } = this.props

        const { title, description, requester } = this.state

        const validInput = this.validateInput()

        if (validInput) {

            const requestBody = {
                requester : requester,
                title : title,
                description : description,
                user_id : Number.parseInt(userId),
            }

            this.setState({loading : true})

            this.sendVideoRequest(requestBody)
        }

        else {

            this.setState({infoMessage : "Invalid input"})
        }
        
    }
    
    render() { 
        const { videoPrice, currency, channel_name } = this.props
        const { loading, title, description, requester, infoMessage } = this.state

        return(
            <Jumbotron>
                <Row>
                    <Col>
                        <h1>Request a custom video :</h1>
                        <p>You can support <b>{channel_name}</b> by requesting a custom youtube video from him for <b>{videoPrice} {currency}</b></p>
                    </Col>
        
                    <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Append>
                            <InputGroup.Text id="basic-addon2">Requester</InputGroup.Text>
                        </InputGroup.Append>
                        <input 
                        type="text"
                        placeholder="Enter your name/username"
                        disabled={loading}
                        onChange={(e) => {this.setState({requester : e.target.value})}}
                        value={requester}
                        maxLength="25"
                        />
                    </InputGroup>
                        <InputGroup className="mb-3">

                            <InputGroup.Append>
                                <InputGroup.Text id="basic-addon2">Title</InputGroup.Text>
                            </InputGroup.Append>
                            <input 
                            type="text"
                            placeholder="Title for your request"
                            disabled={loading}
                            onChange={(e) => {this.setState({title : e.target.value})}}
                            value={title}
                            maxLength="25"
                            />

                        </InputGroup>

                        <InputGroup>
                            <InputGroup.Prepend>
                            <InputGroup.Text>Description</InputGroup.Text>
                            </InputGroup.Prepend>
                            <textarea 
                            placeholder="Describe the custom video you would like.."
                            type="textarea"
                            disabled={loading}
                            onChange={(e) => {this.setState({description : e.target.value})}}
                            value={description}
                            maxLength="250"
                            />
                        </InputGroup>

                        <InputGroup>
                            <InputGroup.Prepend>
                            
                            <Button onClick={() => {this.handleClick()}} disabled={loading} variant="outline-secondary">
                            {loading ? 
                            <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner> :
                            "Request"
                            }
                            </Button>
                            <p>{infoMessage}</p>
                            </InputGroup.Prepend>
                        </InputGroup>

                    </Col>
                </Row>
            </Jumbotron>
        ) 

    }
}
 
export default CreateVideoRequest;