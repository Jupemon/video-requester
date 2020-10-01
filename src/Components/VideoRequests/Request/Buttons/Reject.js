import React, { Component } from 'react';
import { Button } from 'react-bootstrap';


class Reject extends Component {
    state = { 
        loading : false,
        rejected : false,
     }

    fetchData = async (token_id, requestId) => {

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
            this.setState({ rejected: true, loading: false })
            this.props.rejectVideo()
        }

        else {
            this.setState({ loading: false })
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