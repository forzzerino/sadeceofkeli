import { useState } from 'react';
import { Layers } from 'lucide-react';
import classNames from 'classnames';

type LayerType = 'complete' | 'body' | 'rim' | 'tire' | null;

export function CarPartsSection() {
  const [activeLayer, setActiveLayer] = useState<LayerType>(null);


  const handleMouseEnter = (layer: LayerType) => {
    setActiveLayer(layer);
  };

  const handleMouseLeave = () => {
    setActiveLayer(null);
  };

  return (
    <section className="relative w-full min-h-screen bg-mono-900 section-padding overflow-hidden border-t border-mono-800 ">
      
      <div className="relative z-10 mx-auto w-full ">
        
        {/* Header */}
        <div className="section-header-container mb-12 ">
            <h2 className="section-title-large">
                Mekanik Tasarım <span className="text-red-600"> & Üretim</span>
            </h2>
            <p className="section-subtitle-large">
                Hibrit Katmanlı İmalat
            </p>
        </div>
 <div className=" text-mono-500 font-mono flex justify-between">
                        <span>BAĞLANTI: Metrik Vida + Fiberli Somun</span>
                        <span>DURUM: Optimize</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 min-h-[600px] items-center ">

            {/* LEFT COLUMN: VISUAL LAYERS */}
            <div className="lg:col-span-7 relative flex items-center justify-center order-2 lg:order-1 w-full">
                
                {/* Background decorative frame */}
                <div className="absolute inset-0 border border-mono-700  pointer-events-none">
                    <div className="absolute top-0 left-0 p-2 text-mono-500 font-mono">VIEWPORT_01</div>
                    <div className="absolute bottom-0 right-0 p-2  text-mono-500 font-mono">SCALE: 1:10</div>
                </div>

                {/* Layered Image Container */}
                <div className="relative w-full aspect-square max-h-[550px]">
                    
                    {/* 1. BASE LAYER: meterial.jpg (Default Visible) */}
                    {/* Using parts/meterial.png as per file listing */}
                    <img 
                         src="/parts/meterial.png" 
                         className={classNames(
                             "absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ease-in-out z-10",
                             { "opacity-100": activeLayer === null, "opacity-0": activeLayer !== null }
                         )}
                         alt="Base Wireframe"
                    />

                    {/* 2. SYSTEM/COMPLETE LAYER */}
                    <img 
                              src="/parts/complete1.png" 
                         className={classNames(
                             "absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ease-in-out z-20",
                             { "opacity-100": activeLayer === 'complete', "opacity-50": activeLayer !== 'complete' }
                         )}
                         alt="Complete Assembly"
                    />

                    {/* 3. BODY LAYER */}
                    <img 
                              src="/parts/body4.png" 
                         className={classNames(
                             "absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ease-in-out z-20",
                             { "opacity-100": activeLayer === 'body', "opacity-0": activeLayer !== 'body' }
                         )}
                         alt="ABS Body"
                    />

                    {/* 4. RIM LAYER */}
                    <img 
                              src="/parts/rim2.png" 
                         className={classNames(
                             "absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ease-in-out z-20",
                             { "opacity-100": activeLayer === 'rim', "opacity-0": activeLayer !== 'rim' }
                         )}
                         alt="Carbon Fiber Rims"
                    />

                    {/* 5. TIRE LAYER */}
                    <img 
                              src="/parts/tire2.png" 
                         className={classNames(
                             "absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ease-in-out z-20",
                             { "opacity-100": activeLayer === 'tire', "opacity-0": activeLayer !== 'tire' }
                         )}
                         alt="TPU Tires"
                    />
                          {/* Background Grid - mimicking the one in HTML */}
                    <div 
                        className="absolute inset-0 z-0 pointer-events-none opacity-20"
                        style={{ 
                            backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)',
                            backgroundSize: '40px 40px'
                        }}
                    />

                    {/* Overlay gradient */}
                    <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-red-900/30 to-transparent z-30 pointer-events-none"></div>
                </div>
            </div>

            {/* RIGHT COLUMN: DATA MODULES */}
            <div className="lg:col-span-5 flex flex-col justify-between lg:h-[550px] h-[400px] gap-4 order-1 lg:order-2 w-full">
                
                {/* CARD 1: SYSTEM OVERVIEW */}
                <div 
                    className="relative bg-mono-900/50 backdrop-blur-sm border border-mono-700 p-6 group cursor-pointer hover:border-red-600 transition-all duration-300 hover:shadow-[0_0_20px_rgba(220,38,38,0.1)]"
                    onMouseEnter={() => handleMouseEnter('complete')}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* HUD Corners */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-mono-800 text-white group-hover:bg-red-600 group-hover:text-black transition-colors duration-300">
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
                        className="relative bg-mono-900/50 backdrop-blur-sm border border-mono-700 p-5 group cursor-pointer flex gap-4 hover:border-red-600 transition-all duration-300" 
                        onMouseEnter={() => handleMouseEnter('body')}
                        onMouseLeave={handleMouseLeave}
                    >
                         <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                         <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <div className="flex-shrink-0 w-16 h-16 border-2 border-mono-700 group-hover:border-red-600 flex flex-col items-center justify-center bg-black/50 transition-colors duration-300">
                            <span className="text-lg font-bold font-display text-white">ABS</span>
                            <span className="text-[9px] text-mono-400 font-mono">GÖVDE</span>
                        </div>

                        <div>
                            <h4 className="text-white font-display font-bold text-lg mb-1 group-hover:text-red-600 transition-colors duration-300">DARBE & ISI DİRENCİ</h4>
                            <p className="text-xs font-mono text-mono-400">Rijit yapı ile elektronik bileşen koruması. Sürüş titreşimlerine karşı yüksek mukavemet.</p>
                        </div>
                    </div>

                    {/* CARD 3: PLA-CF */}
                    <div 
                        className="relative bg-mono-900/50 backdrop-blur-sm border border-mono-700 p-5 group cursor-pointer flex gap-4 hover:border-red-600 transition-all duration-300"
                        onMouseEnter={() => handleMouseEnter('rim')}
                        onMouseLeave={handleMouseLeave}
                    >
                         <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                         <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        <div className="flex-shrink-0 w-16 h-16 border-2 border-mono-700 group-hover:border-red-600 flex flex-col items-center justify-center bg-black/50 transition-colors duration-300">
                            <span className="text-lg font-bold font-display text-white">CF</span>
                            <span className="text-[9px] text-mono-400 font-mono">JANT</span>
                        </div>

                        <div>
                            <h4 className="text-white font-display font-bold text-lg mb-1 group-hover:text-red-600 transition-colors duration-300">KARBON FİBER KATKILI</h4>
                            <p className="text-xs font-mono text-mono-400">PLA-CF ile yüksek sertlik ve hafiflik. Form bozulmadan maksimum yük taşıma kapasitesi.</p>
                        </div>
                    </div>

                    {/* CARD 4: TPU */}
                    <div 
                        className="relative bg-mono-900/50 backdrop-blur-sm border border-mono-700 p-5 group cursor-pointer flex gap-4 hover:border-red-600 transition-all duration-300"
                        onMouseEnter={() => handleMouseEnter('tire')}
                        onMouseLeave={handleMouseLeave}
                    >
                         <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                         <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        <div className="flex-shrink-0 w-16 h-16 border-2 border-mono-700 group-hover:border-red-600 flex flex-col items-center justify-center bg-black/50 transition-colors duration-300">
                            <span className="text-lg font-bold font-display text-white">TPU</span>
                            <span className="text-[9px] text-mono-400 font-mono">LASTİK</span>
                        </div>

                        <div>
                            <h4 className="text-white font-display font-bold text-lg mb-1 group-hover:text-red-600 transition-colors duration-300">MAKSİMUM YOL TUTUŞ</h4>
                            <p className="text-xs font-mono text-mono-400">Süspansiyon yükünü azaltan esnek yapı. Zemin bozukluklarını sönümleyen termoplastik.</p>
                        </div>
                    </div>
            </div>
        </div>
      </div>
     

    </section>
  );
}
