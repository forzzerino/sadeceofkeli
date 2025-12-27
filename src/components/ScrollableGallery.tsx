'use client';

import type React from 'react';
import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

type ImageItem = string | { src: string; alt?: string };

interface ScrollableGalleryProps {
	images: ImageItem[];
	scrollProgress: React.MutableRefObject<number>; // 0 to 1
	/** Spacing between images along Z in world units (default: 3.0) */
	zSpacing?: number;
	/** Optional className for outer container */
	className?: string;
	/** Optional style for outer container */
	style?: React.CSSProperties;
}

const MAX_HORIZONTAL_OFFSET = 8;
const MAX_VERTICAL_OFFSET = 8;

// Custom shader material for blur, opacity, and cloth folding effects
// (Reusing the same shader from InfiniteGallery for consistency)
const createClothMaterial = () => {
	return new THREE.ShaderMaterial({
		transparent: true,
		uniforms: {
			map: { value: null },
			opacity: { value: 1.0 },
			blurAmount: { value: 0.0 },
			scrollForce: { value: 0.0 },
			time: { value: 0.0 },
			isHovered: { value: 0.0 },
		},
		vertexShader: `
      uniform float scrollForce;
      uniform float time;
      uniform float isHovered;
      varying vec2 vUv;
      varying vec3 vNormal;
      
      void main() {
        vUv = uv;
        vNormal = normal;
        
        vec3 pos = position;
        
        // Create smooth curving based on scroll force
        float curveIntensity = scrollForce * 0.3;
        
        // Base curve across the plane based on distance from center
        float distanceFromCenter = length(pos.xy);
        float curve = distanceFromCenter * distanceFromCenter * curveIntensity;
        
        // Add gentle cloth-like ripples
        float ripple1 = sin(pos.x * 2.0 + scrollForce * 3.0) * 0.02;
        float ripple2 = sin(pos.y * 2.5 + scrollForce * 2.0) * 0.015;
        float clothEffect = (ripple1 + ripple2) * abs(curveIntensity) * 2.0;
        
        // Flag waving effect when hovered
        float flagWave = 0.0;
        if (isHovered > 0.5) {
          // Create flag-like wave from left to right
          float wavePhase = pos.x * 3.0 + time * 8.0;
          float waveAmplitude = sin(wavePhase) * 0.1;
          // Damping effect - stronger wave on the right side (free edge)
          float dampening = smoothstep(-0.5, 0.5, pos.x);
          flagWave = waveAmplitude * dampening;
          
          // Add secondary smaller waves for more realistic flag motion
          float secondaryWave = sin(pos.x * 5.0 + time * 12.0) * 0.03 * dampening;
          flagWave += secondaryWave;
        }
        
        // Apply Z displacement for curving effect (inverted) with cloth ripples and flag wave
        pos.z -= (curve + clothEffect + flagWave);
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
		fragmentShader: `
      uniform sampler2D map;
      uniform float opacity;
      uniform float blurAmount;
      uniform float scrollForce;
      varying vec2 vUv;
      varying vec3 vNormal;
      
      void main() {
        vec4 color = texture2D(map, vUv);
        
        // Simple blur approximation
        if (blurAmount > 0.0) {
          vec2 texelSize = 1.0 / vec2(textureSize(map, 0));
          vec4 blurred = vec4(0.0);
          float total = 0.0;
          
          for (float x = -2.0; x <= 2.0; x += 1.0) {
            for (float y = -2.0; y <= 2.0; y += 1.0) {
              vec2 offset = vec2(x, y) * texelSize * blurAmount;
              float weight = 1.0 / (1.0 + length(vec2(x, y)));
              blurred += texture2D(map, vUv + offset) * weight;
              total += weight;
            }
          }
          color = blurred / total;
        }
        
        // Add subtle lighting effect based on curving
        float curveHighlight = abs(scrollForce) * 0.05;
        color.rgb += vec3(curveHighlight * 0.1);
        
        gl_FragColor = vec4(color.rgb, color.a * opacity);
      }
    `,
	});
};

function ImagePlane({
	texture,
	position,
	scale,
	material,
}: {
	texture: THREE.Texture;
	position: [number, number, number];
	scale: [number, number, number];
	material: THREE.ShaderMaterial;
}) {
	const meshRef = useRef<THREE.Mesh>(null);
	const [isHovered, setIsHovered] = useState(false);

	useEffect(() => {
		if (material && texture) {
			material.uniforms.map.value = texture;
		}
	}, [material, texture]);

	useEffect(() => {
		if (material && material.uniforms) {
			material.uniforms.isHovered.value = isHovered ? 1.0 : 0.0;
		}
	}, [material, isHovered]);

	return (
		<mesh
			ref={meshRef}
			position={position}
			scale={scale}
			material={material}
			onPointerEnter={() => setIsHovered(true)}
			onPointerLeave={() => setIsHovered(false)}
		>
			<planeGeometry args={[1, 1, 32, 32]} />
		</mesh>
	);
}

function GalleryScene({
	images,
	scrollProgress,
	zSpacing = 3,
}: {
	images: ImageItem[];
	scrollProgress: React.MutableRefObject<number>;
	zSpacing?: number;
}) {
	const normalizedImages = useMemo(
		() =>
			images.map((img) =>
				typeof img === 'string' ? { src: img, alt: '' } : img
			),
		[images]
	);

	const textures = useTexture(normalizedImages.map((img) => img.src));
	const materials = useMemo(
		() => Array.from({ length: images.length }, () => createClothMaterial()),
		[images.length]
	);

    const groupRef = useRef<THREE.Group>(null);
    const lastProgress = useRef(scrollProgress.current);
    const velocity = useRef(0);

	// Pre-calculate positions for all images
	const planesData = useMemo(() => {
		return normalizedImages.map((_, i) => {
			// Create varied distribution patterns
			const horizontalAngle = (i * 2.618) % (Math.PI * 2); 
			const verticalAngle = (i * 1.618 + Math.PI / 3) % (Math.PI * 2);

			const horizontalRadius = (i % 3) * 1.2;
			const verticalRadius = ((i + 1) % 4) * 0.8;

			const x =
				(Math.sin(horizontalAngle) * horizontalRadius * MAX_HORIZONTAL_OFFSET) /
				3;
			const y =
				(Math.cos(verticalAngle) * verticalRadius * MAX_VERTICAL_OFFSET) / 4;
            
            // Linear Z distribution
            const z = -i * zSpacing; 

			return { x, y, z, index: i };
		});
	}, [normalizedImages, zSpacing]);
    
    // Total length of the gallery traversal
    const totalDistance = Math.abs(planesData[planesData.length - 1].z) + 5; 
    
	useFrame((state, delta) => {
        // Calculate velocity based on scroll progress change
        const currentProg = scrollProgress.current;
        const diff = currentProg - lastProgress.current;
        
        // Convert progress diff to approximate world unit velocity per second for effect intensity
        const instantaneousVel = (diff * totalDistance) / (delta || 0.016);
        
        // Dampen/Lerp velocity for smoother shader effects
        velocity.current = THREE.MathUtils.lerp(velocity.current, instantaneousVel, 0.1);
        lastProgress.current = currentProg;

		// Update time uniform for all materials
		const time = state.clock.getElapsedTime();
		materials.forEach((material) => {
			if (material && material.uniforms) {
				material.uniforms.time.value = time;
				material.uniforms.scrollForce.value = velocity.current * 0.1; 
			}
		});

        // Move group based on scrollProgress
        if(groupRef.current){
             const targetZ = scrollProgress.current * totalDistance;
             groupRef.current.position.z = targetZ;
        }

	});

	if (normalizedImages.length === 0) return null;

	return (
        <group ref={groupRef}>
			{planesData.map((plane, i) => {
				const texture = textures[i];
				const material = materials[i];

				if (!texture || !material) return null;

				// Calculate scale to maintain aspect ratio
                // Fix lint by casting or safe access
                const img = texture.image as HTMLImageElement; 
				const aspect = img && img.width && img.height
					? img.width / img.height
					: 1;
				const scale: [number, number, number] =
					aspect > 1 ? [2 * aspect, 2, 1] : [2, 2 / aspect, 1];

				return (
					<ImagePlane
						key={plane.index}
						texture={texture}
						position={[plane.x, plane.y, plane.z]}
						scale={scale}
						material={material}
					/>
				);
			})}
        </group>
	);
}

export default function ScrollableGallery({
	images,
	scrollProgress,
	className = 'h-screen w-full',
	style,
	zSpacing = 4,
}: ScrollableGalleryProps) {
    
	return (
		<div className={className} style={style}>
			<Canvas
				camera={{ position: [0, 0, 5], fov: 55 }} // Camera at +5 looking at 0
				gl={{ antialias: true, alpha: true }}
			>
                {/* Fog to hide the pop-in at the back? */}
                <fog attach="fog" args={['#000', 5, 25]} /> 
				<GalleryScene
					images={images}
                    scrollProgress={scrollProgress}
					zSpacing={zSpacing}
				/>
			</Canvas>
		</div>
	);
}
