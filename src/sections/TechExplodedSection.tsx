import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const techItems = [
  { 
    id: 'raspberry', 
    title: 'BEYİN',
    details: 'Raspberry Pi 4',
    image: '/tech/raspberry-pi.png',
    position: { top: '15%', left: '50%', transform: 'translate(-50%, -50%)' }, 
    origin: { x: 0, y: 100 }
  },
  { 
    id: 'arduino', 
    title: 'KONTROL',
    details: 'Arduino Nano',
    image: '/tech/arduino-nano.png',
    position: { top: '25%', left: '75%', transform: 'translate(-50%, -50%)' }, 
    origin: { x: -100, y: 50 }
  },
  { 
    id: 'motor-driver', 
    title: 'SÜRÜCÜ',
    details: 'L298N Sürücü',
    image: '/tech/motor-driver.png',
    position: { top: '25%', left: '25%', transform: 'translate(-50%, -50%)' },
    origin: { x: 100, y: 50 }
  },
  { 
    id: 'camera', 
    title: 'GÖRÜNTÜ',
    details: 'Kamera Girişi',
    image: '/tech/kamera.png',
    position: { top: '50%', left: '15%', transform: 'translate(-50%, -50%)' }, 
    origin: { x: 150, y: 0 }
  },
  { 
    id: 'dc-motor', 
    title: 'MOTOR',
    details: 'Fırçalı DC Motor',
    image: '/tech/dc-motor.png',
    position: { top: '50%', left: '85%', transform: 'translate(-50%, -50%)' },
    origin: { x: -150, y: 0 }
  },
  { 
    id: 'servo', 
    title: 'YÖNLENDİRME',
    details: 'Servo Motor',
    image: '/tech/servo-motor.png',
    position: { top: '75%', left: '25%', transform: 'translate(-50%, -50%)' }, 
    origin: { x: 100, y: -100 }
  },
  { 
    id: 'lipo', 
    title: 'GÜÇ',
    details: '11.1V LiPo Batarya',
    image: '/tech/lipo-battery.png',
    position: { top: '75%', left: '75%', transform: 'translate(-50%, -50%)' }, 
    origin: { x: -100, y: -100 }
  },
  { 
    id: 'sensor', 
    title: 'SENSÖR',
    details: 'HC-SR04',
    image: '/tech/sensor.png',
    position: { top: '88%', left: '50%', transform: 'translate(-50%, -50%)' }, 
    origin: { x: 0, y: -100 }
  },
];

export function TechExplodedSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Robustly find elements
      const tunnel = document.getElementById('scroll-tunnel') || document.body; // Fallback to body if tunnel isn't ready
      const items = containerRef.current?.querySelectorAll('.tech-item');

      if (!items || items.length === 0) {
        return;
      }

      // Create a timeline synced with the main scroll tunnel
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: tunnel, 
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        }
      });
      
      // Initial Scale
      gsap.set(items, { scale: 0.8 });

      // Camera Path Setup
      const path = containerRef.current?.querySelector('#camera-path') as SVGPathElement;
      if (path) {
        const length = path.getTotalLength();
        gsap.set(path, { 
          strokeDasharray: length, 
          strokeDashoffset: length,
          // Opacity is handled by CSS/Parent now to avoid conflict
        });
        
        // Independent time-based trigger for the drawing
        // Optimized for smoothness - removed opacity transitions
        ScrollTrigger.create({
          trigger: tunnel,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
             // If we are past the point where cards appear (0.96)
             if (self.progress > 0.95) {
                gsap.to(path, {
                  strokeDashoffset: 0,
                  duration: 1.5, // Slightly longer for better visual flow
                  delay: 0.2, // Reduced delay for responsiveness
                  ease: "power2.inOut", // Smoother ease
                  overwrite: 'auto'
                });
             } else {
                // Reset if we scroll back up
                gsap.to(path, {
                  strokeDashoffset: length,
                  duration: 0.5,
                  overwrite: 'auto'
                });
             }
          }
        });
      }

      // Animate In: EXTRA LATE (0.96) - Triggers at the absolute end of the scroll
      tl.to(items, { 
        autoAlpha: 1, 
        scale: 1, 
        duration: 0.1, 
        stagger: 0.02,
        ease: "power2.out"
      }, 0.96);

      // Force recalculation to ensure start/end points are correct after load
      ScrollTrigger.refresh();

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    // Increased height to valid CSS Sticky scroll area (300vh)
    <section 
      ref={containerRef} 
      className="relative w-full h-screen pointer-events-none flex items-center justify-center"
    >
      {/* Sticky Container removed - purely static 100vh frame */}
      <div className="relative w-full h-full overflow-hidden">
          <div className="w-full h-full relative">
            {techItems.map((item) => (
                <div 
                key={item.id}
                className="tech-item absolute flex items-stretch gap-4 group pointer-events-auto opacity-0"
                style={item.position}
                >
                {/* Rectangular Card Container */}
                <div className="relative flex flex-col justify-center bg-black/90 border border-mono-700 rounded-xl backdrop-blur-md overflow-hidden group-hover:border-red-600 transition-colors duration-300 w-[280px] md:w-[320px] p-5">
                    
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                         <img 
                            src={item.image} 
                            alt={item.details}
                            className="w-full h-full grayscale object-contain relative left-16 scale-[230%] 
                            group-hover:grayscale-0 transition-all duration-300"
                        />
                         {/* Removed inner SVG */}
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col gap-2">
                        <div>
                            {/* Title */}
                            <h4 className="font-mono font-bold text-red-500 text-sm tracking-widest mb-1">{item.title}</h4>
                            {/* Component Name */}
                            <h3 className="font-sans font-bold text-white text-lg md:text-xl leading-tight">{item.details}</h3>
                        </div>
                    </div>
                </div>
                
                {/* SVG Line - Positioned outside, between box and center (car) */}
                {item.id === 'camera' && (
                   <svg 
                     viewBox="-3 3 8 4" 
                     className="absolute left-full top-1/2 -translate-y-1/2 w-64 h-64 z-0 pointer-events-none -ml-8"
                     preserveAspectRatio="xMidYMid meet"
                     style={{ shapeRendering: "geometricPrecision" }} // Critical for smooth lines
                   >
                     <path 
                       id="camera-path"
                       d="M -2 5 C -1 5 2 6 1 7 S -2 6 3 6 C 4 6 5 6 6 6" 
                       fill="none" 
                       stroke="#ef4444" 
                       strokeWidth="0.15"
                       strokeLinecap="round"
                       className="will-change-[stroke-dashoffset]" // Hint browser for performance
                     />
                   </svg>
                 )}
            </div>
            ))}
           
             {/* SMOOTH TRANSITION GRADIENT */}
             <div className="absolute bottom-0 left-0 w-full h-64 -z-10 bg-gradient-to-b from-transparent via-black/20 to-mono-900 pointer-events-none"></div>
          </div>
      </div>
    </section>
  );
}
