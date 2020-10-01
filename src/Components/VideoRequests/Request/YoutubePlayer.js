import React, { Component } from 'react';


const Loading = () => {
    return ( <div>
        <div style={{backgroundColor : "green", position:"absolute", width:"98%", height:"78%"}}>Loading</div> 
    </div> );
}


class YoutubePlayer extends Component {
    state = { 
        loading : true,
     }


    componentDidMount() {
        this.loadPlayer()
    }

    player
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
        const { loading } = this.state

            return (<div>
                <div id={`youtube-player-${this.props.requestId}`}/>
            </div>);


    }
}
 
export default YoutubePlayer;