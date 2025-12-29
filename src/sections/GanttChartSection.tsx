import { ArrowRight } from "lucide-react";
import { Timeline } from '../components/Timeline';

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
      <section className=" flex pt-4 pb-8 flex-col section-padding items-center justify-center">
        <div className="w-full">
            {/* Header */}
        <div className="section-header-container mb-8">
                  <h2 className="section-title-large">
            GELİŞTİRME <span className="text-red-600">SÜRECİ</span>
                </h2>
                  <p className="section-subtitle-large">
                      8 HAFTALIK GANTT ÇİZELGESİ
                </p>
            </div>


        {/* Timeline Component - Static Overview */}
        <Timeline />

            {/* Chart Scroll Container */}
              <div className="w-full overflow-x-auto  custom-scrollbar border-2 border-mono-700">
                  <div className="min-w-[600px] md:min-w-[900px] w-full bg-mono-900 border-mono-700 relative">
                    
                    {/* Background Grid (Stripes + Gaps) */}
                      <div className="absolute inset-0 grid grid-cols-[120px_repeat(8,1fr)] md:grid-cols-[250px_repeat(8,1fr)] bg-mono-800 gap-[1px] pointer-events-none z-0">
                        <div className="bg-mono-900"></div> {/* Label Col Background */}
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className={`h-full ${i % 2 === 0 ? 'bg-white/5' : 'bg-mono-900'}`}></div>
                        ))}
                    </div>

                    {/* Timeline Header */}
                      <div className="grid grid-cols-[120px_repeat(8,1fr)] md:grid-cols-[250px_repeat(8,1fr)] gap-[1px] border-b border-mono-700 relative z-40 bg-mono-800">
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
                            className="grid grid-cols-[120px_repeat(8,1fr)] md:grid-cols-[250px_repeat(8,1fr)] md:first:mt-1 gap-[1px] items-stretch group relative"
                            >
                                {/* Sticky Task Label */}
                            <div className="sticky -left-[1px] md:left-0  bg-mono-900 transition-colors md:p-3 px-1 md:px-6 flex items-center z-30">
                                    <div className="font-mono text-[10px] md:text-sm tracking-tighter text-mono-200 font-medium truncate">
                                        {task.name}
                                    </div>
                                </div>

                                {/* Task Bar Container */}
                            <div className="col-span-8 grid grid-cols-8 relative z-10 py-1 first:py-0 px-0"> 
                                    {/* Grid Overlay for Visual Alignment on Top of Bars */}
                                    <div className="absolute inset-0 grid grid-cols-8 pointer-events-none z-20">
                                        {[...Array(8)].map((_, i) => (
                                            <div key={i} className="h-full"></div>
                                        ))}
                                    </div>

                                    {/* The Actual Bar */}
                                    <div 
                                        className={`relative z-10 h-8 rounded  ${task.color} hover:brightness-110 transition-all origin-left flex items-center mx-[2px]`}
                                        style={{
                                            gridColumnStart: task.start,
                                            gridColumnEnd: `span ${task.duration}`
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-[length:20px_20px] opacity-50"></div>
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
        </div>
    </section>
  );
}
