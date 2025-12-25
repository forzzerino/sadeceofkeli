
const Hero = () => {
  return (
    <section className="section-panel h-screen w-full flex flex-col justify-center pl-24">
      <img 
        src="/logo.png" 
        alt="SADECE OFKELI" 
        className="w-full max-w-4xl object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.05)]"
      />
      <p className="translate-x-[7%] font-bold text-2xl mt-8 tracking-[0.5em] text-nitro-blue uppercase">
          // YAVAŞ ASFALT CANAVARI //
      </p>
       {/* Scroll Indicator */}
      <div className=" translate-y-[60%] translate-x-[-25%] flex flex-col items-center">
          <div className="h-16 w-1 bg-gradient-to-b from-transparent via-nitro-blue to-transparent animate-bounce"></div>
          <span className="font-racing text-sm text-white/80 tracking-widest">SCROLL TO START</span>
      </div>
     
    </section>
  );
};

export default Hero;
