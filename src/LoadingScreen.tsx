import { useProgress } from "@react-three/drei";

interface LoadingScreenProps {
  started: boolean;
  onStarted: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ started, onStarted }) => {
  const { progress } = useProgress();
  return (
    <div className={`fixed top-0 left-0 w-full h-full z-50 transition-opacity duration-1000 pointer-events-none
      flex flex-col items-center justify-center bg-black
      ${started ? "opacity-0" : "opacity-100"}`}
    >
      {/* Replaced Text with Logo for stability */}
      <div className="relative w-full max-w-2xl px-8 mb-12">
        <img 
            src="/logo.png" 
            alt="SADECE OFKELI" 
            className="w-full object-contain grayscale opacity-80"
        />
        {/* Simple Progress Overlay on Logo (Optional or just keep bar below) */}
      </div>
      
      {/* Progress Bar Container */}
      <div className="w-64 h-1 bg-mono-800 overflow-hidden relative">
        <div 
          className="h-full bg-red-600 transition-all duration-300 ease-out" 
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-4 text-xs font-mono font-bold text-mono-400 tracking-widest uppercase flex items-center gap-2">
         <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
         {progress < 100 ? `SYSTEM INITIALIZING... ${Math.round(progress)}%` : "SYSTEM READY"}
      </div>

      {progress === 100 && (
          <button 
            className="mt-12 px-10 py-3 bg-transparent border border-red-600 text-red-500 font-mono text-sm tracking-[0.25em] 
            hover:bg-red-600 hover:text-black hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] 
            transition-all duration-500 cursor-pointer pointer-events-auto uppercase"
            onClick={onStarted}
          >
            [ Start Engine ]
          </button>
      )}
    </div>
  );
};
