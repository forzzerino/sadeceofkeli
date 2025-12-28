import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function FooterSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = document.querySelectorAll('.footer-animate');
      elements.forEach((el, idx) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          y: 30,
          duration: 0.6,
          delay: idx * 0.05,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={sectionRef} className="relative w-full bg-transparent section-padding">

      <div className="relative z-10">
        {/* Main content */}
        <div className="mx-auto space-y-16 text-center">
          


          {/* Bottom divider */}
          <div className="border-t border-mono-700 pt-8">
            <p className="font-mono text-xs text-mono-600 uppercase tracking-widest">
              Sadece Öfkeli • RC Yarı-Otonom Araç Projesi
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
