import type React from 'react';
import { useRef, useMemo, useState, useEffect, Suspense } from 'react';
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

// Unlit texture shader (no tone mapping, so photos keep their original colors)
const createClothMaterial = () => {
	return new THREE.ShaderMaterial({
		transparent: true,
		uniforms: {
			map: { value: null },
		},
		vertexShader: `
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
		fragmentShader: `
      uniform sampler2D map;
      varying vec2 vUv;

      void main() {
        gl_FragColor = texture2D(map, vUv);
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

	return (
		<mesh position={position} scale={scale} material={material}>
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

	// Detect mobile for material optimization (read once up front so the
	// desktop materials aren't created and then immediately replaced)
	const [isMobile] = useState(() => window.innerWidth < 768);

	const materials = useMemo(
		() => Array.from({ length: images.length }, () => {
			if (isMobile) {
				// Tint darker (0.5) to reduce glare and match original tone better on unlit material
				return new THREE.MeshBasicMaterial({
					transparent: true,
					color: new THREE.Color(0.5, 0.5, 0.5)
				});
			}
			return createClothMaterial();
		}),
		[images.length, isMobile]
	);

	useEffect(() => () => materials.forEach((m) => m.dispose()), [materials]);

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
        // Move group based on scrollProgress
        if(groupRef.current){
             const targetZ = scrollProgress.current * totalDistance;
			// Simple lerp for smoothness - 0.075 is smoother/heavier than 0.1
			groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.075);
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
	const containerRef = useRef<HTMLDivElement>(null);
	const [inView, setInView] = useState(false);

	// Only render frames while the gallery is (nearly) on screen
	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;
		const observer = new IntersectionObserver(
			([entry]) => setInView(entry.isIntersecting),
			{ rootMargin: '200px 0px' }
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	return (
		<div ref={containerRef} className={className} style={style}>
			<Canvas
				camera={{ position: [0, 0, 5], fov: 55 }} // Camera at +5 looking at 0
				gl={{ antialias: true, alpha: true }}
				dpr={[1, 1.5]} // Limit pixel ratio for performance
				frameloop={inView ? 'always' : 'never'}
			>
                {/* Fog to hide the pop-in at the back? */}
                <fog attach="fog" args={['#000', 5, 25]} />
				{/* Local boundary: without it, loading textures suspends the
				    parent Suspense in App and blanks every section */}
				<Suspense fallback={null}>
					<GalleryScene
						images={images}
						scrollProgress={scrollProgress}
						zSpacing={zSpacing}
					/>
				</Suspense>
			</Canvas>
		</div>
	);
}
