import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SystemArchitecture from "../components/SystemArchitecture";

// GSAP Plugin Kaydı
gsap.registerPlugin(ScrollTrigger);

export function AIPerformanceSection() {
  // TypeScript: Ref tiplerini HTML elementlerine göre belirliyoruz
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  // Bir dizi elementi tutacağımız için başlangıç değeri boş dizi
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    // Context scope'u containerRef olarak belirliyoruz
    const ctx = gsap.context(() => {
      


      // 3. Rakamların Sayması (Counter Effect)
      if (containerRef.current) {
        // Scoped selection to avoid conflicts
        const numbers = containerRef.current.querySelectorAll(".stat-number");
        
        numbers.forEach((num) => {
          const element = num as HTMLElement;
          const targetAttr = element.getAttribute("data-target");
          
          if (!targetAttr) return;

          const target = parseFloat(targetAttr);
          const isFloat = target < 1; 

          gsap.to(element, {
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
            },
            innerHTML: target, 
            duration: 2,
            ease: "power2.out",
            snap: { innerHTML: isFloat ? 0.01 : 0.1 },
            onUpdate: function () {
              const currentElement = this.targets()[0] as HTMLElement;
              if (!isFloat) {
                  currentElement.innerHTML = currentElement.innerHTML + "%";
              }
            },
          });
        });
      }
    }, containerRef); // Scope burada belirlendi

    return () => ctx.revert();
  }, []);

  // Ref Callback fonksiyonu için tip tanımı
  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section ref={containerRef} className="bg-transparent text-mono-0 section-padding overflow-hidden relative">
      {/* Arkaplan Deseni - Managed by Global CSS now, but kept for local overrides or removed if global matches */}


      <div className="mx-auto relative z-10">
        
        {/* HEADER SECTION */}
        <div ref={titleRef} className="section-header-container">
          <h2 className="section-title-large">
            YAPAY ZEKA & <span className="text-red-600">PERFORMANS</span>
          </h2>
          <p className="section-subtitle-large">
            System Yapısı & Performans Metrikleri
          </p>
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* CARD 1: LANE TRACKING */}
          <div ref={addToRefs} className="bg-mono-900 border border-mono-700 p-8 relative group overflow-hidden transition-all hover:border-red-600/50 hover:shadow-2xl duration-300 h-full flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-24 h-1 bg-red-600"></div>
            
            <div className="w-full">
              <h3 className="text-3xl font-bold uppercase italic mb-1 text-mono-0">
                Şerit Takibi
              </h3>
              <p className="text-sm font-mono text-red-500 mb-6 tracking-wider">
                REGRESSION CNN // NVIDIA MODEL
              </p>

              <div className="flex items-baseline gap-2 mb-6 border-b border-mono-700 pb-6">
                <span className="stat-number text-7xl font-black tracking-tighter text-mono-0" data-target="0.05">0</span>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-red-600">MAE</span>
                  <span className="text-xs text-mono-500 font-mono uppercase">Ortalama Mutlak Hata</span>
                </div>
              </div>

              <p className="text-mono-400 mb-6 leading-relaxed">
                Klasik sınıflandırma yerine, direksiyon açısı için sürekli değer üreten <strong className="text-mono-0">Uçtan Uca Regresyon</strong> mimarisi. Model, ELU aktivasyonu ile 5 Evrişim ve 4 Dense katmanından oluşur.
              </p>
            </div>

            <div className="space-y-3 font-mono text-xs text-mono-500 w-full">
              <p className="uppercase tracking-widest mb-1">Eğitim Verisi Dağılımı</p>
              <div className="w-full h-2 bg-mono-700 flex">
                <div className="h-full bg-red-600" style={{ width: '21%' }}></div>
                <div className="h-full bg-mono-500" style={{ width: '60%' }}></div>
                <div className="h-full bg-red-800" style={{ width: '19%' }}></div>
              </div>
              <div className="flex justify-between">
                <span className="text-red-500">Sol (%21)</span>
                <span>İleri (%60)</span>
                <span className="text-red-700">Sağ (%19)</span>
              </div>
            </div>
          </div>

          {/* CARD 2: OBJECT DETECTION */}
          <div ref={addToRefs} className="bg-mono-900 border border-mono-700 p-8 relative group overflow-hidden transition-all hover:border-blue-500/50 hover:shadow-2xl duration-300 h-full flex flex-col justify-between">
             <div className="absolute top-0 right-0 w-24 h-1 bg-blue-500"></div>

             <div className="w-full">
              <h3 className="text-3xl font-bold uppercase italic mb-1 text-mono-0">
                Trafik Lambası
              </h3>
              <p className="text-sm font-mono text-blue-500 mb-6 tracking-wider">
                FASTER R-CNN // CLASSIFICATION
              </p>

              <div className="flex items-baseline gap-2 mb-6 border-b border-mono-700 pb-6">
                <span className="stat-number text-7xl font-black tracking-tighter text-mono-0" data-target="94.5">0%</span>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-blue-500">ACCURACY</span>
                  <span className="text-xs text-mono-500 font-mono uppercase">Doğruluk Oranı</span>
                </div>
              </div>

              <p className="text-mono-400 mb-6 leading-relaxed">
                Bölge Öneri Ağı (RPN) kullanan Faster R-CNN mimarisi. Görüntüyü tarar, ışıkları tespit eder ve <strong className="text-mono-0"><span className="text-red-500">Kırmızı</span> / <span className="text-green-500">Yeşil</span> / <span className="text-yellow-500">Sarı</span> / <span className="text-gray-200">Kapalı</span></strong> olarak sınıflandırır.
              </p>
            </div>

            <ul className="grid grid-cols-2 gap-4 font-mono text-xs text-mono-300 w-full">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                8380+ Görsel Veri
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                RPN Mekanizması
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                SGD Optimizatör
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                0.003 MSE Kayıp
              </li>
            </ul>
          </div>

        </div>

        {/* MIMARI GÖRSEL ALANI */}
        <div className="max-w-7xl mx-auto mt-16 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                <h4 className="text-3xl font-bold uppercase italic text-mono-0">Sistem Akış Şeması</h4>
                <span className="text-xs font-mono text-mono-500 bg-mono-800 px-2 py-1 border border-mono-700">
                    DIAGRAM_V1.0.SVG
                </span>
            </div>
            
            <div className="w-full  bg-mono-900 border border-mono-700 border-dashed flex items-center justify-center relative overflow-hidden group">
                <SystemArchitecture />
            </div>
        </div>

      </div>
    </section>
  );
};

