import SectionWrapper from '../components/SectionWrapper';

const Electronics = () => {
  return (
    <SectionWrapper 
      align="right" 
      title="ELEKTRİKSEL SİSTEMLER" 
      highlight="03" 
      color="red" 
      id="sec3"
      stats="[CPU: RPI4] [CPU2: AR-NANO] [PWR: 11.1V 2200mAhLIPO] [ENG-DRIVER: L298N] [CAM: OV5647] [ENGINE: JGB37-350 DC] [SERVO: DSS-M15S]"
    >
      Direksiyon kontrolü için yüksek torklu servo motor kullanılmıştır.<br/><br/>
      Arduino NANO mikrodenetleyici temel sensör okumalarını yaparken, Raspberry Pi 4 görüntü işleme ve karar mekanizmalarını yönetir.<br/><br/> 
      11.1V LiPo batarya ile güvenli ve uzun süreli çalışma sağlar.
    </SectionWrapper>
  );
};

export default Electronics;
