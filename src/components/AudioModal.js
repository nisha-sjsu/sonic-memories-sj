import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import WaveSurfer from 'wavesurfer.js';

import '../styles/AudioModal.css';

function AudioModal({ audioData, show, handleClose }) {
    const containerRef = useRef(null);
    const waveSurferRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const regionsRef = useRef([]); // To keep track of regions.

    useEffect(() => {
        if (show) {
            if (waveSurferRef.current) {
                waveSurferRef.current.destroy();
                containerRef.current.innerHTML = '';
            }

            if (containerRef.current) {
                waveSurferRef.current = WaveSurfer.create({
                    container: containerRef.current,
                    waveColor: 'black',
                    progressColor: 'purple',
                    responsive: true,
                    barWidth: 3,
                    cursorWidth: 1,
                    preload: 'auto',
                });

                waveSurferRef.current.load(audioData.audioUrl);

                // Add regions (markers) to the waveform.
                if (audioData.markers) {
                    audioData.markers.forEach(marker => {
                        const region = waveSurferRef.current.addRegion({
                            start: marker.start,
                            end: marker.end,
                            color: 'rgba(255, 0, 0, 0.3)', // Change the color as needed.
                        });

                        regionsRef.current.push(region);
                    });
                }
            }
        } else {
            if (waveSurferRef.current) {
                waveSurferRef.current.stop();
                waveSurferRef.current.destroy();
            }
        }
    }, [show, audioData.audioUrl, audioData.markers]);

    const togglePlay = () => {
        if (waveSurferRef.current) {
            if (isPlaying) {
                waveSurferRef.current.pause();
            } else {
                waveSurferRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} className='custom-modal'>
            <Modal.Body>
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <b>Name: {audioData.name}</b>
                    <button className="btn" onClick={handleClose}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                <b>Location: {audioData.location}</b>
                <div className="row">
                    <div className="col d-flex align-items-center">
                        <button className="btn" onClick={togglePlay}>
                            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} size='2x' />
                        </button>
                    </div>
                    <div className="col-10">
                        <div ref={containerRef} className="audio-player"></div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default AudioModal;
