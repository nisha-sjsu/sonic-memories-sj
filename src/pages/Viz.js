import React, { useState } from 'react';
import STLViewer from '../components/STLViewer';
import NavigationBar from '../components/Navbar';
import geoJson from "../data/sanjose.json";
import AudioModal from '../components/AudioModal'; // Import the AudioModal component

const Viz = () => {
    const itemsPerPage = 16; // Define items per page
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [selectedAudio, setSelectedAudio] = useState(null);

    const handleSTLClick = (audioData) => {
        setSelectedAudio(audioData);
        setShowModal(true);
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
                    style={{ width: '25%', padding: '10px', display: 'inline-block', cursor: 'pointer' }}
                    onClick={() => handleSTLClick(data)}
                >
                    <STLViewer name={data.name} width={300} height={300} url={data.stl} />
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
