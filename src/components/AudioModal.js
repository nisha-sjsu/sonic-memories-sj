import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ReactAudioPlayer from 'react-audio-player';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import '../styles/AudioModal.css';

function AudioModal({ audioData, show, handleClose }) {

  return (
    <Modal show={show} onHide={handleClose} className='custom-modal'>
      <Modal.Body>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <b>Name: {audioData.name}</b>
          <button className="btn" onClick={handleClose}>
          <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <b>Location: {audioData.location}</b>
        <div className="audio-player">
          <ReactAudioPlayer
            src={audioData.audioUrl}
            autoPlay
            controls
          />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AudioModal;
