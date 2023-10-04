import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "./Loader";

const Janitor = ({ isMobile }) => {
  const janitor = useGLTF("./janitor/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[0, 150, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={janitor.scene}
        scale={isMobile ? 1.2 : 8.50}
        position={isMobile ? [0, -2, 0] : [0, -15, 0]}
        rotation={[0, -Math.PI/2, 0]}
      />
      {/* Additional Directional Light */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.3}
        castShadow
        shadow-mapSize={1024}
      />
      <directionalLight
        position={[-5, -5, -5]}
        intensity={0.3}
        castShadow
        shadow-mapSize={1024}
      />
      <directionalLight
        position={[-40, 30, 0]}
        intensity={0.3}
        castShadow
        shadow-mapSize={1024}
      />
    </mesh>
  );
};

const BrainCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const canvasRef = useRef();

  useEffect(() => {
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    const mediaQuery = window.matchMedia("(max-width: 1000px)");
    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      ref={canvasRef}
      shadows
      dpr={[1, 2]}
      camera={{ position: isMobile ? [-40, -40, 25] : [-40, 30, 0], fov: 50 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          rotateSpeed={0.5} // Adjust rotation speed
          target={[0, 0, 0]} // Set rotation center
          minDistance={10} // Minimum distance from the center
          maxDistance={30} // Maximum distance from the center
          minPolarAngle={Math.PI / 2} // Limit rotation angle from top view
          maxPolarAngle={Math.PI / 2} // Limit rotation angle from bottom view
          autoRotate
          autoRotateSpeed={0} // Adjust auto-rotation speed
        />
        <Janitor isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default BrainCanvas;
