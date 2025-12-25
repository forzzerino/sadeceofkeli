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
  return (
    <section id={id} className={`section-panel h-screen w-full flex flex-col justify-center p-10 md:p-24 ${align === 'right' ? 'items-end text-right' : 'items-start text-left'}`}>
      <div className="max-w-4xl relative">
        
        {/* Modern Clean Header */}
        <h2 className="text-5xl md:text-7xl mb-6 text-white leading-tighter tracking-tighter uppercase font-bold">
          <span className={`block ${color === 'blue' ? 'text-nitro-blue' : 'text-race-red'} drop-shadow-2xl text-[0.5em]`}>
            {highlight}
          </span>
          {title}
        </h2>
        {/* Tech Stats */}
        {stats && (
           <span className={` bg-black/60 text-sm opacity-80 font-mono tracking-wider ${color === 'blue' ? 'text-nitro-blue' : 'text-race-red'}`}>
            {stats}
          </span>
        )}
        {/* Clean Body Text */}
        <div className={`font-semibold text-xl md:text-3xl text-gray-200 leading-tighter max-w-2xl ${align === 'right' ? 'ml-auto' : ''}`}>
          {children}
        </div>

       
      </div>
    </section>
  );
};

export default SectionWrapper;
