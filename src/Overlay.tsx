import { useLayoutEffect, useRef } from "react";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Chassis from "./components/Chassis";
import Electronics from "./components/Electronics";
import { TechExplodedSection } from "./sections/TechExplodedSection";

export default function Overlay() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Scroll to top on page load/refresh
    window.scrollTo(0, 0);
  }, []);

  return (
    <div ref={containerRef} className="relative z-10 w-full pointer-events-none select-none overflow-hidden text-white">
      <Hero />
      <Intro />
      <Chassis />
      <Electronics />
      {/* <TechExplodedSection /> */}
    </div>
  );
}
