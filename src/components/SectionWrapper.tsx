import React, { ReactNode } from 'react';

interface SectionWrapperProps {
  align?: 'left' | 'right';
  title: string;
  highlight: string;
  color: 'blue' | 'red';
  children: ReactNode;
  id?: string;
  stats?: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ align, title, highlight, color, children, id, stats }) => {
  const isRight = align === 'right';
  const borderColor = color === 'blue' ? 'border-blue-500' : 'border-red-600';
  const textColor = color === 'blue' ? 'text-blue-500' : 'text-red-600';

  return (
    <section id={id} className={`border  section-panel h-screen w-full flex flex-col justify-center p-10 md:p-24 ${isRight ? 'items-end text-right' : 'items-start text-left'}`}>
      <div className="max-w-4xl relative">
        
        {/* Modern Header matching TechStackSection style 
            We handle left/right alignment for the border manually here since the global class is fixed to left.
        */}
        <div className={`mb-12 ${isRight ? 'border-r-8 pr-6' : 'border-l-8 pl-6'} ${borderColor}`}>
           <h2 className="section-title-large">
            {highlight} <span className={textColor}>{title}</span>
           </h2>
           {stats && (
             <div className={`mt-6 flex flex-wrap gap-3 ${isRight ? 'justify-end' : 'justify-start'}`}>
               {stats.split(']').filter(Boolean).map((stat, idx) => {
                 const cleanStat = stat.replace('[', '').trim();
                 return (
                   <span 
                    key={idx} 
                    className={`inline-block px-3 py-1 border text-xs font-mono font-bold tracking-wider uppercase
                      ${color === 'blue' 
                        ? 'border-blue-500 text-blue-400 bg-blue-500/10' 
                        : 'border-red-600 text-red-500 bg-red-600/10'
                      }`}
                   >
                     {cleanStat}
                   </span>
                 );
               })}
             </div>
           )}
        </div>

        {/* Clean Body Text */}
        <div className={`text-xl md:text-2xl text-mono-300 font-sans leading-relaxed max-w-2xl ${isRight ? 'ml-auto' : ''}`}>
          {children}
        </div>

      </div>
    </section>
  );
};

export default SectionWrapper;
