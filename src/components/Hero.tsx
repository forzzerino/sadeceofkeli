
const Hero = () => {
  return (
    <section className="section-panel h-screen w-full flex flex-col justify-center pl-12 md:pl-24">
      {/* 
         Since logo.png is specific branding, we keep it but style the sub-elements 
         to match the new "Industrial" aesthetic.
      */}
      <img 
        src="/logo.png" 
        alt="SADECE OFKELI" 
        className="w-full max-w-4xl object-contain drop-shadow-2xl opacity-90"
      />
      
      <div className="mt-8 border-l-4 border-red-600 pl-6">
        <p className="font-mono font-bold text-xl md:text-3xl text-mono-0 uppercase">
           YAVAŞ ASFALT CANAVARI
        </p>
      </div>

       {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-80">
          <div className="h-16 w-0.5 bg-gradient-to-b from-transparent via-red-600 to-transparent animate-pulse"></div>
          <span className="font-mono text-xs text-mono-400 tracking-[0.3em] mt-4 uppercase">DEVAM ET</span>
      </div>
     
    </section>
  );
};

export default Hero;
