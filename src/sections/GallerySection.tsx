import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollableGallery from '../components/ScrollableGallery';

gsap.registerPlugin(ScrollTrigger);

export default function GallerySection() {
	const containerRef = useRef<HTMLElement>(null);
	const progressRef = useRef(0);
	
	const sampleImages = [
		{ src: '/team/akin.jpg', alt: 'Image 1' },
		{ src: '/team/berkay.jpg', alt: 'Image 2' },
		{ src: '/team/bora.jpg', alt: 'Image 3' },
		{ src: '/team/busra.jpg', alt: 'Image 4' },
		{ src: '/team/can.jpg', alt: 'Image 5' },
		{ src: '/team/ertu.jpg', alt: 'Image 6' },
		{ src: '/team/fatih.jpg', alt: 'Image 7' },
		{ src: '/team/mevlut.jpg', alt: 'Image 8' },
        // Duplicating for length if needed, or user can add more
	];

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			ScrollTrigger.create({
				trigger: containerRef.current,
				start: 'top top',
				// Determines how long the scroll lasts. 
                // e.g. 500% means the user scrolls 5 screens worth of height to get through the gallery
				end: '+=500%', 
				pin: true,
				scrub: 0.5, // Slight smoothing on the value
				onUpdate: (self) => {
					progressRef.current = self.progress;
				},
			});
		}, containerRef);

		return () => ctx.revert();
	}, []);

	return (
		<section ref={containerRef} className="h-screen w-full bg-black relative overflow-hidden">
			<ScrollableGallery
				images={sampleImages}
				scrollProgress={progressRef}
				zSpacing={6} // Increased spacing for more "travel" feel
				className="h-full w-full"
			/>
			
			<div className="absolute inset-0 pointer-events-none flex items-center justify-center text-center px-3 mix-blend-exclusion text-white z-10">
				<h1 className="font-serif text-4xl md:text-7xl tracking-tight opacity-50">
					<span className="italic">I create;</span> therefore I am
				</h1>
			</div>

			<div className="text-center absolute bottom-10 left-0 right-0 font-mono uppercase text-[11px] font-semibold text-white/50 z-10">
				<p>Scroll to explore</p>
			</div>
		</section>
	);
}
