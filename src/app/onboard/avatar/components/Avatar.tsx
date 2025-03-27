'use client';

interface AvatarProps {
  skinColor: string;
  hairStyle: string;
  shirtStyle: string;
  shirtColor: string;
  hasGlasses?: boolean;
  hasFlowerCrown?: boolean;
  hairColor?: string;
}

export default function Avatar({ 
  skinColor, 
  hairStyle, 
  shirtStyle, 
  shirtColor,
  hasGlasses = false,
  hasFlowerCrown = false,
  hairColor = '#4A4A4A'
}: AvatarProps) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hairGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: hairColor, stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: hairColor, stopOpacity: 0.8 }} />
        </linearGradient>
        <linearGradient id="skinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: skinColor, stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: skinColor, stopOpacity: 0.95 }} />
        </linearGradient>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
          <feOffset dx="0" dy="2" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Neck with proper shading */}
      <path
        d="M170 300 C170 300, 200 310, 230 300 L225 350 C225 350, 200 360, 175 350 Z"
        fill="url(#skinGradient)"
        filter="url(#softShadow)"
      />

      {/* Modern face shape */}
      <path
        d="M200 100 C280 100, 320 160, 320 240 C320 320, 280 380, 200 380 C120 380, 80 320, 80 240 C80 160, 120 100, 200 100"
        fill="url(#skinGradient)"
        filter="url(#softShadow)"
      />

      {/* Hair with modern styling */}
      {hairStyle === 'Short' && (
        <g filter="url(#softShadow)">
          <path
            d="M200 90 C290 90, 330 160, 330 240 C330 260, 325 280, 315 300 
               C305 320, 290 330, 270 335 C250 340, 150 340, 130 335 
               C110 330, 95 320, 85 300 C75 280, 70 260, 70 240 
               C70 160, 110 90, 200 90"
            fill="url(#hairGradient)"
          />
          {/* Modern texture lines */}
          {[...Array(6)].map((_, i) => (
            <path
              key={i}
              d={`M${120 + i * 35} ${160 + (i % 2) * 20} Q${140 + i * 35} ${140 + (i % 2) * 20} ${160 + i * 35} ${160 + (i % 2) * 20}`}
              stroke={hairColor}
              strokeOpacity="0.3"
              strokeWidth="3"
              fill="none"
            />
          ))}
        </g>
      )}

      {hairStyle === 'Medium' && (
        <g filter="url(#softShadow)">
          <path
            d="M200 80 C290 80, 340 160, 340 240 C340 300, 330 340, 300 370 
               C270 400, 230 410, 200 410 C170 410, 130 400, 100 370 
               C70 340, 60 300, 60 240 C60 160, 110 80, 200 80"
            fill="url(#hairGradient)"
          />
          {/* Layered waves */}
          {[...Array(5)].map((_, i) => (
            <path
              key={i}
              d={`M${90 + i * 50} ${200 + i * 30} Q${120 + i * 50} ${180 + i * 30} ${150 + i * 50} ${200 + i * 30} T${210 + i * 50} ${200 + i * 30}`}
              stroke={hairColor}
              strokeOpacity="0.4"
              strokeWidth="4"
              fill="none"
            />
          ))}
        </g>
      )}

      {/* Modern eyes with more detail */}
      <g transform="translate(160, 220)">
        <ellipse cx="0" cy="0" rx="25" ry="15" fill="white" filter="url(#softShadow)" />
        <ellipse cx="0" cy="0" rx="12" ry="12" fill="#1A1A1A" />
        <circle cx="4" cy="-4" r="4" fill="white" />
        <path d="M-20 -12 L-25 -18 M0 -15 L0 -22 M20 -12 L25 -18" 
              stroke="#1A1A1A" strokeWidth="2.5" />
      </g>
      <g transform="translate(240, 220)">
        <ellipse cx="0" cy="0" rx="25" ry="15" fill="white" filter="url(#softShadow)" />
        <ellipse cx="0" cy="0" rx="12" ry="12" fill="#1A1A1A" />
        <circle cx="4" cy="-4" r="4" fill="white" />
        <path d="M-20 -12 L-25 -18 M0 -15 L0 -22 M20 -12 L25 -18" 
              stroke="#1A1A1A" strokeWidth="2.5" />
      </g>

      {/* Modern eyebrows */}
      <path
        d="M140 185 C155 175, 170 175, 185 185"
        stroke="#1A1A1A"
        strokeWidth="6"
        strokeLinecap="round"
        filter="url(#softShadow)"
      />
      <path
        d="M215 185 C230 175, 245 175, 260 185"
        stroke="#1A1A1A"
        strokeWidth="6"
        strokeLinecap="round"
        filter="url(#softShadow)"
      />

      {/* Better nose */}
      <path
        d="M195 225 C198 235, 200 245, 200 255 C200 260, 195 265, 200 265 C205 265, 200 260, 200 255"
        stroke="#1A1A1A"
        strokeWidth="2.5"
        fill="none"
        filter="url(#softShadow)"
      />

      {/* Modern smile */}
      <path
        d="M160 280 C180 295, 220 295, 240 280"
        stroke="#1A1A1A"
        strokeWidth="4"
        fill="none"
        filter="url(#softShadow)"
      />

      {/* Modern clothing */}
      {shirtStyle === 'Crew' && (
        <g filter="url(#softShadow)">
          <path
            d="M120 350 C160 360, 240 360, 280 350 L300 500 L100 500 Z"
            fill={shirtColor}
          />
          <path
            d="M140 350 C200 370, 260 350, 260 350"
            stroke={shirtColor}
            strokeWidth="20"
            fill="none"
          />
          {/* Fabric details */}
          <path
            d="M140 380 C200 400, 260 380, 260 380 M140 420 C200 440, 260 420, 260 420"
            stroke="#000000"
            strokeOpacity="0.1"
            strokeWidth="2"
            fill="none"
          />
        </g>
      )}

      {/* Glasses if enabled */}
      {hasGlasses && (
        <g filter="url(#softShadow)">
          <path
            d="M140 220 C120 220, 120 240, 140 240 C160 240, 160 220, 140 220"
            stroke="#1A1A1A"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M260 220 C240 220, 240 240, 260 240 C280 240, 280 220, 260 220"
            stroke="#1A1A1A"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M160 230 L240 230"
            stroke="#1A1A1A"
            strokeWidth="3"
            fill="none"
          />
        </g>
      )}

      {/* Flower crown if enabled */}
      {hasFlowerCrown && (
        <g filter="url(#softShadow)">
          {[...Array(5)].map((_, i) => (
            <g key={i} transform={`translate(${150 + i * 25}, 100)`}>
              <circle cx="0" cy="0" r="8" fill="#FF69B4" />
              <circle cx="0" cy="0" r="4" fill="#FFB6C1" />
              <path
                d="M-8 0 C-4 -4, 4 -4, 8 0 C4 4, -4 4, -8 0"
                fill="#FF1493"
                opacity="0.6"
              />
            </g>
          ))}
          <path
            d="M140 100 C200 120, 260 100, 260 100"
            stroke="#228B22"
            strokeWidth="3"
            fill="none"
          />
        </g>
      )}
    </svg>
  );
} 