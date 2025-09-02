import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Box, Cylinder } from "@react-three/drei";
import { useRef } from "react";
import { Mesh } from "three";

const AstronautModel = () => {
  const groupRef = useRef<any>();

  // Slow rotation animation
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2; // Slow rotation
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Helmet */}
      <Sphere position={[0, 1.5, 0]} args={[0.8, 32, 32]}>
        <meshPhongMaterial 
          color="#f0f0f0" 
          transparent 
          opacity={0.8} 
          shininess={100}
        />
      </Sphere>
      
      {/* Helmet reflection */}
      <Sphere position={[0, 1.5, 0]} args={[0.78, 32, 32]}>
        <meshPhongMaterial 
          color="#00ffff" 
          transparent 
          opacity={0.2} 
          emissive="#00ffff"
          emissiveIntensity={0.1}
        />
      </Sphere>

      {/* Body */}
      <Cylinder position={[0, 0, 0]} args={[0.6, 0.8, 2, 32]}>
        <meshPhongMaterial color="#e0e0e0" />
      </Cylinder>
      
      {/* Chest panel */}
      <Box position={[0, 0.3, 0.61]} args={[0.4, 0.6, 0.05]}>
        <meshPhongMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.3} />
      </Box>

      {/* Arms */}
      <Cylinder position={[-1, 0.5, 0]} args={[0.2, 0.25, 1.2, 16]} rotation={[0, 0, Math.PI / 2]}>
        <meshPhongMaterial color="#d0d0d0" />
      </Cylinder>
      <Cylinder position={[1, 0.5, 0]} args={[0.2, 0.25, 1.2, 16]} rotation={[0, 0, -Math.PI / 2]}>
        <meshPhongMaterial color="#d0d0d0" />
      </Cylinder>

      {/* Hands */}
      <Sphere position={[-1.6, 0.5, 0]} args={[0.15, 16, 16]}>
        <meshPhongMaterial color="#d0d0d0" />
      </Sphere>
      <Sphere position={[1.6, 0.5, 0]} args={[0.15, 16, 16]}>
        <meshPhongMaterial color="#d0d0d0" />
      </Sphere>

      {/* Legs */}
      <Cylinder position={[-0.3, -1.5, 0]} args={[0.18, 0.22, 1.5, 16]}>
        <meshPhongMaterial color="#d0d0d0" />
      </Cylinder>
      <Cylinder position={[0.3, -1.5, 0]} args={[0.18, 0.22, 1.5, 16]}>
        <meshPhongMaterial color="#d0d0d0" />
      </Cylinder>

      {/* Boots */}
      <Box position={[-0.3, -2.4, 0.1]} args={[0.4, 0.3, 0.6]}>
        <meshPhongMaterial color="#333" />
      </Box>
      <Box position={[0.3, -2.4, 0.1]} args={[0.4, 0.3, 0.6]}>
        <meshPhongMaterial color="#333" />
      </Box>
    </group>
  );
};

const Astronaut3D = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [3, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#00ffff" />
        <pointLight position={[10, -10, -5]} intensity={0.5} color="#ff00ff" />
        
        <AstronautModel />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
};

export default Astronaut3D;