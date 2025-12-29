import { useState } from 'react';
import { useLenis } from '@studio-freight/react-lenis';
import { ArrowUp } from 'lucide-react';
import classNames from 'classnames';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const lenis = useLenis(({ scroll }) => {
    // Show button after scrolling down 600px
    if (scroll > 1000) {
      if (!isVisible) setIsVisible(true);
    } else {
      if (isVisible) setIsVisible(false);
    }
  });

  const scrollToTop = () => {
    lenis?.scrollTo(0, { duration: 2 });
  };

  return (
    <button
      onClick={scrollToTop}
      className={classNames(
        "fixed bottom-8 right-8 z-50 p-3 bg-mono-900 border border-red-600/50 hover:border-red-600 text-red-500 hover:text-red-400 transition-all duration-300 group overflow-hidden",
        {
          "opacity-100 translate-y-0": isVisible,
          "opacity-0 translate-y-10 pointer-events-none": !isVisible
        }
      )}
      aria-label="Scroll to top"
    >
      <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      <ArrowUp className="w-4 h-4 relative z-10" />
    </button>
  );
}
