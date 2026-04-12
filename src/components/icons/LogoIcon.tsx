import * as React from 'react';

export const LogoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    fill="none"
    {...props}
  >
    <rect width="45" height="45" rx="8" fill="#2C2A4A"/>
    <circle cx="22.5" cy="22.5" r="16" fill="#0099FF"/>
    
    <rect x="55" width="45" height="45" rx="8" fill="#2C2A4A"/>
    <circle cx="77.5" cy="22.5" r="16" fill="#8A2BE2"/>
    
    <rect y="55" width="45" height="45" rx="8" fill="#2C2A4A"/>
    <circle cx="22.5" cy="77.5" r="16" fill="#D3D3D3"/>
    
    <rect x="55" y="55" width="45" height="45" rx="8" fill="#2C2A4A"/>
    <circle cx="77.5" cy="77.5" r="16" fill="#ADD8E6"/>
  </svg>
);
