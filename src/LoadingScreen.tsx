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
      <div className="relative w-full max-w-2xl px-8 mb-8">
        <img 
            src="/logo.png" 
            alt="SADECE OFKELI" 
            className="w-full object-contain drop-shadow-[0_0_15px_rgba(0,168,255,0.5)]"
        />
        {/* Simple Progress Overlay on Logo (Optional or just keep bar below) */}
      </div>
      
      {/* Progress Bar Container */}
      <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
        <div 
          className="h-full bg-nitro-blue shadow-[0_0_15px_#00a8ff]" 
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-4 text-xs font-bold text-nitro-blue animate-pulse">
        {progress < 100 ? `SYSTEM INITIALIZING... ${Math.round(progress)}%` : "SYSTEM READY"}
      </div>

      {progress === 100 && (
          <button 
            className="mt-8 px-8 py-2 bg-transparent border-2 border-nitro-blue text-white font-bold tracking-widest hover:bg-nitro-blue hover:text-black transition-all cursor-pointer pointer-events-auto duration-500"
            onClick={onStarted}
          >
            START ENGINE
          </button>
      )}
    </div>
  );
};
