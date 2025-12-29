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
    <section id={id} className={`section-panel h-screen w-full flex flex-col justify-start lg:justify-center pt-16 lg:pt-0 p-6 md:pt-24 ${isRight ? 'items-end text-right' : 'items-start text-left'}`}>
      <div className="max-w-4xl relative">
        
        {/* Modern Header matching TechStackSection style 
            We handle left/right alignment for the border manually here since the global class is fixed to left.
        */}
        <div className={`mb-8 lg:mb-12 ${isRight ? 'border-r-4 lg:border-r-8 pr-4 lg:pr-6' : 'border-l-4 lg:border-l-8 pl-4 lg:pl-6'} ${borderColor}`}>
           <h2 className="section-title-large">
            {highlight} <span className={textColor}>{title}</span>
           </h2>
           {stats && (
            <div className={`md:mt-6 mt-2 flex flex-wrap gap-3 ${isRight ? 'justify-end' : 'justify-start'}`}>
               {stats.split(']').filter(Boolean).map((stat, idx) => {
                 const cleanStat = stat.replace('[', '').trim();
                 return (
                   <span 
                    key={idx} 
                     className={`inline-block px-3 py-1 border text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase
                      ${color === 'blue' 
                       ? 'border-blue-500 text-blue-400 bg-mono-900/60 md:bg-mono-900/20'
                       : 'border-red-600 text-red-500 bg-mono-900/60 md:bg-mono-900/20'
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
        <div className={`text-sm md:text-xl text-mono-100 p-2  font-sans leading-relaxed max-w-2xl ${isRight ? 'ml-auto' : ''}`} >
          {children}
        </div>

      </div>
    </section>
  );
};

export default SectionWrapper;
