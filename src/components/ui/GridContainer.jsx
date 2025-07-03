import React from 'react';

function GridContainer({ 
  children, 
  className = "",
  maxWidth = "7xl",
  spacing = "6"
}) {
  const maxWidthClasses = {
    'sm': 'max-w-sm',
    'md': 'max-w-md',
    'lg': 'max-w-lg',
    'xl': 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    'full': 'max-w-full'
  };

  const spacingClasses = {
    '4': 'gap-4',
    '6': 'gap-6',
    '8': 'gap-8',
    '10': 'gap-10',
    '12': 'gap-12'
  };

  return (
    <div className={`
      w-full mx-auto px-4 sm:px-6 lg:px-8
      ${maxWidthClasses[maxWidth] || maxWidthClasses['7xl']}
      ${className}
    `}>
      <div className={`
        grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
        ${spacingClasses[spacing] || spacingClasses['6']}
        auto-rows-fr
      `}>
        {children}
      </div>
    </div>
  );
}

export default GridContainer;