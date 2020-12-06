import React from 'react';
import { Navbar } from 'react-bootstrap';

const TopNav = () => {
    return (
        <Navbar bg="light">
            <Navbar.Brand>
      <img
        alt=""
        src=".Media/logo.jpg"
        width="30"
        height="30"
        className="d-inline-block align-top"
      />{' '}
      Requestnium
    </Navbar.Brand>
      </Navbar>
    );
}
 
export default TopNav;