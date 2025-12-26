import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TimelinePhase {
  title: string;
  duration: string;
  items: string[];
}

const phases: TimelinePhase[] = [
  {
    title: 'Motor & Mekanik',
    duration: 'Hafta 1',
    items: [
      'Görev Dağılımı & Planlama',
      'Motor & Sürücü Belirlenmesi',
      'Mekanik Gereksinim Analizi',
    ],
  },
  {
    title: 'Elektronik Altyapı',
    duration: 'Hafta 2-3',
    items: [
      'Donanım & Kart Seçimi',
      'Güvenli Çalışma Protokolleri',
      'Devre Şemaları & Bağlantı Diyagramları',
    ],
  },
  {
    title: 'Algoritma & Doğrulama',
    duration: 'Hafta 4-5',
    items: [
      'Ekipman Uygunluk Denetimi',
      'Otonom Rota Planlama Algoritmaları',
      'Hareket Mantığı Hazırlığı',
    ],
  },
  {
    title: 'Sistem Entegrasyon',
    duration: 'Hafta 6',
    items: [
      'Şase & Donanım Montajı',
      'Yazılım Yığını Denetimi',
      'Tam Sistem Entegrasyon Testi',
    ],
  },
  {
    title: 'Tasarım & Arayüz',
    duration: 'Hafta 7',
    items: [
      '3D Tasarım Revizyonları',
      'Web Arayüz Geliştirme',
      'Sunum & Afiş Tasarımı',
    ],
  },
  {
    title: 'Final Raporlaması',
    duration: 'Hafta 8',
    items: [
      'Genel Rapor Düzenlemesi',
      'Dokümantasyon Finalizasyonu',
      'Proje Teslimi',
    ],
  },
];

function TimelineNode({ title, duration, items, index }: TimelinePhase & { index: number }) {
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={nodeRef}
      className=" flex-shrink-0 w-[24rem] md:w-[28rem] scroll-snap-align-start group"
    >
      <div className="h-full bg-mono-900 border border-mono-700 p-8 hover:border-red-600 shadow-xl transition-all duration-300">
        
        {/* Header: Phase & Duration */}
        <div className="flex justify-between items-start mb-6">
          <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
            Aşama {index + 1}
          </div>
          <div className="text-sm font-bold font-mono text-red-500 uppercase">
            {duration}
          </div>
        </div>

        {/* Title */}
        <h4 className="text-h3 font-bold text-white mb-8 group-hover:text-accent-cyan transition-colors duration-300">
          {title}
        </h4>

        {/* List */}
        <ul className="space-y-4">
          {items.map((item, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 font-mono text-small text-mono-300"
            >
              <div className="mt-0.5 rounded-full p-1 bg-red-500 text-white">
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                 </svg>
              </div>
              <span className="leading-snug">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function TimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!trackRef.current || !sectionRef.current) return;

      const track = trackRef.current;
      const trackWidth = track.scrollWidth;
      const scrollDistance = trackWidth - window.innerWidth;


      // Create a timeline for better control over the sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1.5, // Increased smoothing/inertia
          // Significantly increase the scroll distance (3x width) to make it slower/longer
          end: () => `+=${Math.max(3000, trackWidth * 2)}`, 
          invalidateOnRefresh: true,
        },
      });

      // 1. Initial Buffer: Pin but don't move yet (smooth transition from vertical)
      tl.to({}, { duration: 0.5 });

      // 2. The Horizontal Scroll
      tl.to(track, {
        x: -scrollDistance,
        duration: 10, // Relative duration within the timeline
        ease: 'none',
      });

      // 3. Final Buffer: Hold position before unpinning (smooth transition to vertical)
      tl.to({}, { duration: 0.5 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-transparent section-padding overflow-hidden flex flex-col justify-center"
    >
     
      {/* Header - Fixed pos within pinned section */}
      <div className="absolute top-0 left-0 w-full p-12 py-36 z-20 pointer-events-none">
        <div className="section-header-container border-red-600">
             <h2 className="section-title-large">8 Haftalık <span className="text-red-600">Sprint</span></h2>
             <p className="section-subtitle-large">
               Mühendislik & Geliştirme Süreci
             </p>
        </div>
      </div>

      {/* Scroll Track */}
      <div className="w-full flex items-center mt-36">
        {/* Track Container */}
        <div 
          ref={trackRef}
          className="flex gap-8 px-12 pr-24 items-center w-[max-content]"
          // Add padding to offset the header/footer visually if needed, 
          // or just rely on flex-centering and gap.
        >
          {phases.map((phase, idx) => (
            <TimelineNode
              key={idx}
              {...phase}
              index={idx}
            />
          ))}
        </div>
      </div>

         
       {/* Fade gradient on right */}
       <div className="absolute top-96 h-96  right-0 bottom-0 w-36 bg-gradient-to-l from-mono-900 to-transparent pointer-events-none z-20" />
       {/* Fade gradient on left */}
       <div className="absolute top-96 h-96 left-0 bottom-0 w-36 bg-gradient-to-r from-mono-900 to-transparent pointer-events-none z-20" />
    </section>
    
  );
}
