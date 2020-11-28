import React, { Component } from 'react';
import './DropZone.css';


class DropZone extends Component {
    state = {
        error : false,

    }

    validateFile = (file) => { 
        const validTypes = ['VIDEO/MOV', 'VIDEO/MPEG4', 'VIDEO/MP4', 'VIDEO/AVI', 'VIDEO/WMV', 'VIDEO/MPEGPS', 'VIDEO/FLV']; // Covers the most popular types of video files
        if (validTypes.indexOf(file.type.toUpperCase()) === -1) {
            return false;
        }
        else {
            return true;
        }
        
    }

    dragOver = (e) => {
        e.preventDefault();
    }
    
    dragEnter = (e) => {
        e.preventDefault();
    }
    
    dragLeave = (e) => {
        e.preventDefault();
    }

    fileError = () => {
        console.log("FAILED UPLOAD")
        this.setState({error : "Not valid file"})
    }
    
    fileDrop = (e) => {
        const { handleFileUpload } = this.props

        e.preventDefault();

        const file = e.dataTransfer.files[0];

        console.log(file);

        this.validateFile(file) ? handleFileUpload(file) : this.fileError()
    }

    

    render() { 
        const { error } = this.state
        return (
        <div className="dropzone-container">
            <div className="dropzone-drop-container" onDragOver={this.dragOver} onDragEnter={this.dragEnter} onDragLeave={this.dragLeave} onDrop={this.fileDrop} >
                <div className="dropzone-drop-message">
                    <div className="dropzone-upload-icon"></div>
                    {error ? error : "Drag & Drop video file here"}
                </div>
            </div>
        </div>
    )
    }
}

export default DropZone;