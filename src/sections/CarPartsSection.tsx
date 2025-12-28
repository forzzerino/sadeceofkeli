import { useRef, useLayoutEffect, useState } from 'react';
import { Layers } from 'lucide-react';
import classNames from 'classnames';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type LayerType = 'material' | 'complete' | 'body' | 'rim' | 'tire';

export function CarPartsSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);
    const [activeStage, setActiveStage] = useState<LayerType>('material');

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: '+=600%', // 6 sections -> 600% for comfortable scrolling
                    pin: true,
                    scrub: 0.5,
                    onUpdate: (self) => {
                        // High precision progress bar
                        if (progressBarRef.current) {
                            progressBarRef.current.style.width = `${self.progress * 100}%`;
                        }

                        // Determine active stage based on progress (6 segments)
                        // 0-16.6%: Material (Entry)
                        // 16.6-33.3%: Complete
                        // 33.3-50%: Body
                        // 50-66.6%: Rim
                        // 66.6-83.3%: Tire
                        // 83.3-100%: Material (Exit)

                        const p = self.progress;
                        if (p < 0.166) setActiveStage('material');
                        else if (p < 0.333) setActiveStage('complete');
                        else if (p < 0.5) setActiveStage('body');
                        else if (p < 0.666) setActiveStage('rim');
                        else if (p < 0.833) setActiveStage('tire');
                        else setActiveStage('material');
                    }
                }
            });

            timelineRef.current = tl;

            // Distancer
            tl.to({}, { duration: 1 });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleCardClick = (targetStage: LayerType) => {
        if (!timelineRef.current || !timelineRef.current.scrollTrigger) return;

        // Calculate target progress based on stage centers
        let targetProgress = 0;
        switch (targetStage) {
            case 'complete': targetProgress = 0.25; break; // Center of 16.6-33.3
            case 'body': targetProgress = 0.416; break; // Center of 33.3-50
            case 'rim': targetProgress = 0.583; break; // Center of 50-66.6
            case 'tire': targetProgress = 0.75; break; // Center of 66.6-83.3
            default: return;
        }

        const st = timelineRef.current.scrollTrigger;
        const targetScroll = st.start + (st.end - st.start) * targetProgress;

        window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
        });
    };

    // Helper to render image layer (standard active/inactive)
    const renderLayer = (layer: LayerType, imgSrc: string, zIndex: number) => (
        <img
            src={imgSrc}
            className={classNames(
                "absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ease-in-out",
                `z-${zIndex}`,
                { "opacity-100": activeStage === layer, "opacity-0": activeStage !== layer }
            )}
            alt={layer}
        />
    );

    // Helper for active card highlighting
    const getCardClass = (layer: LayerType) => classNames(
        "relative bg-mono-900/50 backdrop-blur-sm border p-6 group transition-all duration-500 cursor-pointer hover:opacity-100 hover:border-red-600/50",
        {
            "border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.1)]": activeStage === layer,
            "border-mono-700 opacity-50": activeStage !== layer
        }
    );

  return (
      <section ref={containerRef} className="relative w-full h-screen  overflow-hidden border-t border-mono-800">
      
          {/* Scroll Progress Bar */}
          <div ref={progressBarRef} className="absolute top-0 left-0 h-1 bg-red-600 z-50 transition-none will-change-[width]" style={{ width: '0%' }} />

          <div className="relative z-10 mx-auto w-full h-full flex flex-col p-8 lg:p-16">

              {/* Header - Always Visible */}
              <div className="section-header-container mb-8 flex-shrink-0">
            <h2 className="section-title-large">
                      Mekanik Tasarım <span className="text-red-600"> & Üretim</span>
            </h2>
                  <div className="grid grid-cols-2 gap-8 text-mono-500 font-mono mt-4">
                      <span>BAĞLANTI: Metrik Vida + Fiberli Somun</span>
                      <span>DURUM: Optimize</span>
                  </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full pb-8">

            {/* LEFT COLUMN: VISUAL LAYERS */}
                  <div className="lg:col-span-7 relative flex items-center justify-center h-full bg-mono-900">
                
                {/* Background decorative frame */}
                      <div className="absolute inset-0 border border-mono-700 pointer-events-none">
                    <div className="absolute top-0 left-0 p-2 text-mono-500 font-mono">VIEWPORT_01</div>
                          <div className="absolute bottom-0 right-0 p-2 text-mono-500 font-mono">SCALE: 1:10</div>
                </div>

                {/* Layered Image Container */}
                      <div className="relative w-full aspect-square max-h-[60vh]">
                    


                          {/* 1. Material (Start & End) - Only visible when activeStage is 'material' */}
                          <img
                              src="/parts/meterial.png"
                              className={classNames(
                                  "absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ease-in-out z-10",
                                  {
                                      "opacity-100": activeStage === 'material',
                                      "opacity-0": activeStage !== 'material'
                                  }
                              )}
                              alt="Base Material"
                          />

                          {/* 2. Complete (Ghost Background) */}
                          {/* Visible fully when 'complete' is active. */}
                          {/* Visible as ghost (opacity-20) when 'body', 'rim', or 'tire' is active. */}
                          {/* Hidden when 'material' is active (start/end). */}
                          <img
                              src="/parts/complete.png"
                              className={classNames(
                                  "absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ease-in-out",
                                  {
                                      "z-20 opacity-100": activeStage === 'complete',
                                      "z-0 opacity-20": ['body', 'rim', 'tire'].includes(activeStage),
                                      "opacity-0": activeStage === 'material'
                                  }
                              )}
                              alt="Complete Assembly"
                          />

                          {renderLayer('body', '/parts/body.png', 30)}
                          {renderLayer('rim', '/parts/rim.png', 30)}
                          {renderLayer('tire', '/parts/tire.png', 30)}
                </div>
                      {/* Base Wireframe / Grid */}
                      <div
                          className="absolute inset-0 z-0 pointer-events-none opacity-20"
                          style={{
                              backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)',
                              backgroundSize: '40px 40px'
                          }}
                      />
            </div>

            {/* RIGHT COLUMN: DATA MODULES */}
                  <div className="lg:col-span-5 flex flex-col justify-between gap-4 h-full">
                
                {/* CARD 1: SYSTEM OVERVIEW */}
                      <div
                          className={getCardClass('complete')}
                          onClick={() => handleCardClick('complete')}
                      >
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                                  <div className={classNames("p-2 transition-colors duration-300", activeStage === 'complete' ? "bg-red-600 text-black" : "bg-mono-800 text-white")}>
                                <Layers className="w-5 h-5" />
                            </div>
                            <h3 className="font-display font-bold text-xl text-white tracking-wide">KATMANLI İMALAT</h3>
                        </div>
                    </div>
                    
                    <p className="text-sm font-mono text-mono-400 leading-relaxed">
                        Duke Doks platformu referans alınarak optimize edilmiştir. Parçaların mekanik stres analizine göre <span className="text-white">3 farklı filament türü</span> ile hibrit üretim.
                    </p>
                </div>

                      {/* CARD 2: ABS */}
                      <div
                          className={classNames(getCardClass('body'), "flex gap-4 items-center")}
                          onClick={() => handleCardClick('body')}
                      >
                          <div className="flex-shrink-0 w-16 h-16 border-2 border-mono-700 flex flex-col items-center justify-center bg-black/50">
                              <span className="text-lg font-bold font-display text-white">ABS</span>
                              <span className="text-[9px] text-mono-400 font-mono">GÖVDE</span>
                          </div>
                          <div>
                              <h4 className={classNames("font-display font-bold text-lg mb-1 transition-colors", activeStage === 'body' ? "text-red-600" : "text-white")}>DARBE & ISI DİRENCİ</h4>
                              <p className="text-xs font-mono text-mono-400">Rijit yapı ile elektronik bileşen koruması. Sürüş titreşimlerine karşı yüksek mukavemet.</p>
                          </div>
                      </div>

                      {/* CARD 3: PLA-CF */}
                      <div
                          className={classNames(getCardClass('rim'), "flex gap-4 items-center")}
                          onClick={() => handleCardClick('rim')}
                      >
                          <div className="flex-shrink-0 w-16 h-16 border-2 border-mono-700 flex flex-col items-center justify-center bg-black/50">
                              <span className="text-lg font-bold font-display text-white">CF</span>
                              <span className="text-[9px] text-mono-400 font-mono">JANT</span>
                          </div>
                          <div>
                              <h4 className={classNames("font-display font-bold text-lg mb-1 transition-colors", activeStage === 'rim' ? "text-red-600" : "text-white")}>KARBON FİBER KATKILI</h4>
                              <p className="text-xs font-mono text-mono-400">PLA-CF ile yüksek sertlik ve hafiflik. Form bozulmadan maksimum yük taşıma kapasitesi.</p>
                          </div>
                      </div>

                      {/* CARD 4: TPU */}
                      <div
                          className={classNames(getCardClass('tire'), "flex gap-4 items-center")}
                          onClick={() => handleCardClick('tire')}
                      >
                          <div className="flex-shrink-0 w-16 h-16 border-2 border-mono-700 flex flex-col items-center justify-center bg-black/50">
                              <span className="text-lg font-bold font-display text-white">TPU</span>
                              <span className="text-[9px] text-mono-400 font-mono">LASTİK</span>
                          </div>
                          <div>
                              <h4 className={classNames("font-display font-bold text-lg mb-1 transition-colors", activeStage === 'tire' ? "text-red-600" : "text-white")}>MAKSİMUM YOL TUTUŞ</h4>
                              <p className="text-xs font-mono text-mono-400">Süspansiyon yükünü azaltan esnek yapı. Zemin bozukluklarını sönümleyen termoplastik.</p>
                          </div>
                      </div>

            </div>
        </div>
          </div>
    </section>
  );
}
