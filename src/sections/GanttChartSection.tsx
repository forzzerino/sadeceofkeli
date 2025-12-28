

interface GanttTask {
  name: string;
  start: number;
  duration: number;
  color: string;
}

// Data adjusted to match visual lengths more accurately while filling 8 weeks
const tasks: GanttTask[] = [
  { name: 'Motor & Mekanik', start: 1, duration: 3, color: 'bg-orange-400' },
  { name: 'Elektronik Sistem', start: 2, duration: 7, color: 'bg-blue-500' },
  { name: 'Veri Toplama', start: 3, duration: 2, color: 'bg-yellow-500' },
  { name: 'Model Eğitimi', start: 4, duration: 2, color: 'bg-pink-500' },
  { name: 'Entegrasyon', start: 5, duration: 2, color: 'bg-purple-600' },
  { name: '3D Tasarım', start: 6, duration: 2, color: 'bg-green-600' },
  { name: 'Web Arayüzü', start: 6, duration: 3, color: 'bg-red-600' },
  { name: 'Raporlama', start: 8, duration: 1, color: 'bg-gray-500' },
];

export function GanttChartSection() {
 
  return (
    <section className="flex pt-4 pb-8 flex-col section-padding items-center justify-center">
        <div className="w-full">
            {/* Header */}
            <div className="mb-12 border-l-8 border-red-500 pl-6">
                <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-white">
                    PROJE <span className="text-red-500">GANTT</span> ÇİZELGESİ
                </h2>
                <p className="font-mono text-mono-400 mt-2 uppercase tracking-widest">
                      8 HAFTALIK GELİŞTİRME SÜRECİ
                </p>
            </div>

            {/* Chart Scroll Container */}
            <div className="w-full overflow-x-auto pb-8 custom-scrollbar">
                <div className="min-w-[900px] w-full bg-mono-900 border border-mono-700 relative">
                    
                    {/* Background Grid (Stripes + Gaps) */}
                    <div className="absolute inset-0 grid grid-cols-[250px_repeat(8,1fr)] bg-mono-800 gap-[1px] pointer-events-none z-0">
                        <div className="bg-mono-900"></div> {/* Label Col Background */}
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className={`h-full ${i % 2 === 0 ? 'bg-white/5' : 'bg-mono-900'}`}></div>
                        ))}
                    </div>

                    {/* Timeline Header */}
                    <div className="grid grid-cols-[250px_repeat(8,1fr)] gap-[1px] border-b border-mono-700 relative z-40 bg-mono-800">
                        <div className="sticky left-0 bg-mono-900 p-4 flex items-center">
                            <span className="font-mono text-small text-mono-400 font-bold uppercase">AŞAMA</span>
                        </div>
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className={`p-4 text-center font-mono text-mono-200 font-bold ${i % 2 === 0 ? 'bg-white/5' : 'bg-mono-900'}`}>
                                {i + 1}
                            </div>
                        ))}
                    </div>

                    {/* Tasks */}
                    <div className="relative z-10">
                        {tasks.map((task, idx) => (
                            <div 
                                key={idx} 
                                className="grid grid-cols-[250px_repeat(8,1fr)] gap-[1px] items-stretch group relative"
                            >
                                {/* Sticky Task Label */}
                                <div className="sticky left-0 bg-mono-900 transition-colors p-3 px-6 flex items-center z-30">
                                    <div className="font-mono text-sm text-mono-200 font-medium truncate">
                                        {task.name}
                                    </div>
                                </div>

                                {/* Task Bar Container */}
                                <div className="col-span-8 grid grid-cols-8 relative z-10 py-3 px-0"> 
                                    {/* Grid Overlay for Visual Alignment on Top of Bars */}
                                    <div className="absolute inset-0 grid grid-cols-8 pointer-events-none z-20">
                                        {[...Array(8)].map((_, i) => (
                                            <div key={i} className="h-full"></div>
                                        ))}
                                    </div>

                                    {/* The Actual Bar */}
                                    <div 
                                        className={`relative z-10 h-8 rounded  ${task.color} hover:brightness-110 transition-all origin-left flex items-center mx-[1px]`}
                                        style={{
                                            gridColumnStart: task.start,
                                            gridColumnEnd: `span ${task.duration}`
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-[length:20px_20px] opacity-30"></div>
                                        {task.duration > 0 && (
                                            <span className="text-[10px] font-bold text-white/90 uppercase tracking-wider pl-2 whitespace-nowrap overflow-hidden">
                                                {task.duration} Hafta
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Legend / Key Stats */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                 <div className="p-4 bg-mono-800 border border-mono-800 border-l-4 border-l-orange-400 rounded">
                    <div className="text-xl font-bold font-mono text-white">4</div>
                    <div className="text-xs text-mono-400 uppercase">Hafta Mekanik</div>
                 </div>
                 <div className="p-4 bg-mono-800 border border-mono-800 border-l-4 border-l-blue-500 rounded">
                    <div className="text-xl font-bold font-mono text-white">7</div>
                    <div className="text-xs text-mono-400 uppercase">Hafta Elektronik</div>
                 </div>
                 <div className="p-4 bg-mono-800 border border-mono-800 border-l-4 border-l-red-600 rounded">
                    <div className="text-xl font-bold font-mono text-white">3</div>
                    <div className="text-xs text-mono-400 uppercase">Hafta Arayüz</div>
                 </div>
                 <div className="p-4 bg-mono-800 border border-mono-800 border-l-4 border-l-purple-600 rounded">
                    <div className="text-xl font-bold font-mono text-white">2</div>
                    <div className="text-xs text-mono-400 uppercase">Hafta Entegrasyon</div>
                 </div>
            </div>

        </div>
    </section>
  );
}
