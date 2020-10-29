import React, { Component } from 'react';


class YoutubePlayer extends Component {
    state = { 

     }


    componentDidMount() {
        this.loadPlayer()
    }

    player // Youtube Player here

    loadPlayer = () => { // Called after required youtube scripts have been loaded
        
        this.setState({loading : false})

        const { videoId, requestId } = this.props
        
        this.player = new window.YT.Player(`youtube-player-${requestId}`, {
            height: '390',
            width: '390',
            videoId: videoId,
            events: {
                'onReady': this.onPlayerReady,
            }
          });
    }

    render() {

            return (<div>
                <div id={`youtube-player-${this.props.requestId}`}/>
            </div>);


    }
}
 
export default YoutubePlayer;