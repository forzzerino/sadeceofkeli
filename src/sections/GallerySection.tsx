import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollableGallery from '../components/ScrollableGallery';

gsap.registerPlugin(ScrollTrigger);

export default function GallerySection() {
	const containerRef = useRef<HTMLElement>(null);
	const progressRef = useRef(0);
	
	const sampleImages = [
		{ src: '/gallery/11.JPG', alt: 'Image 11' },
		{ src: '/gallery/12.JPG', alt: 'Image 12' },
		{ src: '/gallery/4.JPG', alt: 'Image 4' },
		{ src: '/gallery/19.jpeg', alt: 'Image 19' },
		{ src: '/gallery/3.JPG', alt: 'Image 3' },
		{ src: '/gallery/2.JPG', alt: 'Image 2' },
		{ src: '/gallery/1.JPG', alt: 'Image 1' },
		{ src: '/gallery/6.JPG', alt: 'Image 6' },
		{ src: '/gallery/5.JPG', alt: 'Image 5' },
		{ src: '/gallery/7.JPG', alt: 'Image 7' },
		{ src: '/gallery/9.JPG', alt: 'Image 9' },
		{ src: '/gallery/8.JPG', alt: 'Image 8' },
		{ src: '/gallery/10.JPG', alt: 'Image 10' },
		{ src: '/gallery/13.JPG', alt: 'Image 13' },
		{ src: '/gallery/14.JPG', alt: 'Image 14' },
		{ src: '/gallery/16.jpeg', alt: 'Image 16' },
		{ src: '/gallery/17.JPG', alt: 'Image 17' },
		{ src: '/gallery/18.JPG', alt: 'Image 18' },
		{ src: '/gallery/20.jpg', alt: 'Image 20' },
		{ src: '/gallery/21.jpg', alt: 'Image 21' },
		{ src: '/gallery/22.jpeg', alt: 'Image 22' },
	];

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			ScrollTrigger.create({
				trigger: containerRef.current,
				start: 'top top',
				end: '+=500%', 
				pin: true,
				scrub: 0.5,
				onUpdate: (self) => {
					progressRef.current = self.progress;
				},
			});
		}, containerRef);

		return () => ctx.revert();
	}, []);

	return (
		<section ref={containerRef} className="h-screen w-full relative overflow-hidden border-t border-mono-800">
			<ScrollableGallery
				images={sampleImages}
				scrollProgress={progressRef}
				zSpacing={7}
				className="h-full w-full"
			/>

			<div className="absolute inset-0 pointer-events-none flex items-center justify-center text-center px-3 mix-blend-exclusion text-white z-10">
				<h1 className="font-serif italic text-4xl md:text-7xl tracking-tight">
					Proje Sürecini Keşfet
				</h1>
			</div>
		</section>
	);
}
