import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { StarBorder } from './StarBorder';

interface StarBorderButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const StarBorderButton: React.FC<StarBorderButtonProps> = ({ 
  children, 
  onClick,
  className = ""
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={`flex justify-center ${className}`}>
      <StarBorder
        color="#C0C0C0" // Keep silver color consistently
        speed="4s"
        className={`group cursor-pointer transition-transform duration-300 ${
          isHovered ? 'translate-y-[-2px]' : ''
        }`}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="flex items-center justify-center gap-2 font-semibold tracking-wide whitespace-nowrap bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 bg-clip-text text-transparent">
          {children}
          <ArrowRight className={`transition-all duration-300 w-4 h-4 flex-shrink-0 text-gray-400 ${
            isHovered ? 'translate-x-1' : ''
          }`} />
        </span>
      </StarBorder>
    </div>
  );
};

export default StarBorderButton;