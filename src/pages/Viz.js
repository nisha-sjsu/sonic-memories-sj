import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faPalette } from '@fortawesome/free-solid-svg-icons';
import STLViewer from '../components/STLViewer';
import NavigationBar from '../components/Navbar';
import geoJson from "../data/sanjose.json";
import AudioModal from '../components/AudioModal';
import { SketchPicker } from 'react-color';

const Viz = () => {
    const itemsPerPage = 16;
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [selectedAudio, setSelectedAudio] = useState(null);
    const [colorPickerVisible, setColorPickerVisible] = useState({ visible: false, index: null });
    const [colorArray, setColorArray] = useState(Array.from({ length: geoJson.sanjose.length }, () => getRandomColor()));

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
                    style={{ width: '25%', padding: '10px', display: 'inline-block' }}
                >
                    <STLViewer
                        name={data.name}
                        width={300}
                        height={300}
                        url={data.stl}
                        color={colorArray[index]}
                        onAudioIconClick={() => handleAudioIconClick(data)}
                        onColorPickerClick={() => handleColorPickerClick(index)}
                    />
                    <div style={{ marginLeft: '250px', marginTop: '5px' }}>
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

            if ((index + 1) % 4 === 0 || index === currentItems.length - 1) {
                stlViewers.push(
                    <div key={index} style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
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
        <div style={{ backgroundColor: 'black' }}>
            <NavigationBar className="navbar" mycolor="white" />
            <br></br>
            <br></br>
            {renderSTLViewers()}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        style={{ margin: '5px', padding: '5px 10px', background: currentPage === index + 1 ? 'gray' : 'white' }}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
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
