

interface TimelinePhase {
  title: string;
  duration: string;
  items: string[];
}

const phases: TimelinePhase[] = [
  {
    title: 'MOTOR & MEKANİK',
    duration: 'Hafta 1-3',
    items: [
      'Görev Dağılımı & Planlama',
      'Motor & Sürücü Belirlenmesi',
      'Mekanik Gereksinim Analizi',
    ],
  },
  {
    title: 'ELEKTRONİK ALTYAPI',
    duration: 'Hafta 2-4',
    items: [
      'Donanım & Kart Seçimi',
      'Güvenli Çalışma Protokolleri',
      'Devre Şemaları & Bağlantı',
    ],
  },
  {
    title: 'ALGORİTMA & DOĞRULAMA',
    duration: 'Hafta 3-6',
    items: [
      'Ekipman Uygunluk Denetimi',
      "Otonom Rota Planlama Alg'ları",
      'Hareket Mantığı Hazırlığı',
    ],
  },
  {
    title: 'SİSTEM ENTEGRASYON',
    duration: 'Hafta 5-6',
    items: [
      'Şase & Donanım Montajı',
      'Yazılım Yığını Denetimi',
      'Tam Sistem Entegrasyon Testi',
    ],
  },
  {
    title: 'TASARIM & ARAYÜZ',
    duration: 'Hafta 6-8',
    items: [
      '3D Tasarım Revizyonları',
      'Web Arayüz Geliştirme',
      'Sunum & Afiş Tasarımı',
    ],
  },
  {
    title: 'FİNAL RAPORLAMASI',
    duration: 'Hafta 8',
    items: [
      'Genel Rapor Düzenlemesi',
      'Dokümantasyon Finalizasyonu',
      'Proje Teslimi',
    ],
  },
];

function TimelineNode({ title, duration, items, index }: TimelinePhase & { index: number }) {
  return (
    <div className="w-full group h-full">
      <div className="h-full info-box shadow-xl hover:border-red-600 transition-colors duration-300 p-3 md:p-6">
        
        {/* Header: Phase & Duration */}
        <div className="mb-4">
          <span className="tech-badge">{duration}</span>
        </div>

        {/* Title */}
        <h4 className="box-title text-sm md:text-base mb-4 group-hover:text-accent-cyan transition-colors duration-300">
          {title}
        </h4>

        {/* List */}
        <ul className="space-y-2">
          {items.map((item, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 font-mono text-[10px] md:text-xs text-mono-300"
            >
              <div className="mt-0.5 rounded-full p-0.5 bg-red-500 text-white shrink-0">
                 <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                 </svg>
              </div>
              <span className="leading-tight">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Timeline() {
  return (
    <div className="w-full mb-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {phases.map((phase, idx) => (
          <TimelineNode
            key={idx}
            {...phase}
            index={idx}
          />
        ))}
      </div>
    </div>
  );
}
