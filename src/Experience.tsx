import { useGLTF, MeshReflectorMaterial } from '@react-three/drei';
import React, { useLayoutEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Group, Mesh, Material, Object3D } from 'three';

gsap.registerPlugin(ScrollTrigger);

const Experience: React.FC = () => {
  const { scene } = useGLTF('/araba.glb');
  const { camera } = useThree();
  const modelRef = useRef<Group>(null);
  
  // Create a timeline reference to kill it on unmount
  // Create a mutable object to track where the camera is looking
  // We start looking at x:3 to place the car (at 0) on the LEFT of the screen.
  const camTarget = useRef({ x: -0.8, y: 0.5, z: 0 }); 

  useFrame(() => {
    camera.lookAt(camTarget.current.x, camTarget.current.y, camTarget.current.z);
  });
  
  // Create a timeline reference to kill it on unmount
  const timeline = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    if (!modelRef.current) return;

    (window as any).modelScene = scene; // Expose for debugging

    // --- MATERIAL & MESH SETUP ---
    const bodyParts: Material[] = [];     // For Opacity Control (X-Ray)
    const skeletonParts: Material[] = []; // For Opacity Control (X-Ray)
    
    // For Animation (Position) - Array kept if needed for potential future use, or explicitly cleared of logic
    const electronicsMeshes: Object3D[] = []; 

    scene.traverse((child: Object3D) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh;
        const n = mesh.name.toLowerCase(); 
        const p = mesh.parent ? mesh.parent.name.toLowerCase() : "";
        const checkName = n + " " + p; 

        // --- CATEGORIZE FOR X-RAY ---
        // 1. External Body (To Hide in S3, opacity -> 0)
        if (checkName.includes('govde') || checkName.includes('bumper') || checkName.includes('sase_kanat')) {
          if (!Array.isArray(mesh.material)) {
             mesh.material = mesh.material.clone();
             mesh.material.transparent = true;
             bodyParts.push(mesh.material);
          }
        }
        // 2. Skeleton / Chassis / Wheels (To Fade in S3, opacity -> 0.05)
        else if (checkName.includes('iskelet') || checkName.includes('aks') || checkName.includes('tekerlek')) {
          if (!Array.isArray(mesh.material)) {
             mesh.material = mesh.material.clone();
             mesh.material.transparent = true;
             skeletonParts.push(mesh.material);
          }
        }
        // 3. Electronics (Stay Opacity 1 in S3)
        else {
             if (!Array.isArray(mesh.material)) {
                 mesh.material = mesh.material.clone();
                 electronicsMeshes.push(mesh);
             }
        }
      }
    });

    // 1. Initial Camera Setup (Hero State)
    camera.position.set(-4, 1.5, 9); 
    camera.lookAt(camTarget.current.x, camTarget.current.y, camTarget.current.z);

    // 2. Kill old ScrollTriggers
    ScrollTrigger.getAll().forEach(t => t.kill());

    // 3. Create Timeline with Snap
    // Total Duration: 4 (1 unit per transition)
    // Mapping:
    // 0 -> 1: Hero -> Intro (0% -> 25%)
    // 1 -> 2: Intro -> Chassis (25% -> 50%)
    // 2 -> 3: Chassis -> Electronics (50% -> 75%)
    // 3 -> 4: Electronics -> Exploded (75% -> 100%)
    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      scrollTrigger: {
        trigger: "#scroll-tunnel", 
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        markers: false,
        snap: {
          snapTo: 1 / 4, // 5 points: 0, 0.25, 0.5, 0.75, 1.0
          duration: { min: 0.2, max: 0.5 }, // Faster snap feel
          delay: 0,
          ease: "power2.inOut"
        }
      }
    });

    timeline.current = tl;

    // --- ANIMATION SEQUENCE ---

    // 1. Hero -> Intro (0 -> 1)
    // Move slightly for Intro view
    tl.to(modelRef.current.rotation, { y: -Math.PI / 2, duration: 1 }, 0)
      .to(camera.position, { x: -7, y: 4, z: 6, duration: 1 }, 0)
      .to(camTarget.current, { x: 0.4, y: 0, z: 0.4, duration: 1 }, 0);

    // 2. Intro -> Chassis (1 -> 2)
    // Move to Side View / Body focus
    tl.to(camera.position, { x: -9, y: 3, z: 9, duration: 1 }, 1)
      .to(modelRef.current.rotation, { x: 0, duration: 1 }, 1)
      .to(camTarget.current, { x: -0.9, y: 0.5, z: 0, duration: 1 }, 1);

    // 3. Chassis -> Electronics (2 -> 3)
    // Move to Internal View AND Fade Body
    // Trigger X-Ray HERE (start at 2, end at 3)
    tl.to(camera.position, { x: -5, y: 7, z: 7, duration: 1 }, 2)
      .to(modelRef.current.rotation, { x: 0, y: -Math.PI / 2, duration: 1 }, 2)
      .to(camTarget.current, { x: 0.7, y: -0.1, z: 0.4, duration: 1 }, 2)
      // Hide Body / Fade Skeleton
      .to(bodyParts, { opacity: 0, duration: 1 }, 2)
      .to(skeletonParts, { opacity: 0.05, duration: 1 }, 2);

    // 4. Electronics -> Exploded (3 -> 4)
    // Move to Top View and Restore Opacity
    tl.to(camera.position, { x: 0, y: 20, z: 0.1, duration: 1 }, 3)
      .to(camTarget.current, { x: 0, y: 0, z: 0, duration: 1 }, 3)
      // Restore Visibility for Exploded View
      .to(bodyParts, { opacity: 1, duration: 1 }, 3)
      .to(skeletonParts, { opacity: 1, duration: 1 }, 3);

    return () => {
        if (timeline.current) timeline.current.kill();
        ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [camera, scene]); // Re-run if camera or scene changes

  return (
    <>
      <group ref={modelRef} dispose={null}>
        <primitive object={scene} scale={1} />
        
        {/* Accent Red Glow (Internal) */}
        <pointLight 
            position={[0, 0.5, 0]} 
            intensity={10} 
            color="purple" 
            distance={10} 
            decay={1}
        />
      </group>

      {/* Lighting Setup */}
      <spotLight position={[0, 10, 10]} angle={0.5} penumbra={1} intensity={100} color="white" castShadow />
      <spotLight position={[5, 2, -5]} angle={0.5} penumbra={0.5} intensity={300} color="#00ffff" />
      <spotLight position={[-5, 2, -5]} angle={0.5} penumbra={0.5} intensity={300} color="#ff00ff" />
      
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.14, 0]}>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          mirror={0}
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={10}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#101010"
          metalness={0.5}
        />
      </mesh>
    </>
  );
};

useGLTF.preload('/araba.glb');

export default Experience;
