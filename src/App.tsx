import { Canvas } from '@react-three/fiber';
import Experience from './Experience';
import Overlay from './Overlay';
import { ReactLenis } from '@studio-freight/react-lenis'
import { LoadingScreen } from './LoadingScreen';
import { useState } from 'react';

export default function App() {
  const [start, setStart] = useState(false);

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
        <div className={`bg-black text-white min-h-screen w-full transition-opacity duration-1000 ${start ? "opacity-100" : "opacity-0"}`}>
          {/* 
             Canvas is FIXED in the background. 
             It stays put while the Overlay scrolls over it.
          */}
          <div className="fixed top-0 left-0 h-screen w-full z-0">
            <Canvas 
              shadows 
              className="bg-black" 
              camera={{ fov: 14 }} 
              gl={{ antialias: false, stencil: false, depth: true }}
            >
               <Experience />
            </Canvas>
          </div>
          
          {/* 
             Overlay is RELATIVE and flows naturally.
             Using "z-10" to sit on top of the fixed Canvas.
          */}
          <Overlay />
        </div>
      </ReactLenis>
    </>
  );
}
