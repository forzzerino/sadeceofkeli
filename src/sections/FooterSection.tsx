import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function FooterSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = document.querySelectorAll('.footer-animate');
      elements.forEach((el, idx) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          y: 30,
          duration: 0.6,
          delay: idx * 0.05,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={sectionRef} className="relative w-full bg-transparent section-padding px-0 pb-8">
      <div className="border-t border-mono-400 pt-8">
        <div className="font-mono text-[10px] md:text-sm uppercase text-mono-300 tracking-tighter flex flex-row justify-around">
          <div className='px-2 flex flex-col md:flex-row items-start '>
            <p>Sadece Öfkeli •&nbsp;</p>
            <p>RC Yarı-Otonom Araç Projesi</p>
          </div>
          <div className='flex flex-col items-end'>
            <a href="https://github.com/forzzerino" target="_blank" rel="noopener noreferrer" >
              site made by this guy: 🙋🏻‍♂️
            </a>
            <p className='text-[10px] tracking-widest'>project made by 8</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
