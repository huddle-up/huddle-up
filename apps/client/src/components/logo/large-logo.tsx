import React from 'react';

interface LargeLogoProps {
  className?: string;
}

function LargeLogo({ className }: LargeLogoProps) {
  return <img className={className} src="/logo.svg" alt="HuddleUp Logo" />;
}
LargeLogo.defaultProps = {
  className: undefined,
};

export default LargeLogo;
