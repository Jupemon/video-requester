import React, { Component } from 'react';
import { Button, Dropdown, DropdownButton, Form, FormControl, InputGroup } from 'react-bootstrap';


class Price extends Component {
    constructor(props) {

        super(props)

        const {video_price, currency} = this.props

        this.state = {
            loading : false,
            video_price : video_price,
            currency : currency
        }
    }
    
    editPrice = async () => {
        const response = await fetch()
    }

    handleClick = () => {
        this.setState({loading : true})
        console.log("hello")
    }
    
    render() { 

        const {video_price, currency, loading} = this.state

        return ( 
        <div>
            <p>
                the price for leaving a custom video request is currently : <b>{video_price}{" "}{currency}</b>
            </p>
            <DropdownButton disabled={loading}  title="Edit Price" id="bg-nested-dropdown">
                <div style={{display : "flex"}}>
                    <InputGroup className="mb-3">
                        <FormControl
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        />
                    <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">{currency.toUpperCase()}</InputGroup.Text>
                    </InputGroup.Prepend>
                    </InputGroup>

                    <Dropdown.Item onClick={() => {this.handleClick()}} eventKey="1">Edit price</Dropdown.Item>
                </div>
            </DropdownButton>
        </div> );
    }
}
 
export default Price;