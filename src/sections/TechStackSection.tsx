import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TechCardProps {
  title: string;
  description: string;
  specs: string[];
  className?: string;
  image?: string;
}

function TechCard({ title, description, specs, className = '', image }: TechCardProps) {
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
      className={`info-box flex flex-col justify-between group ${className}`}
    >
      {/* Background Image if present */}
      {image && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src={image} 
            alt="" 
            className="w-full h-full relative -right-20 object-contain grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300 "
          />
        </div>
      )}

      <div className="relative z-10">
        <h3 className="box-title">{title}</h3>
        <p className="box-subtitle !text-mono-300 !mb-6 !normal-case">{description}</p>
      </div>
      <div className="space-y-2 relative z-10">
        {specs.map((spec, idx) => (
          <div key={idx} className="flex items-start align-middle">
            <span className="text-red-600 pr-1">›</span>
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
          <h2 className="section-title-large">TEKNOLOJİ <span className="text-red-600">YIĞINI</span></h2>
          <p className="section-subtitle-large">Donanım Altyapısı</p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 md:gap-6 auto-rows-max">
          {/* Raspberry Pi - Resized to 1x1 */}
          <TechCard
            title="Beyin"
            description="Raspberry Pi 4"
            image="/tech/raspberry-pi.png" 
            specs={[
              'Yüksek Seviye Mantık',
              'Bilgisayarlı Görü',
              '4GB RAM',
            ]}
            className="col-span-1 lg:col-span-1 min-h-[220px] md:min-h-[300px]" 
          />

          {/* Arduino - medium */}
          <TechCard
            title="Kontrol"
            description="Arduino Nano"
            image="/tech/arduino-nano.png"
            specs={['Motor Stabilitesi', 'Gerçek Zamanlı Kontrol', 'Düşük Gecikme']}
            className="col-span-1 lg:col-span-1"
          />

          {/* Servo Motor - small - Replaces Camera */}
          <TechCard
            title="Yönlendirme"
            description="DSS-M15S SERVO"
            image="/tech/servo-motor.png"
            specs={['Yüksek Tork', 'Hassas Açı Kontrolü', 'Metal Dişli']}
            className="col-span-1 lg:col-span-1"
          />

          {/* Battery - medium */}
          <TechCard
            title="Güç"
            description="11.1V LiPo Batarya"
            image="/tech/lipo-battery.png"
            specs={['3S Konfigürasyonu', '2200mAh Kapasite', 'Hot Swap Hazır']}
            className="col-span-1 lg:col-span-1"
          />

          {/* DC Motor - small - Replaces Connectivity */}
          <TechCard
            title="Motor"
            description="FJGB37-3530"
            image="/tech/dc-motor.png"
            specs={['Yüksek RPM', 'Güçlü Çekiş', 'Dayanıklı Yapı']}
            className="col-span-1 lg:col-span-1 min-h-[220px] md:min-h-[300px]"
          />

           {/* Motor Driver - small - Resized to 1x1 */}
           <TechCard
            title="Sürücü"
            description="L298N"
            image="/tech/motor-driver.png"
            specs={['Çift H-Köprüsü', '2A Akım Kapasitesi', 'PWM Kontrol']}
            className="col-span-1 lg:col-span-1"
          />

           {/* Camera - small - Resized to 1x1 */}
           <TechCard
            title="Görüntü"
            description="OV5647 5MP"
            image="/tech/kamera.png"
            specs={['1080p Video', 'Gerçek Zamanlı Akış', ' Sensör']}
            className="col-span-1 lg:col-span-1"
          />

           {/* Sensor - New Card - 8th Item */}
           <TechCard
            title="Sensör"
            description="HC-SR04"
            image="/tech/sensor.png"
            specs={['Mesafe Ölçümü', 'Engel Algılama', 'Ultrasonik']}
            className="col-span-1 lg:col-span-1"
          />

        </div>
      </div>
      
    </section>
  );
}
