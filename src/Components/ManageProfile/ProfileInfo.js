import React, { Component, useState, useRef } from 'react';
import { Jumbotron, Button, Overlay, Popover } from 'react-bootstrap';

function Example(props) {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  return (
    <>
      <Button ref={target} onClick={() => setShow(!show)}>
        <h1>{props.name}</h1>
      </Button>
      <Overlay target={target.current} show={show} placement="right">
        {props => (
          <Popover id="popover-contained">
          <Popover.Title as="h3">Change username</Popover.Title>
          <Popover.Content>
            <strong>Holy guacamole!</strong> Check this info.
          </Popover.Content>
        </Popover>
        )}
      </Overlay>
    </>
  );
}


class ProfileInfo extends Component {
    state = {  }
    render() { 
        return ( <div>
              <Jumbotron>
  <div className="headline">
  <Example name={"Jupemon"} />
  <p>
    Basic info about {this.props.firstName}
  </p>
  <p>Suggest videos to this link <a target="blank" href={window.location.href + "viewprofile#" + this.props.user_id}>{window.location.href + "viewprofile#" + this.props.user_id}</a></p>
  </div>
</Jumbotron>
        </div> );
    }
}
 
export default ProfileInfo;