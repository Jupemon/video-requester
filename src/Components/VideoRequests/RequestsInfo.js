import React from 'react';
import { Card } from 'react-bootstrap';

const RequestsInfo = (props) => { // Render statuses of all videorequests

    const {pending, fulfilled, rejected, total} = props.status

    return (
        <Card style={{ width: '25rem' }}>
            <Card.Body>
            <Card.Title>{"Videorequests"}</Card.Title>
            <Card.Text>{`TOTAL ${total} / ${10}`}</Card.Text>
            <Card.Text>{`PENDING ${pending}`}</Card.Text>
            <Card.Text>{`FULFILLED ${fulfilled}`}</Card.Text>
            <Card.Text>{`REJECTED ${rejected}`}</Card.Text>
            </Card.Body>
        </Card> );
}
 
export default RequestsInfo;