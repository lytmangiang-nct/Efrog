import React from 'react';
import { motion } from 'motion/react';
import { Level } from '../data/lessons';

interface FrogMascotProps {
  className?: string;
  mood?: 'happy' | 'thinking' | 'cheering';
  level?: Level;
}

export const FrogMascot: React.FC<FrogMascotProps> = ({ className, mood = 'happy', level }) => {
  return (
    <motion.div 
      className={className}
      animate={{ y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-lg overflow-visible">
        {/* Body */}
        <circle cx="100" cy="120" r="60" fill="#4ade80" />
        
        {/* Eyes */}
        <circle cx="70" cy="70" r="25" fill="#4ade80" />
        <circle cx="130" cy="70" r="25" fill="#4ade80" />
        <circle cx="70" cy="70" r="12" fill="white" />
        <circle cx="130" cy="70" r="12" fill="white" />
        <circle cx="70" cy="70" r="6" fill="black" />
        <circle cx="130" cy="70" r="6" fill="black" />

        {/* Level Decorations */}
        {level === 'Tập sự' && (
          <g>
            {/* Swimming Goggles */}
            <rect x="50" y="60" width="100" height="20" rx="10" fill="rgba(0,0,0,0.2)" />
            <circle cx="70" cy="70" r="18" fill="none" stroke="#3b82f6" strokeWidth="4" />
            <circle cx="130" cy="70" r="18" fill="none" stroke="#3b82f6" strokeWidth="4" />
            <line x1="88" y1="70" x2="112" y2="70" stroke="#3b82f6" strokeWidth="4" />
          </g>
        )}

        {level === 'Thành thạo' && (
          <g>
            {/* Bowtie */}
            <path d="M 85 130 L 115 150 L 115 130 L 85 150 Z" fill="#ef4444" />
            <circle cx="100" cy="140" r="5" fill="#b91c1c" />
          </g>
        )}

        {level === 'Tiến sĩ' && (
          <g>
            {/* Graduation Cap */}
            <path d="M 40 50 L 100 20 L 160 50 L 100 80 Z" fill="#1f2937" />
            <rect x="75" y="50" width="50" height="20" fill="#1f2937" />
            <line x1="160" y1="50" x2="170" y2="90" stroke="#fbbf24" strokeWidth="3" />
            <circle cx="170" cy="95" r="5" fill="#fbbf24" />
          </g>
        )}
        
        {/* Mouth */}
        {mood === 'happy' && (
          <path d="M 70 130 Q 100 160 130 130" stroke="black" strokeWidth="4" fill="none" strokeLinecap="round" />
        )}
        {mood === 'thinking' && (
          <path d="M 80 140 L 120 140" stroke="black" strokeWidth="4" fill="none" strokeLinecap="round" />
        )}
        {mood === 'cheering' && (
          <ellipse cx="100" cy="145" rx="15" ry="10" fill="#991b1b" />
        )}
        
        {/* Blush */}
        <circle cx="60" cy="120" r="8" fill="#fecaca" opacity="0.6" />
        <circle cx="140" cy="120" r="8" fill="#fecaca" opacity="0.6" />
      </svg>
    </motion.div>
  );
};
