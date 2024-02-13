// Viz.js

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faPalette } from '@fortawesome/free-solid-svg-icons';
import STLViewer from '../components/STLViewer';
import NavigationBar from '../components/Navbar';
import geoJson from "../data/sanjose.json";
import AudioModal from '../components/AudioModal';
import { SketchPicker } from 'react-color';
import '../styles/Viz.css';

const Viz = () => {
    const itemsPerPage = 15;
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [selectedAudio, setSelectedAudio] = useState(null);
    const [colorPickerVisible, setColorPickerVisible] = useState({ visible: false, index: null });
    const [colorArray, setColorArray] = useState(Array.from({ length: geoJson.sanjose.length }, () => getRandomColor()));
    const [itemsPerRow, setItemsPerRow] = useState(4);

    useEffect(() => {
        const updateItemsPerRow = () => {
            if (window.innerWidth <= 1024 && window.innerWidth > 768) {
                setItemsPerRow(2); // Adjust for tablets
            } else if (window.innerWidth <= 768) {
                setItemsPerRow(1); // Adjust for mobile devices
            } else {
                setItemsPerRow(3); // Default for laptops and larger screens
            }
        };

        window.addEventListener('resize', updateItemsPerRow);
        updateItemsPerRow();

        return () => {
            window.removeEventListener('resize', updateItemsPerRow);
        };
    }, []);

    const handleAudioIconClick = (audioData) => {
        setSelectedAudio(audioData);
        setShowModal(true);
    };

    const handleColorPickerClick = (index) => {
        setColorPickerVisible({ visible: !colorPickerVisible.visible, index });
    };

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const handleColorChange = (color, index) => {
        const newColorArray = [...colorArray];
        newColorArray[index] = color.hex;
        setColorArray(newColorArray);
    };

    const renderSTLViewers = () => {
        const stlViewers = [];
        let rowSTLViewers = [];

        const currentItems = geoJson.sanjose.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        );

        currentItems.forEach((data, index) => {
            rowSTLViewers.push(
                <div
                    key={data.name}
                    style={{
                        position: 'relative', width: `${100 / itemsPerRow}%`, padding: '10px', display: 'flex',
                        justifyContent: 'center', // Horizontally center align
                        alignItems: 'center',
                    }}
                >
                    <STLViewer
                        name={data.name}
                        width={350}
                        height={350}
                        url={data.stl}
                        color={colorArray[index]}
                        onAudioIconClick={() => handleAudioIconClick(data)}
                        onColorPickerClick={() => handleColorPickerClick(index)}
                    />
                    <div style={{ position: 'absolute', top: '0', width: '100%', zIndex: '1', marginLeft: '30%', marginTop: '15px' }}>
                        <button
                            style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                            onClick={() => handleAudioIconClick(data)}
                        >
                            <FontAwesomeIcon
                                icon={faVolumeUp}
                                style={{ color: 'white' }}
                            />
                        </button>
                        <button
                            style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                            onClick={() => handleColorPickerClick(index)}
                        >
                            <FontAwesomeIcon
                                icon={faPalette}
                                style={{ color: 'white', marginLeft: '10px' }}
                            />
                        </button>
                        {colorPickerVisible.visible && colorPickerVisible.index === index && (
                            <SketchPicker
                                color={colorArray[index]}
                                onChange={(color) => handleColorChange(color, index)}
                            />
                        )}
                    </div>
                </div>
            );

            if ((index + 1) % itemsPerRow === 0 || index === currentItems.length - 1) {
                stlViewers.push(
                    <div key={index} style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
                        {rowSTLViewers}
                    </div>
                );
                rowSTLViewers = [];
            }
        });

        return stlViewers;
    };

    const totalPages = Math.ceil(geoJson.sanjose.length / itemsPerPage);

    return (
        <div className="viz-container">
            <NavigationBar className="navbar" mycolor="white" />
            <div className="pagination-container">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        style={{
                            background: currentPage === index + 1 ? '#2C272E' : 'white',
                            color: currentPage === index + 1 ? 'white' : 'black',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '10px',
                            margin: '5px',
                        }}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            <br></br>
            <br></br>
            {renderSTLViewers()}
            {selectedAudio && (
                <AudioModal
                    audioData={selectedAudio}
                    show={showModal}
                    handleClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
};

export default Viz;
