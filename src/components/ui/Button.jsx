import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  type = 'button',
  className = '',
  ...props 
}) => {
  const baseClasses = 'font-bold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 border';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 border-blue-600 focus:ring-blue-500 disabled:bg-gray-400 disabled:border-gray-400',
    secondary: 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-300',
    outline: 'bg-transparent text-gray-700 border-gray-300 hover:bg-gray-50 focus:ring-gray-500 disabled:text-gray-400 disabled:border-gray-200',
    ghost: 'bg-transparent text-blue-600 border-transparent hover:bg-blue-50 focus:ring-blue-500 disabled:text-gray-400',
  };

  const sizes = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
};

export default Button;