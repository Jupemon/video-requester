import React, { Component } from 'react';
import { Jumbotron, Row, Col, Button, InputGroup, FormControl, Spinner } from 'react-bootstrap';

class CreateVideoRequest extends Component {

    state = { 
        infoMessage : "",
        title : "",
        description : "",
        loading : false
    }

    sendVideoRequest = async (body) => { // Sends and creates a videorequest on the DB
        const response = await fetch('http://localhost:3001/createrequest', {
            method : "POST",
            headers : {
              'Content-Type' : "application/json"
            },
            body : JSON.stringify(body)
          })
        

        if (response.status === 201) {
            const updatedRequests = await response.json()
            this.setState({loading : false, infoMessage : "Videorequest Created", title : "", description : ""})
            this.props.updateVideorequests(updatedRequests)
        }

        else {
            this.setState({loading : false, infoMessage : "Something went wrong"})
        }
    }


    validateInput = () => { // Validate user input, returns boolean

        const { title, description } = this.state

        if ( title.length > 0 && description.length > 0 ) {
            return true
        }

        else {
            return false
        }

    }


    handleClick = () => {
        const { userId } = this.props
        const { title, description } = this.state

        const validInput = this.validateInput()

        if (validInput) {

            const requestBody = {
                title : title,
                description : description,
                user_id : userId,
            }
            this.setState({loading : true})
            this.sendVideoRequest(requestBody)
        }

        else {
            this.setState({infoMessage : "Invalid Input"})
        }
        
    }
    
    render() { 
        const { loading, title, description, infoMessage } = this.state

        return(
            <Jumbotron>
                <Row>
                    <Col>
                        <h1>Request a custom video :</h1>
                    </Col>
        
                    <Col>
                        <InputGroup className="mb-3">

                            <InputGroup.Append>
                                <InputGroup.Text id="basic-addon2">Title</InputGroup.Text>
                            </InputGroup.Append>

                            <FormControl                          
                            disabled={loading}
                            onChange={(e) => {this.setState({title : e.target.value})}}
                            value={title}
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            />

                        </InputGroup>

                        <InputGroup>
                            <InputGroup.Prepend>
                            <InputGroup.Text>Description</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl 
                            disabled={loading}
                            onChange={(e) => {this.setState({description : e.target.value})}} value={description}
                            as="textarea"
                            placeholder="What kind of a video are you looking for?"
                            aria-label="With textarea" 
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

