
const Hero = () => {
  return (
    <section className="section-panel h-screen w-full flex flex-col justify-start lg:justify-center pt-36 lg:pt-0 items-center lg:items-start text-center lg:text-left px-6 lg:px-0 lg:pl-24">
      {/* 
         Since logo.png is specific branding, we keep it but style the sub-elements 
         to match the new "Industrial" aesthetic.
      */}
      <img 
        src="/logo.png" 
        alt="SADECE OFKELI" 
        className="w-full max-w-[600px] lg:max-w-4xl object-contain drop-shadow-2xl opacity-90"
      />
      
      <div className="mt-8 border-t-4 lg:border-t-0 lg:border-l-4 border-red-600 pt-4 lg:pt-0 lg:pl-6">
        <p className="font-mono font-bold text-sm lg:text-2xl text-mono-200 uppercase">
           ÇOK DA HIZLI OLMAYAN ASFALT CANAVARI
        </p>
      </div>

       {/* Scroll Indicator */}
      
     
    </section>
  );
};

export default Hero;
