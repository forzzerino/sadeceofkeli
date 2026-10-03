import React from "react";

// --- TİP TANIMLARI ---
type NodeType = "input" | "process-blue" | "process-red" | "output";

interface NodeProps {
  title: string;
  subtitle?: string;
  type: NodeType;
  icon?: string;
}

// --- ALT BİLEŞEN: NODE (KUTUCUK) ---
const Node: React.FC<NodeProps> = ({ title, subtitle, type, icon }) => {
  const getColors = () => {
    switch (type) {
      case "input": return "border-yellow-600 bg-mono-900 text-mono-300";
      case "process-blue": return "border-blue-600/50 bg-blue-950/20 text-blue-100 shadow-[0_0_15px_rgba(37,99,235,0.1)]";
      case "process-red": return "border-red-600/50 bg-red-950/20 text-red-100 shadow-[0_0_15px_rgba(220,38,38,0.1)]";
      case "output": return "border-yellow-500 bg-yellow-950/20 text-yellow-100";
      default: return "border-mono-700 bg-mono-900";
    }
  };

  return (
    <div className={`relative flex flex-col items-center justify-center p-4 border ${getColors()} backdrop-blur-sm transition-all duration-300 z-10 w-full`}
        >
      {/* Dekoratif Köşe Çizgileri */}
      <div className="absolute top-0 right-0 w-2 h-2 border-r-2 border-t-2 border-current opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-l-2 border-b-2 border-current opacity-50"></div>
      
      {icon && <span className="text-2xl mb-2">{icon}</span>}
      <h4 className="font-bold font-mono text-sm uppercase tracking-wider text-center">{title}</h4>
      {subtitle && <span className="text-[10px] font-mono opacity-70 mt-1 uppercase tracking-widest">{subtitle}</span>}
    </div>
  );
};

// --- ALT BİLEŞEN: CONNECTOR (BAĞLANTI ÇİZGİSİ) ---
const ConnectorVertical = ({ height = "h-8" }) => (
  <div className={`w-0.5 ${height} bg-mono-800 relative overflow-hidden mx-auto`}>
    <div className="absolute top-0 left-0 w-full h-full bg-mono-700"></div>
  </div>
);

const SystemArchitecture: React.FC = () => {
  return (
    <div className="w-full bg-mono-900 py-16 px-4 relative overflow-hidden">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
            
            {/* --- LEVEL 1: INPUT --- */}
            <div className="w-48">
              <Node title="Araç Kamerası" subtitle="Input Stream" type="input" icon="📷" />
            </div>
            
            {/* SPLITTER (T-JUNCTION) */}
            <div className="relative w-full max-w-3xl h-12 flex justify-center">
                <div className="absolute top-0 w-0.5 h-6 bg-mono-700"></div> {/* Dikey inen */}
                <div className="absolute top-6 w-1/2 h-6 border-t-2 border-mono-700 flex justify-between"> {/* Yatay T */}
                    <div className="w-0.5 h-full bg-mono-700 relative"></div> {/* Sol inen */}
                    <div className="w-0.5 h-full bg-mono-700 relative"></div> {/* Sağ inen */}
                </div>
            </div>

            {/* --- LEVEL 2: DUAL PROCESSING STACKS --- */}
            <div className="grid grid-cols-2 gap-8 md:gap-32 w-full max-w-4xl">
                
                {/* SOL SÜTUN (ŞERİT TAKİBİ - BLUE) */}
                <div className="flex flex-col items-center ">
            <div className="md:mb-4 w-full">
                        <Node title="Şerit Takibi" subtitle="Network A" type="process-red" />
                    </div>
                    
                    {/* İç İşlemler (Daha küçük, liste gibi) */}
            <div className="flex flex-col w-full max-w-[200px] opacity-80">
                        <ConnectorVertical height="h-4" />
                        <Node title="Özellik Çıkarımı" type="process-red" subtitle="Conv Layers" />
                        <ConnectorVertical height="h-4" />
              <Node title="Düzenlileştirme" type="process-red" subtitle="Normalization" />
                        <ConnectorVertical height="h-4" />
                        <Node title="ReLU Aktivasyon" type="process-red" subtitle="Non-Linearity" />
                        <ConnectorVertical height="h-4" />
              <Node title="Regresyon" type="process-red" subtitle="Continuous Val" />
                    </div>

                    <ConnectorVertical height="h-8" />
                    <Node title="Direksiyon Açısı" subtitle="Target Angle" type="process-red" icon="⛐" />
                </div>

                {/* SAĞ SÜTUN (TRAFİK LAMBASI - RED) */}
                <div className="flex flex-col items-center ">
            <div className="md:mb-4 w-full">
                        <Node title="Trafik Lambası" subtitle="Network B" type="process-blue" />
                    </div>

                     {/* İç İşlemler */}
                     <div className="flex flex-col  w-full max-w-[200px] opacity-80">
                        <ConnectorVertical height="h-4" />
                        <Node title="Özellik Haritası" type="process-blue" subtitle="Feature Map" />
                        <ConnectorVertical height="h-4" />
                        <Node title="Aday Nesne Tespiti" type="process-blue" subtitle="RPN" />
                        <ConnectorVertical height="h-4" />
                        <Node title="Hizalama" type="process-blue" subtitle="RoI Align" />
                        <ConnectorVertical height="h-4" />
                        <Node title="Sınıflandırma" type="process-blue" subtitle="Softmax" />
                    </div>

                    <ConnectorVertical height="h-8" />
                    <Node title="Lamba Durumu" subtitle="Class ID" type="process-blue" icon="🚦" />
                </div>

            </div>

            {/* --- CONVERGENCE (MERGE) --- */}
            <div className="relative w-full max-w-3xl h-12 flex justify-center mt-2">
                <div className="absolute top-0 w-1/2 md:w-2/3 h-6 border-b-2 border-mono-700 flex justify-between"> {/* Yatay U */}
                    <div className="w-0.5 h-full bg-mono-700"></div> {/* Sol inen */}
                    <div className="w-0.5 h-full bg-mono-700"></div> {/* Sağ inen */}
                </div>
                <div className="absolute top-6 w-0.5 h-6 bg-mono-700"></div> {/* Dikey birleşen */}
            </div>

            {/* --- LEVEL 3: FINAL OUTPUT --- */}
            <div className="mt-2">
                <Node title="Kontrol Mantığı" subtitle="Master ECU" type="output" icon="⚙️" />
            </div>

        </div>
    </div>
  );
};

export default SystemArchitecture;