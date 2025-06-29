import React from 'react';

interface MarqueeProps {
  children: React.ReactNode;
  vertical?: boolean;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({
  children,
  vertical = false,
  reverse = false,
  pauseOnHover = false,
  className = '',
}) => {
  return (
    <div
      className={`group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] ${
        vertical ? 'flex-col' : 'flex-row'
      } ${className}`}
      style={{
        maskImage: vertical
          ? 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 95%)'
          : 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 95%)',
      }}
    >
      <div
        className={`flex shrink-0 justify-around [gap:var(--gap)] ${
          vertical ? 'animate-marquee-vertical flex-col' : 'animate-marquee flex-row'
        } ${reverse ? '[animation-direction:reverse]' : ''} ${
          pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''
        }`}
      >
        {children}
      </div>
      <div
        className={`flex shrink-0 justify-around [gap:var(--gap)] ${
          vertical ? 'animate-marquee-vertical flex-col' : 'animate-marquee flex-row'
        } ${reverse ? '[animation-direction:reverse]' : ''} ${
          pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''
        }`}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
};