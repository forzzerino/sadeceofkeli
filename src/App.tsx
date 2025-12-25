import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience';
import Overlay from './Overlay';
import { ReactLenis } from '@studio-freight/react-lenis'
import { LoadingScreen } from './LoadingScreen';
import { useState } from 'react';
import { TechStackSection } from './sections/TechStackSection';
import { TimelineSection } from './sections/TimelineSection';
import { FooterSection } from './sections/FooterSection';
import { TechSpecsSection } from './sections/TechSpecsSection';


gsap.registerPlugin(ScrollTrigger);
export default function App() {
  const [start, setStart] = useState(false);

  // Ticker integration for Lenis + GSAP
  useEffect(() => {
    // Force a refresh after a delay to ensure 500vh is registered
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
     if (start) {
        // Double check when loading finishes
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 500);
     }
  }, [start]);

  // useLayoutEffect(() => {
  //   window.scrollTo(0, 0);
  //   if ('scrollRestoration' in history) {
  //     history.scrollRestoration = 'manual';
  //   }
  // }, []);

  return (
    <>
      <LoadingScreen started={start} onStarted={() => setStart(true)} />
      <ReactLenis root>
        
        {/* === PART 1: THE 3D TUNNEL (550vh) === */}
        <div id="scroll-tunnel" className="relative h-[500vh] w-full bg-black z-40">
          
          {/* THE STICKY VIEWPORT (100vh) 
              This stays pinned to the top of the viewport while we scroll through the 500vh tunnel.
          */}
          <div className="sticky top-0 h-screen w-full overflow-hidden">
             
             {/* 3D SCENE */}
             <div className="absolute inset-0 z-0">
                <Canvas 
                  shadows 
                  className="bg-black" 
                  camera={{ fov: 12 }} 
                  gl={{ antialias: false, stencil: false, depth: true }}
                >
                  <Experience />
                </Canvas>
             </div>
          </div>

           {/* TEXT OVERLAY 
               MOVED OUTSIDE STICKY: Now it sits absolutely in the tall tunnel.
               As the tunnel moves up (scroll), this text layer moves with it,
               creating the scroll effect over the pinned canvas.
           */}
           <div className="absolute top-0 left-0 w-full z-10 pointer-events-none">
              <Overlay />
           </div>

        </div>

        {/* === PART 2: STATIC CONTENT === */}
        <div className="relative z-20 w-full bg-mono-800 text-mono-0 font-sans border-t border-mono-800">
          <div className="fixed inset-0 z-0 pointer-events-none opacity-40" 
              style={{ backgroundImage: 'radial-gradient(#27272a 1px, transparent 1px)', backgroundSize: '16px 16px' }}>
          </div> 
          <div className="relative z-10 shadow-2xl">
            {start && (
              <>
                {/* TechStackSection moved to Overlay (Exploded View) */}
                <TechSpecsSection />
                <TimelineSection />
                <FooterSection />
              </>
            )} 
          </div>
        </div>

      </ReactLenis>
    </>
  );
}
