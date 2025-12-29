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

// Optimized shader material: No wave, conditional blur
const createClothMaterial = () => {
	return new THREE.ShaderMaterial({
		transparent: true,
		uniforms: {
			map: { value: null },
			opacity: { value: 1.0 },
			blurAmount: { value: 0.0 }, // 0.0 means disabled
			isHovered: { value: 0.0 },
		},
		vertexShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      
      void main() {
        vUv = uv;
        vNormal = normal;
        vec3 pos = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
		fragmentShader: `
      uniform sampler2D map;
      uniform float opacity;
      uniform float blurAmount;
      varying vec2 vUv;
      
      void main() {
        vec4 color = texture2D(map, vUv);
        
        // Blur only if enabled (blurAmount > 0.0)
        if (blurAmount > 0.01) {
          vec2 texelSize = 1.0 / vec2(textureSize(map, 0));
          vec4 blurred = vec4(0.0);
          float total = 0.0;
          
          // Reduced blur loop for better performance if enabled
          for (float x = -1.0; x <= 1.0; x += 1.0) {
            for (float y = -1.0; y <= 1.0; y += 1.0) {
              vec2 offset = vec2(x, y) * texelSize * blurAmount;
              float weight = 1.0 / (1.0 + length(vec2(x, y)));
              blurred += texture2D(map, vUv + offset) * weight;
              total += weight;
            }
          }
          color = blurred / total;
        }

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
		material: THREE.Material;
}) {
	const meshRef = useRef<THREE.Mesh>(null);
	const [isHovered, setIsHovered] = useState(false);

	useEffect(() => {
		if (material && texture) {
			// Handle both ShaderMaterial (uniforms.map) and BasicMaterial (map)
			if ('uniforms' in material) {
				(material as THREE.ShaderMaterial).uniforms.map.value = texture;
			} else {
				(material as THREE.MeshBasicMaterial).map = texture;
			}
			material.needsUpdate = true;
		}
	}, [material, texture]);

	useEffect(() => {
		if (material && 'uniforms' in material) {
			(material as THREE.ShaderMaterial).uniforms.isHovered.value = isHovered ? 1.0 : 0.0;
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
			{/* Reduced geometry segments to 1x1 since wave is removed */}
			<planeGeometry args={[1, 1, 1, 1]} /> 
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

	// Detect mobile for material optimization
	const [isMobile, setIsMobile] = useState(false);
	useEffect(() => {
		setIsMobile(window.innerWidth < 768);
	}, []);

	const materials = useMemo(
		() => Array.from({ length: images.length }, () => {
			if (isMobile) {
				return new THREE.MeshBasicMaterial({ transparent: true });
			}
			return createClothMaterial();
		}),
		[images.length, isMobile]
	);

    const groupRef = useRef<THREE.Group>(null);


	// Pre-calculate positions for all images
	const planesData = useMemo(() => {
		return normalizedImages.map((_, i) => {
			// Create varied distribution patterns
			const horizontalAngle = (i * 2.515) % (Math.PI * 2);
			const verticalAngle = (i * 1.44 + Math.PI / 3) % (Math.PI * 2);

			const horizontalRadius = (i % 3) * 1.3;
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
    
	useFrame(() => {
	// Update uniforms if needed (e.g. blur on fast scroll, disabled on mobile)
	// Since we removed wave, we don't need velocity for that.
	// We can still use velocity for blur if we want, but DISABLE it on mobile.

		materials.forEach((material) => {
			if (material && 'uniforms' in material) {
				// Completely disable blur on mobile for perf
				// On desktop, can set to 0.0 or calculated velocity. 
				// For now, let's keep it simple and crisp (0.0) or minimal.
				(material as THREE.ShaderMaterial).uniforms.blurAmount.value = 0.0; 
			}
		});

        // Move group based on scrollProgress
        if(groupRef.current){
             const targetZ = scrollProgress.current * totalDistance;
			// Simple lerp for smoothness
			groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.1);
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
				dpr={[1, 1.5]} // Limit pixel ratio for performance
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
