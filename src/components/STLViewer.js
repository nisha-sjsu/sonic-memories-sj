import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import '../styles/STLViewer.css'; // Import the CSS file

const STLViewer = ({ width, height, url, name }) => {
  console.log(url);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="stl-container" style={{ width, height }} onMouseOver={() => setIsHovered(true)} onMouseOut={() => setIsHovered(false)}>
      <Canvas style={{ background: '#2C272E' }} camera={{ position: [0, 0, -100] }}>
        <ambientLight intensity={0.5} />
        <directionalLight color="white" intensity={0.8} position={[0, 10, 0]} />
        <pointLight position={[10, 10, 10]} />
        <STLModel url={url} />
        <OrbitControls />
      </Canvas>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <p style={{ color: 'black', margin: 0 }}>{name}</p>
      </div>
    </div>
  );
};

const STLModel = ({ url }) => {
  const mesh = useRef();
  const loader = new STLLoader();
  const [geometry, setGeometry] = useState(null);

  React.useEffect(() => {
    loader.load(url, (geometry) => {
      setGeometry(geometry);
    });
  }, [loader, url]);

  if (!geometry) return null;

  return (
    <mesh ref={mesh}>
      <meshStandardMaterial color={0xffffff} />
      <bufferGeometry attach="geometry" {...geometry} />
    </mesh>
  );
};

export default STLViewer;
