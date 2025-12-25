import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  'Mehmet K.',
  'Aydın T.',
  'Ceren D.',
  'Fatih Y.',
  'Gizem A.',
  'Hakan M.',
  'İrem S.',
  'Kerem B.',
];

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
          {/* Title */}
          <div className="footer-animate space-y-4 text-left">
             <div className="section-header-container mx-auto inline-block text-left w-full">
                <h2 className="section-title-large">Mühendislik <span className="text-red-600">Ekibi</span></h2>
                <p className="section-subtitle-large">
                  8 Kişilik Mühendislik Ekibi İşbirliği
                </p>
             </div>
          </div>

          {/* Team members grid */}
          <div className="max-w-7xl mx-auto footer-animate grid grid-cols-2 md:grid-cols-4 gap-4">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="border border-mono-700 p-4 bg-mono-800 hover:border-mono-600 transition-all duration-300"
              >
                <p className="font-mono text-small text-mono-300">{member}</p>
              </div>
            ))}
          </div>

          {/* University & date */}
          <div className="footer-animate space-y-6 py-8">
            {/* Logo placeholder */}
            <div className="flex justify-center">
              <div className="border-2 border-mono-700 p-8 bg-mono-800 w-48 h-32 flex items-center justify-center">
                <div className="text-center">
                  <p className="font-mono text-xs text-mono-600 uppercase tracking-widest mb-2">
                    Kurum
                  </p>
                  <p className="text-small font-bold text-mono-300">
                    Bandırma Onyedi
                    <br />
                    Eylül Üniversitesi
                  </p>
                </div>
              </div>
            </div>

            {/* Project date */}
            <div className="space-y-2">
              <p className="font-mono text-xs text-mono-600 uppercase tracking-widest">
                Proje Tarihi
              </p>
              <p className="text-2xl md:text-3xl font-bold text-mono-0">
                Aralık 2025
              </p>
            </div>
          </div>

          {/* Bottom divider */}
          <div className="border-t border-mono-700 pt-8">
            <p className="font-mono text-xs text-mono-600 uppercase tracking-widest">
              Sadece Öfkeli • RC Otonom Araç Projesi
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
