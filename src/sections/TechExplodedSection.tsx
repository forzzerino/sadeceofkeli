import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const techItems = [
  { 
    id: 'raspberry', 
    label: 'RASPBERRY', 
    image: '/tech/raspberry-pi.png',
    position: { top: '15%', left: '50%', transform: 'translate(-50%, -50%)' }, 
    origin: { x: 0, y: 100 }
  },
  { 
    id: 'arduino', 
    label: 'ARDUINO NANO', 
    image: '/tech/arduino-nano.png',
    position: { top: '25%', left: '85%', transform: 'translate(-50%, -50%)' }, 
    origin: { x: -100, y: 50 }
  },
  { 
    id: 'motor-driver', 
    label: 'MOTOR SÜRÜCÜ', 
    image: '/tech/motor-driver.png',
    position: { top: '25%', left: '15%', transform: 'translate(-50%, -50%)' },
    origin: { x: 100, y: 50 }
  },
  { 
    id: 'camera', 
    label: 'KAMERA', 
    image: '/tech/kamera.png',
    position: { top: '50%', left: '10%', transform: 'translate(-50%, -50%)' }, 
    origin: { x: 150, y: 0 }
  },
  { 
    id: 'dc-motor', 
    label: 'DC MOTOR', 
    image: '/tech/dc-motor.png',
    position: { top: '50%', left: '90%', transform: 'translate(-50%, -50%)' },
    origin: { x: -150, y: 0 }
  },
  { 
    id: 'servo', 
    label: 'SERVO MOTOR', 
    image: '/tech/servo-motor.png',
    position: { top: '75%', left: '15%', transform: 'translate(-50%, -50%)' }, 
    origin: { x: 100, y: -100 }
  },
  { 
    id: 'lipo', 
    label: 'LİPO PİL', 
    image: '/tech/lipo-battery.png',
    position: { top: '75%', left: '85%', transform: 'translate(-50%, -50%)' }, 
    origin: { x: -100, y: -100 }
  },
  { 
    id: 'sensor', 
    label: 'SENSÖR', 
    image: '/tech/sensor.png',
    position: { top: '88%', left: '50%', transform: 'translate(-50%, -50%)' }, 
    origin: { x: 0, y: -100 }
  },
];

export function TechExplodedSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    // SCROLL ANIMATION DISABLED FOR DEBUGGING - STATIC VIEW
    /* 
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.tech-item') as HTMLElement[];
      const lines = gsap.utils.toArray('.tech-line') as HTMLElement[];

      // Initial State
      gsap.set(items, { autoAlpha: 0, scale: 0.5 });
      gsap.set(lines, { autoAlpha: 0, scaleX: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom", 
          scrub: 1,
        }
      });

      // Animate items exploding outwards
      items.forEach((item, i) => {
          const dataOrig = techItems[i].origin;
          tl.fromTo(item, 
            { x: -dataOrig.x * 0.5, y: -dataOrig.y * 0.5, autoAlpha: 0, scale: 0.5 },
            { x: 0, y: 0, autoAlpha: 1, scale: 1, duration: 1, ease: "back.out(1.7)" },
            0 
          );
      });
      
      tl.to(lines, { autoAlpha: 1, scaleX: 1, duration: 0.5 }, 0.5);
    }, containerRef);

    return () => ctx.revert();
    */
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
                className="tech-item absolute flex flex-col items-center gap-2 group pointer-events-auto cursor-pointer"
                style={item.position}
                >
                {/* Image Container */}
                <div className="w-24 h-24 md:w-32 md:h-32 relative">
                    {/* Tech Image */}
                    <div className="absolute inset-0 bg-black/50 border border-mono-700 rounded-xl backdrop-blur-sm p-4 overflow-hidden group-hover:border-red-600 transition-colors duration-300">
                        <img 
                            src={item.image} 
                            alt={item.label}
                            className="w-full h-full object-contain mix-blend-screen drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                        />
                    </div>
                    
                    {/* Connection Line Indicator */}
                    <div 
                        className="tech-line absolute w-24 h-px bg-red-600 top-1/2 left-1/2 -z-10 origin-left"
                        style={{ 
                            transform: `rotate(${Math.atan2(-item.origin.y, -item.origin.x)}rad) translate(50%, 0)`
                        }}
                    />
                </div>

                {/* Label */}
                <span className="font-mono font-bold text-sm md:text-base text-mono-100 tracking-wider bg-black/80 px-3 py-1 rounded border border-mono-800">
                    {item.label}
                </span>
                </div>
            ))}
            
            {/* Central Label */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[pulse_2s_infinite]">
                <div className="w-4 h-4 bg-red-600 rounded-full shadow-[0_0_20px_rgba(220,38,38,1)]"></div>
                <div className="w-48 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent absolute top-1/2 left-1/2 -translate-x-1/2"></div>
            </div>
          </div>
      </div>
    </section>
  );
}
