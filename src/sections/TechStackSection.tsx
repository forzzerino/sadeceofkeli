import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TechCardProps {
  title: string;
  description: string;
  specs: string[];
  className?: string;
}

function TechCard({ title, description, specs, className = '' }: TechCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`bento-card flex flex-col justify-between ${className}`}
    >
      <div>
        <h3 className="text-h2 font-bold text-mono-0 mb-2">{title}</h3>
        <p className="text-body text-mono-300 mb-6">{description}</p>
      </div>
      <div className="space-y-2">
        {specs.map((spec, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <span className="text-mono-600 mt-1">→</span>
            <span className="font-mono text-small text-mono-400">{spec}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TechStackSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative w-full section-padding overflow-hidden"
    >

      <div className="relative z-10">
        <div className="section-header-container">
          <h2 className="section-title-large">Teknoloji <span className="text-red-600">Yığını</span></h2>
          <p className="section-subtitle-large">Donanım & Yazılım Altyapısı</p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-max">
          {/* Raspberry Pi - large, spans 2 cols */}
          {/* Raspberry Pi - large, spans 2 cols */}
          <TechCard
            title="Beyin"
            description="Raspberry Pi 4"
            specs={[
              'Yüksek Seviye Mantık',
              'Bilgisayarlı Görü',
              'Karar Verme',
              '4GB RAM',
            ]}
            className="lg:col-span-2 lg:row-span-2 h-full"
          />

          {/* Arduino - medium */}
          <TechCard
            title="Kontrol"
            description="Arduino Nano"
            specs={['Motor Stabilitesi', 'Gerçek Zamanlı Kontrol', 'Düşük Gecikme']}
            className="lg:col-span-1"
          />

          {/* Camera - small */}
          <TechCard
            title="Görüntü"
            description="Kamera Girişi"
            specs={['1080p Video', 'Gerçek Zamanlı Akış']}
            className="lg:col-span-1"
          />

          {/* Battery - medium */}
          <TechCard
            title="Güç"
            description="11.1V LiPo Batarya"
            specs={['3S Konfigürasyonu', '2200mAh Kapasite', 'Hot Swap Hazır']}
            className="lg:col-span-1"
          />

          {/* Connectivity - small */}
          <TechCard
            title="Arayüz"
            description="Kablosuz & Kablolu"
            specs={['GPIO Pinleri', 'Seri Haberleşme']}
            className="lg:col-span-1"
          />
        </div>
      </div>
    </section>
  );
}
