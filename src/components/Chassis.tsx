import SectionWrapper from '../components/SectionWrapper';

const Chassis = () => {
  return (
    <SectionWrapper 
      align="left" 
      title="GÖVDE" 
      highlight="02" 
      color="blue" 
      id="sec2"
      stats="[MAT: PLA-CF / ABS / TPU] [MODULAR: YES] [SCALE: 1/10]"
    >
      PLA-CF, ABS ve TPU filamentler ile üretilen modüler şasi.<br/><br/> 
      1/10 ölçekli tasarım, gerçek araç oranlarını korurken kompakt bir boyut sunar.<br/><br/> 
      Ön ve arka kısım bağımsız süspansiyon etkisi yaratır. Servo motor kontrollü direksiyon, gerçek sürüş dinamikleri sağlar.
    </SectionWrapper>
  );
};

export default Chassis;
