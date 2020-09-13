import React from 'react';
import { Jumbotron, Spinner } from 'react-bootstrap/';

const Loading = () => {
    return (
        <div>
        <Jumbotron>
          <div className="headline">
            <h1>Loading...</h1>
            <p>loading info...</p>
          </div>
        </Jumbotron>
        <div style={{paddingLeft:"50%", width:"100%"}}><Spinner animation="border" /></div>
      </div>
    );
}
 
export default Loading;