import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Github, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
   {
    id: 1,
    name: "Berkay LEVENT",
    department: "Elektrik Mühendisliği",
    bio: "Projenin ilk haftasında Takım Kaptanı ve Elektromekanik Sorumlusu olarak, aracın otonomisi için gerekli motor ve güç gereksinimlerini belirledim. 1/10 ölçekli araçta tork-hız dengesini sağlamak adına 37mm redüktörlü motor seçimini yaptım. Mekanik ve elektronik entegrasyonu sırasında teori ile pratiğin farkını deneyimlerken; disiplinlerarası ekibi organize etmek bana mühendisliğin yanı sıra liderlik ve kriz yönetimi yetkinliği kazandırdı.",
    image: "/team/berkay.jpg",
    linkedin: "https://www.linkedin.com/in/berkay-levent-aba024254/",
    // github: "#",
  },
   {
    id: 2,
    name: "Bora AVŞAR",
    department: "Elektrik Mühendisliği",
    bio: "Projenin 2. haftasında liderliği üstlenerek donanım seçimi ve güç mimarisi süreçlerini yönettim. LiPo batarya ve sürücülerin akım analizlerini yaparak, hassas işlemcileri gerilim dalgalanmalarından koruyacak güvenlik prosedürlerini oluşturdum. Donanım güvenliğindeki titizliğimin süreçleri yavaşlattığını fark edip risk yönetiminde esneklik kazanırken; teorik güç elektroniği bilgilerimi yazılım ekibiyle koordine şekilde sahaya yansıttım.",
    image: "/team/bora.jpg",
    // linkedin: "#",
    // github: "#",
  },
  {
    id: 3,
    name: "Fatih HANAYLI",
    department: "Elektrik Mühendisliği",
    bio: "Projenin 3. haftasında liderliği devralarak elektriksel bağlantı mimarisini ve kablolama standartlarını oluşturdum. Sinyal parazitlerini önlemek adına, ortak toprak hattı (common ground) ve hat izolasyonu gibi kritik detayları içeren şemalarla ekibe rehberlik ettim. Kağıt üzerindeki düzenin dar şasi montajındaki zorluklarını tecrübe ederken; iyi bir tasarımın sadece işlevsel değil, aynı zamanda anlaşılır ve bakımı yapılabilir olması gerektiğini öğrendim.",
    image: "/team/fatih.jpg",
    // linkedin: "#",
    // github: "#",
  },
  {
    id: 4,
    name: "Akın KAÇAR",
    department: "Elektrik Mühendisliği",
    bio: "Projenin 4. haftasında Proje Yöneticisi ve Denetim Sorumlusu olarak; L298N sürücü, batarya ve motorların teknik uyumluluğunu denetleyerek sistemin kalite kontrolünü sağladım. Montaj öncesi yaptığım risk analizleriyle olası donanım arızalarını engellerken; denetimin bir yavaşlama değil, kritik bir gereklilik olduğunu gördüm. Bu süreçle, mühendislikte güvenin değil, doğrulamanın (verification) esas olduğunu tecrübe ettim.",
    image: "/team/akin.jpg",
    // linkedin: "#",
    // github: "#",
  },
  {
    id: 5,
    name: "Mevlüt Han AŞCI",
    department: "Yazılım Mühendisliği",
    bio: "Projenin 5. haftasında liderliği üstlenerek otonom sürüş algoritmalarını ve şerit takibi için gerekli CNN mimarisini kurguladım. Teorik modelleri Raspberry Pi’nin işlemci ve bellek kısıtlarına göre optimize ederken, algoritmik kararların donanım gecikmeleriyle (latency) olan kritik ilişkisini yönettim. Süreç sırasında yaşadığım donanım kaybı (ana kart arızası), bana gömülü sistemlerde donanım güvenliği ve dikkatli çalışma konusunda pahalı ama kalıcı bir tecrübe kazandırdı.",
    image: "/team/mevlut.jpg",
    linkedin: "https://www.linkedin.com/in/mevlut-han-asci/",
    github: "https://github.com/mevlutasci",
  },
  {
    id: 6,
    name: "Ertuğrul YÜKSEL",
    department: "Yazılım Mühendisliği",
    bio: "Projenin 6. haftasında liderliği üstlenerek, yazılım kökenime rağmen mekanik montaj ve şasi entegrasyonu süreçlerini bizzat yürüttüm. 3D parçaların birleştirilmesi ve sensör konumlandırmasıyla ilgilenirken; kusursuz bir yazılımın bile milimetrik mekanik hatalarla işlevsiz kalabileceğini deneyimledim. Bu süreç bana disiplinler arası bir bakış açısı kazandırarak, mühendislikte 'sadece kendi alanım' yaklaşımının geçerli olmadığını gösterdi.",
    image: "/team/ertu.jpg",
    linkedin: "https://www.linkedin.com/in/ertugrul-yuksel/",
    github: "https://github.com/ertuyuksell",
  },
   {
    id: 7,
    name: "Can ÖZTÜRK",
    department: "Yazılım Mühendisliği",
    bio: "Projenin 7. haftasında liderliği üstlenerek web arayüzü geliştirme ve 3D tasarım revizyonlarını yönettim. Düşük gecikmeli kontrol paneli ve sunum materyallerini hazırlarken; teknik mükemmelliğin ancak doğru bir sunumla değer kazandığını deneyimledim. Bu süreç, backend yetkinliklerimi geliştirmenin yanı sıra pazarlama ve sunumun mühendisliğin ayrılmaz bir parçası olduğunu anlamamı sağladı.",
    image: "/team/can.jpg",
    linkedin: "https://www.linkedin.com/in/cnztrk/",
    github: "https://github.com/forzzerino",
  },
  {
    id: 8,
    name: "Büşra YARAR",
    department: "Yazılım Mühendisliği",
    bio: "Projenin final haftasında liderliği üstlenerek, tüm teknik verileri ve ekip çalışmalarını kapsayan nihai raporu hazırladım. Yazılım ve Elektrik ekiplerinin farklı çıktılarını ortak bir teknik dilde birleştirirken; iyi dokümantasyonun projenin sürdürülebilirliği için şart olduğunu deneyimledim. Bu süreç, teknik detaylara hakimken aynı zamanda büyük resmi görebilme yeteneğimi geliştirdi.",
    image: "/team/busra.jpg",
    linkedin: "https://www.linkedin.com/in/busra-yarar",
    github: "https://github.com/busrayarar",
  },
];

export function TeamSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = document.querySelectorAll('.team-animate');
      elements.forEach((el, idx) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          y: 30,
          duration: 0.6,
          delay: idx * 0.05,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-transparent section-padding">
      <div className="relative z-10">
        <div className="mx-auto text-center">
            {/* Title */}
          <div className="team-animate space-y-4 text-left mb-16">
             <div className="section-header-container mx-auto inline-block text-left w-full">
                <h2 className="section-title-large">Mühendislik <span className="text-red-600">Ekibi</span></h2>
                <p className="section-subtitle-large">
                  8 Kişilik Mühendislik Ekibi İşbirliği
                </p>
             </div>
          </div>

          {/* Desktop Team Grid (Horizontal Layout) */}
          <div className="hidden md:grid md:grid-cols-2 gap-5 mb-16 team-animate">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="group flex flex-row border border-[#333] hover:border-[#FF0000] transition-all duration-300 bg-[#0a0a0a] overflow-hidden h-64"
              >
                {/* Left: Portrait Photo (4:5 Ratio) */}
                <div className="w-[25%] overflow-hidden bg-[#111] relative">
                  <div className="w-full h-full">
                     <img
                       src={member.image || "/placeholder.svg"}
                       alt={member.name}
                       className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300 absolute inset-0"
                     />
                  </div>
                </div>

                {/* Right: Card Content */}
                <div className="flex-1 p-5 pb-0 flex flex-col justify-start gap-4 text-left">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-white uppercase tracking-wide leading-tight">{member.name}</h3>
                      <p className="text-red-600 font-mono text-sm uppercase tracking-wider mt-1">{member.department}</p>
                    </div>

                    {/* Social Icons */}
                    <div className="flex gap-3 ml-4 shrink-0">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          className="text-[#888888] hover:text-[#FF0000] transition-colors"
                          aria-label={`${member.name} LinkedIn`}
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                      {member.github && (
                        <a
                          href={member.github}
                          target="_blank"
                          className="text-[#888888] hover:text-[#FF0000] transition-colors"
                          aria-label={`${member.name} GitHub`}
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-[#cccccc] font-mono tracking-tighter leading-relaxed line-clamp-[8]">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Accordion View */}
          <div className="md:hidden space-y-2 mb-20 team-animate">
            {teamMembers.map((member) => (
              <div key={member.id} className="border border-[#333] bg-mono-800 overflow-hidden">
                {/* Collapsed State */}
                <button
                  onClick={() => toggleExpand(member.id)}
                  className="w-full flex items-center gap-4 p-4  transition-colors"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-[#111] flex-shrink-0">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-white font-bold uppercase text-sm">{member.name}</h3>
                    <p className="text-[#888888] font-mono text-xs">{member.department}</p>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#FF0000] transition-transform duration-300 flex-shrink-0 ${
                      expandedId === member.id ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Expanded State */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    expandedId === member.id ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-4 pb-4 space-y-4">
                    {/* Bio Text in Terminal Style */}
                    <div className="bg-[#0d0d0d] border border-[#222] p-4 text-left">
                      <p className="text-sm text-[#cccccc] leading-relaxed font-mono">{member.bio}</p>
                    </div>

                    {/* Social Buttons */}
                    <div className="flex gap-3">
                      {member.linkedin && (
                      <a
                        href={member.linkedin}
                        className="flex-1 flex items-center justify-center gap-2 bg-[#0d0d0d] border border-[#333] hover:border-[#FF0000] py-3 transition-colors"
                      >
                        <Linkedin className="w-5 h-5 text-[#888888]" />
                        <span className="text-sm font-mono text-white">LinkedIn</span>
                      </a>)}
                      {member.github && (
                      <a
                        href={member.github}
                        className="flex-1 flex items-center justify-center gap-2 bg-[#0d0d0d] border border-[#333] hover:border-[#FF0000] py-3 transition-colors"
                      >
                        <Github className="w-5 h-5 text-[#888888]" />
                        <span className="text-sm font-mono text-white">GitHub</span>
                      </a>)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* University & date (Moved from Footer) */}
          <div className="team-animate ">
            <div className="flex flex-col md:flex-row justify-center gap-6">
              
              {/* University Box */}
              <div className="border border-[#333] bg-[#0a0a0a] px-8 py-6 min-w-[300px] flex flex-col items-center justify-center hover:border-[#444] transition-colors">
                <p className="font-mono text-xs text-white uppercase tracking-widest mb-2">
                  KURUM
                </p>
                <p className="text-lg font-bold text-white leading-tight">
                  Bandırma Onyedi Eylül Üniversitesi
                </p>
              </div>

              {/* Date Box */}
              <div className="border border-[#333] bg-[#0a0a0a] px-8 py-6 min-w-[300px] flex flex-col items-center justify-center hover:border-[#444] transition-colors">
                <p className="font-mono text-xs text-white uppercase tracking-widest mb-2">
                  PROJE TARİHİ
                </p>
                <p className="text-lg font-bold text-white leading-tight">
                  Aralık 2025
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
