import { useEffect, useState } from "react";
import { Home, Puzzle, Cpu, Brain, GitGraph, Users, Image } from "lucide-react";
import { ExpandableTabs } from "./ExpandableTabs";
import { useLenis } from "@studio-freight/react-lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

// Define tabs with corresponding section IDs
const navItems = [
  { title: "Giriş", icon: Home, id: "scroll-tunnel" },
  { title: "Teknoloji", icon: Cpu, id: "tech-stack" },
  { title: "Parçalar", icon: Puzzle, id: "car-parts" },
  { title: "AI", icon: Brain, id: "ai-performance" },
  { title: "Süreç", icon: GitGraph, id: "gantt-chart" },
  { title: "Ekip", icon: Users, id: "team" },
  { title: "Galeri", icon: Image, id: "gallery" },
];

export function Navigation() {
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Instance for clicking - get it once
  const lenisInstance = useLenis();

  // Subscription for visibility - runs on scroll
  useLenis((lenis) => {
    // Hide if at top (< 200px) OR at bottom (within 100px of limit)
    const isAtBottom = lenis.scroll > (lenis.limit - 100);

    if (lenis.scroll > 200 && !isAtBottom) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  const handleTabChange = (index: number) => {
    // Optimistic update
    setActiveTab(index);
    
    const targetId = navItems[index].id;
    const element = document.getElementById(targetId);
    
    if (element && lenisInstance) {
      lenisInstance.scrollTo(element, {
        offset: 0,
        duration: 2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    } else if (element) {
        // Fallback if Lenis isn't ready or used
        element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Determine active section based on scroll position using GSAP ScrollTrigger
    const triggers: ScrollTrigger[] = [];
    let timer: ReturnType<typeof setTimeout> | undefined;

    const initTriggers = () => {
      ScrollTrigger.refresh();

      triggers.forEach(t => t.kill()); // Clear old if any
      triggers.length = 0;

      let missingCount = 0;

      navItems.forEach((item, index) => {
        const element = document.getElementById(item.id);
        if (!element) {
          missingCount++;
          return;
        }

        triggers.push(
          ScrollTrigger.create({
            trigger: element,
            start: "top 60%", 
            end: "bottom 60%",
            onEnter: () => setActiveTab(index),
            onEnterBack: () => setActiveTab(index),
            invalidateOnRefresh: true 
          })
        );
      });

      // Retry if some elements are missing (lazy loading)
      if (missingCount > 0) {
        timer = setTimeout(initTriggers, 500);
      }
    };

    // Initial init
    timer = setTimeout(initTriggers, 500);

    // Refresh only when the page height actually changes (lazy sections,
    // images loading). A blind refresh every 2s re-measured all pins mid-scroll
    // and caused visible jumps.
    let refreshTimer: ReturnType<typeof setTimeout> | undefined;
    let lastHeight = document.body.scrollHeight;
    const resizeObserver = new ResizeObserver(() => {
      const height = document.body.scrollHeight;
      if (height === lastHeight) return;
      lastHeight = height;
      clearTimeout(refreshTimer);
      refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
    });
    resizeObserver.observe(document.body);

    // Cleanup
    return () => {
      clearTimeout(timer);
      clearTimeout(refreshTimer);
      resizeObserver.disconnect();
      triggers.forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="fixed bottom-6 left-0 right-0 flex justify-center z-50 pointer-events-none">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.5, type: "spring", bounce: 0 }}
            className="pointer-events-auto"
          >
            <ExpandableTabs
              tabs={navItems}
              activeTabIndex={activeTab}
              onChange={handleTabChange}
              className="bg-black/80 border-mono-700/60 backdrop-blur-md text-mono-200"
              activeColor="text-red-500 bg-mono-700/40" // Red accent as per theme
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}