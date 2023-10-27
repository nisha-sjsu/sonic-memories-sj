// src/STLViewer.js
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

const STLViewer = ({ width, height, url, name }) => {
  return (
    <div style={{ width, height }}>
      <Canvas
        style={{ background: '#2C272E' }}
        camera={{ position: [0, 0, -100] }}
      >
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} />
        <STLModel url={url} />
        <OrbitControls />
        <Html center position={[0, -2, 0]}>
          <div style={{ pointerEvents: 'none', textAlign: 'center' }}>
            <p style={{ color: 'black', margin: 0 }}>{name}</p>
          </div>
        </Html>
      </Canvas>
    </div>
  );
};

const STLModel = ({ url }) => {
  const mesh = useRef();
  const loader = new STLLoader();
  const [geometry, setGeometry] = React.useState(null);

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.005; // Adjust the rotation speed as needed
      mesh.current.rotation.y += 0.005; // Adjust the rotation speed as needed
    }
  });

  React.useEffect(() => {
    loader.load(url, (geometry) => {
      setGeometry(geometry);
    });
  }, [loader, url]);

  if (!geometry) return null;

  return (
    <mesh ref={mesh}>
      <bufferGeometry attach="geometry" {...geometry} />
      <meshStandardMaterial attach="material" color="white" />
    </mesh>
  );
};

export default STLViewer;
