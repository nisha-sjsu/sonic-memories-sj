import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import '../styles/STLViewer.css';

const STLViewer = ({ width, height, url, name, color, onAudioIconClick, onColorPickerClick }) => {
  return (
    <div className="stl-container" style={{ width, height }}>
      <Canvas style={{ background: '#2C272E' }} camera={{ position: [0, 0, -100] }}>
        <ambientLight intensity={0.4} />
        <directionalLight color="white" intensity={1} position={[0, 10, 0]} />
        <pointLight position={[10, 10, 10]} />
        <STLModel url={url} color={color} />
        <OrbitControls />
      </Canvas>
      <div>
        <p style={{ color: 'white', margin: 0 }}>{name}</p>
      </div>
    </div>
  );
};

const STLModel = ({ url, color }) => {
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
      <meshStandardMaterial color={color} />
      <bufferGeometry attach="geometry" {...geometry} />
    </mesh>
  );
};

export default STLViewer;