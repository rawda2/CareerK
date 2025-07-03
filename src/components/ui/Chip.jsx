import React from 'react';
import PropTypes from 'prop-types';

const Chip = ({
  children,
  variant = 'default',
  size = 'medium',
  removable = false,
  onRemove,
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full transition-colors duration-200';
  
  const variants = {
    default: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    primary: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    success: 'bg-green-100 text-green-800 hover:bg-green-200',
    warning: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
    error: 'bg-red-100 text-red-800 hover:bg-red-200',
  };

  const sizes = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-1.5 text-sm',
    large: 'px-4 py-2 text-base',
  };

  const chipClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <span className={chipClasses} {...props}>
      {children}
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-black hover:bg-opacity-10 focus:outline-none"
        >
          <span className="text-xs">×</span>
        </button>
      )}
    </span>
  );
};

Chip.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'error']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  removable: PropTypes.bool,
  onRemove: PropTypes.func,
  className: PropTypes.string,
};

export default Chip;