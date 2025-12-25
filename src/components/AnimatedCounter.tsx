import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  trigger?: React.RefObject<HTMLDivElement>;
  className?: string; // Added className
}

export function AnimatedCounter({
  value,
  duration = 2,
  suffix = '',
  prefix = '',
  decimals = 2,
  trigger,
  className = '',
}: AnimatedCounterProps) {
  const counterRef = useRef<HTMLDivElement>(null);
  const countRef = useRef({ value: 0 });

  useEffect(() => {
    const element = trigger || counterRef;
    if (!element?.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && countRef.current.value === 0) {
          gsap.to(countRef.current, {
            value: value,
            duration: duration,
            ease: 'power2.out',
            onUpdate: () => {
              if (element.current) {
                const displayValue =
                  decimals > 0
                    ? countRef.current.value.toFixed(decimals)
                    : Math.round(countRef.current.value);
                element.current.textContent = `${prefix}${displayValue}${suffix}`;
              }
            },
          });
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element.current);

    return () => observer.disconnect();
  }, [value, duration, suffix, prefix, decimals, trigger]);

  return (
    <div ref={counterRef} className={`metric-value ${className}`}>
      {prefix}0{suffix}
    </div>
  );
}
