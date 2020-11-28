import React from 'react';
import { Card } from 'react-bootstrap';

const RequestsInfo = (props) => { // Renders info about videorequests

    const maxAmount = 10 // Max amount of videorequests (Set on the server)

    const {pending, fulfilled, rejected, uploading, failed, total} = props.status

    return (
        <Card style={{ width: '25rem' }}>
            <Card.Body>
            <Card.Title>{"Videorequests"}</Card.Title>
            <Card.Text>{`TOTAL ${total} / ${maxAmount}`}</Card.Text>
            <Card.Text>{`PENDING ${pending}`}</Card.Text>
            <Card.Text>{`FULFILLED ${fulfilled}`}</Card.Text>
            <Card.Text>{`REJECTED ${rejected}`}</Card.Text>
            <Card.Text>{`UPLOADING ${uploading}`}</Card.Text>
            <Card.Text>{`FAILED ${failed}`}</Card.Text>
            </Card.Body>
        </Card> );
}
 
export default RequestsInfo;