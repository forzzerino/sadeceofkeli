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
            SİSTEM YAPISI & PERFORMANS METRİKLERİ
          </p>
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* CARD 1: LANE TRACKING */}
          <div ref={addToRefs} className="bg-mono-900 border border-mono-700 p-8 relative group overflow-hidden transition-all hover:border-red-600/50 hover:shadow-2xl duration-300 h-full flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-24 h-1 bg-red-600"></div>
            
            <div className="w-full">
              <h3 className="text-3xl font-bold uppercase  mb-1 text-mono-0">
                Şerit Takibi
              </h3>
              <p className="text-sm font-mono text-red-500 mb-6 tracking-wider">
                REGRESSION CNN // NVIDIA MODEL
              </p>

             <div className="flex md:flex-row flex-col justify-between mb-4">
               <div className="flex items-center gap-4">
                <span className="stat-number text-7xl font-black tracking-tighter text-mono-0" data-target="0.05">0</span>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-red-600">MAE</span>
                  <span className="text-xs text-mono-500 font-mono uppercase">Ortalama Mutlak Hata</span>
                </div>
              </div>

              <div className="flex flex-row gap-4  items-center md:mt-0 mt-4">
                 {/* Chart */}
                <div className="relative shrink-0 mx-auto md:mx-0">
                   <DonutChart 
                     data={[
                       { value: 60, color: "#EF4444", label: "İleri" },
                       { value: 21, color: "#B91C1C", label: "Sol" },
                       { value: 19, color: "#7F1D1D", label: "Sağ" },
                     ]} 
                   />
                   <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                     <span className="text-xl font-bold text-mono-0">5780</span>
                     <span className="text-xs font-mono text-mono-500">Veri</span>
                     
                   </div>
                   
                 </div>

                 {/* Legend */}
                 <div className="flex flex-col justify-center gap-4 w-full ml-2 lg:ml-8">
                   <LegendItem color="#EF4444" label="İleri" value="60%" />
                   <LegendItem color="#B91C1C" label="Sol" value="21%" />
                   <LegendItem color="#7F1D1D" label="Sağ" value="19%" />
                 </div>
              </div>
             </div>

              <div className="space-y-4 text-mono-400 border-t border-mono-700 pt-4 text-sm leading-relaxed">
                  <p>
                    <strong className="text-mono-0 block mb-1">DATASET:</strong>
                    Aracın kamerasından toplanan <strong>5.780</strong> görsel. Modelin dönüşleri ezberlememesi için %60 İleri, %40 Dönüş olarak dengelenmiştir.
                  </p>
                  <p>
                    <strong className="text-mono-0 block mb-1">MİMARİ:</strong>
                    Sınıflandırma yerine sürekli açı değeri üreten <strong>Regresyon CNN</strong>. NVIDIA mimarisi temel alınmış, ELU aktivasyonu ve MSE kaybı ile optimize edilmiştir.
                  </p>
              </div>
            </div>
          </div>

          {/* CARD 2: OBJECT DETECTION */}
          <div ref={addToRefs} className="bg-mono-900 border border-mono-700 p-8 relative group overflow-hidden transition-all hover:border-blue-500/50 hover:shadow-2xl duration-300 h-full flex flex-col justify-between">
             <div className="absolute top-0 right-0 w-24 h-1 bg-blue-500"></div>

             <div className="w-full">
              <h3 className="text-3xl font-bold uppercase  mb-1 text-mono-0">
                Trafik Lambası
              </h3>
              <p className="text-sm font-mono text-blue-500 mb-6 tracking-wider">
                FASTER R-CNN // CLASSIFICATION
              </p>

             <div className="flex md:flex-row flex-col justify-between mb-4">
               <div className="flex items-center gap-4 ">
                <span className="stat-number text-7xl font-black tracking-tighter text-mono-0" data-target="94.5">0%</span>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-blue-500">ACC</span>
                  <span className="text-xs text-mono-500 font-mono uppercase">Doğruluk Oranı</span>
                </div>
                </div>

              <div className="flex flex-row gap-4 items-center md:mt-0 mt-4">
                  {/* Chart */}
                 <div className="relative shrink-0 mx-auto md:mx-0">
                  <DonutChart 
                    data={[
                      { value: 51.5, color: "#3B82F6", label: "Kırmızı" },
                      { value: 45.1, color: "#10B981", label: "Yeşil" },
                      { value: 3.3, color: "#F59E0B", label: "Sarı" },
                    ]} 
                  />
                   <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                     <span className="text-xl font-bold text-mono-0">R-CNN</span>
                   </div>
                </div>

                {/* Legend */}
                 <div className="flex flex-col justify-center gap-4 w-full ml-2 lg:ml-8">
                  <LegendItem color="#3B82F6" label="Kırmızı" value="51.5%" />
                  <LegendItem color="#10B981" label="Yeşil" value="45.1%" />
                  <LegendItem color="#F59E0B" label="Sarı" value="3.3%" />
                </div>
              </div>

              </div>
              <div className="space-y-4 text-mono-400 border-t border-mono-700 pt-4 text-sm leading-relaxed">
                  <p>
                    <strong className="text-mono-0 block mb-1">DATASET:</strong>
                    Kaggle kaynaklı nesne tespiti verisi. Her ışık (Kırmızı, Yeşil, Sarı) için bounding-box koordinatları ile etiketlenmiştir.
                  </p>
                   <p>
                    <strong className="text-mono-0 block mb-1">MİMARİ:</strong>
                    <strong>Faster R-CNN</strong> kullanılmıştır. RPN (Region Proposal Network) ile aday bölgeler taranır ve SGD optimizatörü ile sınıflandırılır.
                  </p>
              </div>
          </div>
        </div>

        </div>

        {/* MIMARI GÖRSEL ALANI */}
        <div className="max-w-7xl mx-auto mt-16 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <h4 className="text-3xl font-bold uppercase  text-mono-0">SİSTEM AKIŞ ŞEMASI</h4>
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


// Donut Chart Component
function DonutChart({ data }: { data: { value: number; color: string; label: string }[] }) {
    let currentAngle = 0;
    const gradientParts = data.map((item) => {
        const start = currentAngle;
        const end = currentAngle + item.value;
        currentAngle = end;
        return `${item.color} ${start}% ${end}%`;
    });
    const gradientString = `conic-gradient(${gradientParts.join(", ")})`;

    return (
        <div 
            className="w-32 h-32 rounded-full relative"
            style={{ background: gradientString }}
        >
            <div className="absolute inset-6 bg-mono-900 rounded-full" />
        </div>
    );
}

// Legend Item Component
function LegendItem({ color, label, value }: { color: string; label: string; value: string }) {
    return (
        <div className="flex items-center justify-between w-full text-xs">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: color }} />
                <span className="text-mono-400">{label}</span>
            </div>
            <span className="font-bold ml-2 text-mono-200 font-mono">{value}</span>
        </div>
    )
}

