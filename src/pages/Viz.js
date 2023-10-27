import React from 'react';
import STLViewer from '../components/STLViewer';
import NavigationBar from '../components/Navbar';

const data = {
    stlPaths: {
        "Arthur Urbanski": "/Sound_and_3D_files/Workshop_01_CommunityFest/Arthur/ArthurUrbanski.stl",
        "Avery Ramsey": "/Sound_and_3D_files/Workshop_01_CommunityFest/AveryRamsey/AveryRamsey.stl",
        "Colette Gribben": "/Sound_and_3D_files/Workshop_01_CommunityFest/colette gribben/colette gribben.stl",
        "Danielle": "/Sound_and_3D_files/Workshop_01_CommunityFest/Danielle/Danielle.stl",
        "Elizabeth Agramont": "/Sound_and_3D_files/Workshop_01_CommunityFest/Elizabeth Agramont/ElizabethAgramont.stl",
        "James Bass": "/Sound_and_3D_files/Workshop_01_CommunityFest/JamesBass/James Bass.stl",
        "Justic C": "/Sound_and_3D_files/Workshop_01_CommunityFest/Justin_C/Justin_C.stl",
        "Justin Slavick": "/Sound_and_3D_files/Workshop_01_CommunityFest/JustinSlavick/JustinSlavick_fixed.stl",
        "Kostia": "/Sound_and_3D_files/Workshop_01_CommunityFest/Kostia/Kostia.stl",
        "Linda Poon": "/Sound_and_3D_files/Workshop_01_CommunityFest/LindaPoon/Linda Poon.stl",
        "Michele": "/Sound_and_3D_files/Workshop_01_CommunityFest/michele/michele.stl",
        "Rosealyn": "/Sound_and_3D_files/Workshop_01_CommunityFest/Rosealyn/Rosealyn.stl",
        "Sraviya Yetura": "/Sound_and_3D_files/Workshop_01_CommunityFest/Sravaiyetura/Sravaiyetura.stl",
        "Toussaint Cflestin": "/Sound_and_3D_files/Workshop_01_CommunityFest/Toussaint Cflestin/Toussaint Cflestin(1).stl",
        "William Garrett": "/Sound_and_3D_files/Workshop_01_CommunityFest/William Garrett/William Garrett.stl"
    },
};

const Viz = () => {
    const stlPaths = data.stlPaths;

    const renderSTLViewers = () => {
        const stlViewers = [];
        let rowSTLViewers = [];

        Object.entries(stlPaths).forEach(([name, url], index) => {
            rowSTLViewers.push(
                <div key={name} style={{ width: '25%', padding: '10px', display: 'inline-block' }}>
                    <STLViewer name={name} width={300} height={300} url={url} />
                </div>
            );

            if ((index + 1) % 4 === 0 || index === Object.keys(stlPaths).length - 1) {
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

    return (
        <div style={{ backgroundColor: 'black' }}>
            <NavigationBar className="navbar" mycolor="white" />
            <br></br>
            <br></br>
            {renderSTLViewers()}
        </div>
    );
};

export default Viz;
