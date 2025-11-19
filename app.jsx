import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF, Decal, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Komponen utama untuk model hoodie
function HoodieModel({ decalTexture }) {
  const { nodes, materials } = useGLTF('/urban_streetwear_hoodie__3d_clothing.glb');
  const hoodieRef = useRef();
  const [targetMesh, setTargetMesh] = useState(null);

  // Log semua nodes untuk debugging
  useEffect(() => {
    console.log('Available nodes:', nodes);
    console.log('Available materials:', materials);
  }, [nodes, materials]);

  // Cari mesh yang cocok untuk ditempeli decal
  useEffect(() => {
    if (hoodieRef.current) {
      // Traverse semua child objects untuk mencari mesh yang cocok
      hoodieRef.current.traverse((child) => {
        if (child.isMesh && child.geometry) {
          // Prioritaskan mesh dengan nama yang mengandung kata kunci
          const name = child.name.toLowerCase();
          if (name.includes('hoodie') || name.includes('shirt') || name.includes('body') || 
              name.includes('torso') || name.includes('chest') || name.includes('front')) {
            console.log('Found target mesh:', child.name);
            setTargetMesh(child);
            return;
          }
        }
      });

      // Jika tidak ditemukan mesh spesifik, gunakan mesh pertama yang ada
      if (!targetMesh) {
        hoodieRef.current.traverse((child) => {
          if (child.isMesh && child.geometry && !targetMesh) {
            console.log('Using fallback mesh:', child.name);
            setTargetMesh(child);
          }
        });
      }
    }
  }, [nodes]);

  // Animasi rotasi halus
  useFrame((state) => {
    if (hoodieRef.current) {
      hoodieRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={hoodieRef} dispose={null}>
      {/* Render semua meshes dari model */}
      {Object.keys(nodes).map((key) => {
        const node = nodes[key];
        if (node.isMesh) {
          return (
            <mesh
              key={key}
              geometry={node.geometry}
              material={node.material}
              castShadow
              receiveShadow
            />
          );
        }
        return null;
      })}

      {/* Decal untuk custom design */}
      {targetMesh && decalTexture && (
        <Decal
          position={[0, 0.5, 0.15]} // Posisi di dada (adjust sesuai kebutuhan)
          rotation={[0, 0, 0]} // Rotasi decal
          scale={[0.8, 0.8, 0.8]} // Skala decal
          map={decalTexture}
          geometry={targetMesh.geometry}
        />
      )}
    </group>
  );
}

// Komponen untuk scene 3D
function Scene({ decalTexture }) {
  const { gl } = useThree();

  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={0.8}
        castShadow
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      <HoodieModel decalTexture={decalTexture} />
      
      <Environment preset="studio" />
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        maxPolarAngle={Math.PI}
        minPolarAngle={0}
        args={[gl.domElement]}
      />
    </>
  );
}

// Komponen utama aplikasi
function App() {
  const [decalTexture, setDecalTexture] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validasi file type
    if (!file.type.match('image.*')) {
      alert('Please upload an image file (PNG, JPG, JPEG)');
      return;
    }

    setIsLoading(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      const texture = new THREE.TextureLoader().load(e.target.result, () => {
        setIsLoading(false);
      });
      
      texture.flipY = false; // Important for decal orientation
      texture.encoding = THREE.sRGBEncoding;
      setDecalTexture(texture);
    };

    reader.onerror = () => {
      setIsLoading(false);
      alert('Error loading image file');
    };

    reader.readAsDataURL(file);
  };

  // Reset desain
  const handleResetDesign = () => {
    setDecalTexture(null);
    // Reset file input
    const fileInput = document.getElementById('design-upload');
    if (fileInput) fileInput.value = '';
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {/* Canvas 3D */}
      <Canvas
        camera={{ position: [3, 2, 5], fov: 45 }}
        style={{ background: '#f0f0f0' }}
        shadows
      >
        <Scene decalTexture={decalTexture} />
      </Canvas>

      {/* UI Controls */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        zIndex: 1000,
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        minWidth: '250px'
      }}>
        <h2 style={{ margin: '0 0 15px 0', color: '#333' }}>
          3D Hoodie Configurator
        </h2>
        
        {/* Upload Design Button */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="design-upload" style={{
            display: 'block',
            padding: '10px 15px',
            background: '#007bff',
            color: 'white',
            borderRadius: '5px',
            cursor: 'pointer',
            textAlign: 'center',
            fontWeight: 'bold',
            transition: 'background 0.3s'
          }}>
            {isLoading ? 'Loading...' : 'Upload Design'}
          </label>
          <input
            id="design-upload"
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
            disabled={isLoading}
          />
        </div>

        {/* Reset Button */}
        <button
          onClick={handleResetDesign}
          disabled={!decalTexture || isLoading}
          style={{
            width: '100%',
            padding: '10px 15px',
            background: decalTexture ? '#dc3545' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: decalTexture ? 'pointer' : 'not-allowed',
            fontWeight: 'bold',
            transition: 'background 0.3s'
          }}
        >
          Reset Design
        </button>

        {/* Instructions */}
        <div style={{ 
          marginTop: '15px', 
          fontSize: '12px', 
          color: '#666',
          borderTop: '1px solid #ddd',
          paddingTop: '15px'
        }}>
          <p><strong>Instructions:</strong></p>
          <ul style={{ paddingLeft: '15px', margin: '5px 0' }}>
            <li>Upload PNG/JPG image</li>
            <li>Drag to rotate hoodie</li>
            <li>Scroll to zoom</li>
            <li>Right-click to pan</li>
          </ul>
        </div>

        {/* Status */}
        {decalTexture && (
          <div style={{
            marginTop: '10px',
            padding: '8px',
            background: '#d4edda',
            color: '#155724',
            borderRadius: '4px',
            fontSize: '12px',
            textAlign: 'center'
          }}>
            ✓ Design Applied
          </div>
        )}
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2000
        }}>
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <div>Loading your design...</div>
          </div>
        </div>
      )}
    </div>
  );
}

// Preload model
useGLTF.preload('/urban_streetwear_hoodie__3d_clothing.glb');

export default App;
