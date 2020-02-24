import React, { Component } from 'react';

class Youtube extends Component {
    state = { 
        loadingPlayer : true
     }

    componentDidMount() {

        if (!window.YT) { // if script is not loaded, load it
            console.log("Script was loaded")
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
    
            window.onYouTubeIframeAPIReady = this.loadVideo; // once youtube video is done loading call loadvideo function

            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
        else { // if script already exists, load video directly
            console.log("script alraedy loaded")
            this.loadVideo();
        }

    }

    loadVideo = () => {
    
        const { id } = this.props;
        // the Player object is created uniquely based on the id in props
        this.player = new window.YT.Player(`youtube-player-${id}`, {
          videoId: id,
          events: {
            onReady: this.onPlayerReady
          },
        });
      };

    onPlayerReady = (event) => {
        event.target.a.width = "100%";
        console.log("player is ready to play")
        this.props.fulfillRequest()
    }


    render() { 
        return ( <div id={`youtube-player-${this.props.id}`} /> );
    }
}
 
export default Youtube;