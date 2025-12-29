import { useEffect, useRef, useState, Suspense, lazy } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, PerformanceMonitor } from '@react-three/drei';
import Experience from './Experience';
import Overlay from './Overlay';
import { ReactLenis } from '@studio-freight/react-lenis'
import { LoadingScreen } from './LoadingScreen';
import { Navigation } from './components/Tabs';

// Lazy Load Sections
const TechStackSection = lazy(() => import('./sections/TechStackSection').then(transformNamed('TechStackSection')));
const AIPerformanceSection = lazy(() => import('./sections/AI-PerformanceSection').then(transformNamed('AIPerformanceSection')));
const GanttChartSection = lazy(() => import('./sections/GanttChartSection').then(transformNamed('GanttChartSection')));
const TeamSection = lazy(() => import('./sections/TeamSection').then(transformNamed('TeamSection')));
const FooterSection = lazy(() => import('./sections/FooterSection').then(transformNamed('FooterSection')));
const CarPartsSection = lazy(() => import('./sections/CarPartsSection').then(transformNamed('CarPartsSection')));
const GallerySection = lazy(() => import('./sections/GallerySection')); // Default export

// Helper for named exports
function transformNamed(name: string) {
  return (module: any) => ({ default: module[name] });
}

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [start, setStart] = useState(false);
  const [lowQuality, setLowQuality] = useState(false); // Optimization state
  const lenisRef = useRef<any>(null);

  // Scroll Lock & Visibility Logic
  useEffect(() => {
    if (start) {
      document.body.style.overflow = '';
      document.body.style.cursor = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
      document.body.style.cursor = 'wait';
      window.scrollTo(0, 0); // Force scroll to top
    }
  }, [start]);

  useEffect(() => {
    // GSAP Ticker Integration for Lenis
    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0); // Disable lag smoothing for direct 1:1 sync

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  // Force refresh for scroll triggers
  useEffect(() => {
    if (start) {
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 500);
     }
  }, [start]);

  return (
    <>
      <LoadingScreen started={start} onStarted={() => setStart(true)} />

      {/* Main Content Wrapper - Hidden until started */}
      <div
        className={`transition-opacity duration-1000 ${start ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <ReactLenis
          root
          ref={lenisRef}
          autoRaf={false}
          options={{
            lerp: 0.05,
            duration: 1.5,
            smoothWheel: true
          }}
        >

          {/* === PART 1: THE 3D TUNNEL (550vh) === */}
          <div id="scroll-tunnel" className="relative h-[500vh] w-full bg-black z-40">

            <div className="sticky top-0 h-screen w-full overflow-hidden">

              {/* 3D SCENE */}
              <div className="absolute inset-0 z-0">
                <Canvas
                  shadows
                  className="bg-black"
                  camera={{ fov: 12 }}
                  gl={{ antialias: false, stencil: false, depth: true }}
                  dpr={[1, 1.5]} 
                >
                  <PerformanceMonitor onDecline={() => setLowQuality(true)} />
                  <AdaptiveDpr pixelated />
                  <Experience lowQuality={lowQuality} />
                </Canvas>
              </div>
            </div>


            <div className="absolute top-0 left-0 w-full z-10 pointer-events-none">
              <Overlay />
            </div>

          </div>

          {/* === PART 2: STATIC CONTENT === */}
          <div className="relative z-20 w-full bg-mono-900 text-mono-0 font-sans border-t border-mono-800">
            <div className="fixed inset-0 z-0 pointer-events-none opacity-40"
              style={{ backgroundImage: 'radial-gradient(#27272a 1px, transparent 1px)', backgroundSize: '16px 16px' }}>
            </div> 
            <div className="relative z-10 shadow-2xl min-h-screen">
              <Suspense fallback={<div className="h-screen w-full bg-black"></div>}>
                {start && (
                  <>
                    <div id="tech-stack">
                      <TechStackSection />
                    </div>
                    <div id="car-parts">
                      <CarPartsSection />
                    </div>

                    <div id="ai-performance">
                      <AIPerformanceSection />
                    </div>
                    <div id="gantt-chart">
                      <GanttChartSection />
                    </div>
                    <div id="team">
                      <TeamSection />
                    </div>
                    <div id="gallery">
                      <GallerySection />
                    </div>
                    <div id="footer">
                      <FooterSection />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-[20vh] md:h-[100vh] w-full md:scale-100 z-50 pointer-events-none mix-blend-overlay opacity-80">
                      <img src="/media/background.png" alt="carbg" className="w-full h-full object-cover object-bottom" />
                    </div>
                  </>
                )} 
              </Suspense>
            </div>
          </div>

          {start && <Navigation />}
        </ReactLenis>
      </div>
    </>
  );
}
