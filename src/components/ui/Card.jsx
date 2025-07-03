import React from 'react';
import PropTypes from 'prop-types';

const Card = ({
  children,
  className = '',
  padding = 'medium',
  shadow = 'medium',
  rounded = 'large',
  background = 'white',
  ...props
}) => {
  const baseClasses = 'transition-shadow duration-200';
  
  const paddingClasses = {
    none: '',
    small: 'p-3',
    medium: 'p-4',
    large: 'p-6',
  };

  const shadowClasses = {
    none: '',
    small: 'shadow-sm',
    medium: 'shadow-md',
    large: 'shadow-lg',
  };

  const roundedClasses = {
    none: '',
    small: 'rounded-md',
    medium: 'rounded-lg',
    large: 'rounded-xl',
    extra: 'rounded-2xl',
  };

  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    transparent: 'bg-transparent',
  };

  const cardClasses = `${baseClasses} ${paddingClasses[padding]} ${shadowClasses[shadow]} ${roundedClasses[rounded]} ${backgroundClasses[background]} ${className}`;

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  padding: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
  shadow: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
  rounded: PropTypes.oneOf(['none', 'small', 'medium', 'large', 'extra']),
  background: PropTypes.oneOf(['white', 'gray', 'transparent']),
};

export default Card;