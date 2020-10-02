import React, { Component } from 'react';
import { Button } from 'react-bootstrap';


class Reject extends Component {
    state = { 
        error : "",
        loading : false,
        rejected : false,
     }

    fetchData = async (token_id, requestId) => { // Set videorequest status to rejected, update videorequests

        this.setState({ loading: true })

        const response = await fetch("http://localhost:3001/rejectvideorequest", {
            method : "POST",
            headers : {
            'Content-Type' : "application/json"
            },
            body : JSON.stringify({
            token_id : token_id,
            requestId : requestId
            })
        })

        if (response.status===200) {

            this.setState({ loading: false })

            const updatedRequests = await response.json()

            this.props.updateRequests(updatedRequests)
        }

        else {
            this.setState({ loading: false, error : "Failed to update" })
        }

    }

    handleClick = () => {
        const token_id = window.localStorage.getItem('token_id')
        const { requestId } = this.props
        this.fetchData(token_id, requestId)
    }

    render() { 

        const {loading, rejected} = this.state
        
        if (loading) {
            return (
                <Button disabled={true} variant="warning">Loading</Button>
            )
        }
        
        if (rejected) {
            return (
                <div>Rejected</div>
            )
        }

        else {
            return (<div>
                <div>Are you sure?</div>
                <Button onClick={() => {this.handleClick()}} variant="success">Yes</Button>
                <Button onClick={() => {this.props.cancel()}} variant="danger">Cancel</Button>
            </div>)
        }
    }
}

export default Reject;