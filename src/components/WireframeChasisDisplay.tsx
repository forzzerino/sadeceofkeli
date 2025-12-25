export function WireframeChassisDisplay() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 800 600"
        className="w-full max-w-4xl h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <style>
            {`
              .chassis-line { stroke: #f3f3f3; stroke-width: 2; fill: none; }
              .chassis-fill { stroke: #f3f3f3; stroke-width: 2; fill: #2a2a2a; }
              .component { stroke: #d4d4d4; stroke-width: 1.5; fill: #1a1a1a; }
              .label-text { fill: #b8b8b8; font-family: "Roboto Mono", monospace; font-size: 12px; }
              .highlight { stroke: #878787; stroke-width: 1; fill: none; }
            `}
          </style>
        </defs>

        {/* Chassis frame */}
        <rect x="100" y="200" width="600" height="200" className="chassis-fill" />
        <line x1="100" y1="200" x2="700" y2="200" className="chassis-line" />
        <line x1="100" y1="400" x2="700" y2="400" className="chassis-line" />

        {/* Front axle */}
        <line x1="150" y1="200" x2="150" y2="420" className="chassis-line" strokeDasharray="4" />
        <circle cx="150" cy="220" r="25" className="component" />
        <circle cx="150" cy="380" r="25" className="component" />
        <line x1="125" y1="220" x2="175" y2="220" className="chassis-line" />
        <line x1="125" y1="380" x2="175" y2="380" className="chassis-line" />

        {/* Rear axle */}
        <line x1="650" y1="200" x2="650" y2="420" className="chassis-line" strokeDasharray="4" />
        <circle cx="650" cy="220" r="25" className="component" />
        <circle cx="650" cy="380" r="25" className="component" />
        <line x1="625" y1="220" x2="675" y2="220" className="chassis-line" />
        <line x1="625" y1="380" x2="675" y2="380" className="chassis-line" />

        {/* Motor mounts */}
        <rect x="620" y="260" width="50" height="80" className="component" />
        <circle cx="645" cy="300" r="15" className="chassis-line" />
        <text x="660" y="305" className="label-text">
          Motor
        </text>

        {/* Battery pack */}
        <rect x="300" y="150" width="200" height="50" className="component" />
        <line x1="310" y1="160" x2="490" y2="160" className="highlight" />
        <line x1="310" y1="175" x2="490" y2="175" className="highlight" />
        <line x1="310" y1="190" x2="490" y2="190" className="highlight" />
        <text x="310" y="210" className="label-text">
          11.1V LiPo Battery
        </text>

        {/* Raspberry Pi */}
        <rect x="280" y="430" width="100" height="80" className="component" />
        <rect x="290" y="440" width="80" height="60" className="highlight" />
        <circle cx="320" cy="450" r="3" fill="#878787" />
        <circle cx="330" cy="450" r="3" fill="#878787" />
        <circle cx="340" cy="450" r="3" fill="#878787" />
        <text x="290" y="520" className="label-text">
          Raspberry Pi 4
        </text>

        {/* Arduino Nano */}
        <rect x="420" y="430" width="100" height="80" className="component" />
        <rect x="430" y="440" width="80" height="60" className="highlight" />
        <circle cx="460" cy="450" r="2" fill="#878787" />
        <circle cx="470" cy="450" r="2" fill="#878787" />
        <circle cx="480" cy="450" r="2" fill="#878787" />
        <text x="430" y="520" className="label-text">
          Arduino Nano
        </text>

        {/* Camera mount */}
        <rect x="380" y="140" width="40" height="30" className="component" />
        <circle cx="400" cy="150" r="12" className="chassis-line" strokeWidth="2" fill="#4a4a4a" />
        <text x="330" y="145" className="label-text">
          Camera
        </text>

        {/* Wiring connections */}
        <path
          d="M 400 165 Q 350 200 300 200"
          className="chassis-line"
          strokeDasharray="3,3"
        />
        <path
          d="M 400 165 Q 450 200 500 200"
          className="chassis-line"
          strokeDasharray="3,3"
        />
        <path d="M 350 475 L 340 350" className="chassis-line" strokeDasharray="3,3" />
        <path d="M 470 475 L 500 350" className="chassis-line" strokeDasharray="3,3" />

        {/* Dimension guides */}
        <line x1="50" y1="200" x2="50" y2="400" className="highlight" />
        <line x1="45" y1="200" x2="55" y2="200" className="highlight" />
        <line x1="45" y1="400" x2="55" y2="400" className="highlight" />
        <text x="20" y="305" className="label-text" textAnchor="middle">
          1/10
        </text>
      </svg>
    </div>
  );
}
