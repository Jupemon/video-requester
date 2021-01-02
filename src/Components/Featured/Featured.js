import React, { Component } from 'react';
import { Card, ButtonGroup, Button, Row, Col } from 'react-bootstrap';

class Featured extends Component { // Render a list of all the featured youtubers using the service
    state = {  }

    
    render() { 
        const youtubers = [
            {
            image:"https://yt3.ggpht.com/ytc/AAUvwng76cTETu1glc_8o4UBUiFL2v-m3818ACnK0JLFPA=s88-c-k-c0x00ffffff-no-rj",
            description : "I am a youtube with great ambition",
            name : "Pewdiepie",
            channel : "https://www.youtube.com/c/theMondayMorningPodcastClips/featured",
            requester : "https://www.youtube.com/c/theMondayMorningPodcastClips/featured"
            },
            {
            image:"https://yt3.ggpht.com/ytc/AAUvwng76cTETu1glc_8o4UBUiFL2v-m3818ACnK0JLFPA=s88-c-k-c0x00ffffff-no-rj",
            description : "I am a youtube with great ambition",
            name : "Pewdiepie",
            channel : "https://www.youtube.com/c/theMondayMorningPodcastClips/featured",
            requester : "https://www.youtube.com/c/theMondayMorningPodcastClips/featured"
            },
            {
            image:"https://yt3.ggpht.com/ytc/AAUvwng76cTETu1glc_8o4UBUiFL2v-m3818ACnK0JLFPA=s88-c-k-c0x00ffffff-no-rj",
            description : "I am a youtube with great ambition",
            name : "Pewdiepie",
            channel : "https://www.youtube.com/c/theMondayMorningPodcastClips/featured",
            requester : "https://www.youtube.com/c/theMondayMorningPodcastClips/featured"
            },
            {
            image:"https://yt3.ggpht.com/ytc/AAUvwng76cTETu1glc_8o4UBUiFL2v-m3818ACnK0JLFPA=s88-c-k-c0x00ffffff-no-rj",
            description : "the Monday Morning Podcast Clip Channel is the official home of Monday Morning Podcast Clips.",
            name : "Pewdiepie",
            channel : "https://www.youtube.com/c/theMondayMorningPodcastClips/featured",
            requester : "https://www.youtube.com/c/theMondayMorningPodcastClips/featured"
            }
        ]
        return ( <div><h2>Featured Channels</h2>
        <Row>
        {youtubers.map(user => {
            return <Col><Card style={{ width: '15rem' }}>
  <Card.Img variant="top" src={user.image} />
  <Card.Body>
    <Card.Title>{user.name}</Card.Title>
    <Card.Text>
      {user.description}
    </Card.Text>
    <ButtonGroup aria-label="Basic example">
  <Button href={user.channel} variant="secondary">View channel</Button>
  <Button variant="secondary">Request videos</Button>
</ButtonGroup>
  </Card.Body>
</Card></Col>
        })}
        </Row></div> );
    }
}
 
export default Featured;