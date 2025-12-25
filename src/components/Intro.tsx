import React from 'react';
import SectionWrapper from '../components/SectionWrapper';

const Intro: React.FC = () => {
  return (
    <SectionWrapper 
      align="right" 
      title="GİRİŞ" 
      highlight="01" 
      color="red" 
      id="sec1"
      stats="[SYS: AUTONOMOUS] [HP: 0.26] [SPEED: 2.2 kmh] [TORK: 35 kg/cm]"
    >
      Elektrikli araçlar ve otonom sistemler, modern ulaşımın geleceğidir.<br/><br/>
      Bu proje, elektrikli ve otonom sistemlerin temellerini 1/10 ölçekli bir araç üzerinde uygulamayı amaçlamaktadır.
    </SectionWrapper>
  );
};

export default Intro;
