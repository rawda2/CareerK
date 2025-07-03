import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({
  options = [],
  value = '',
  onChange,
  placeholder = 'Filter with',
  disabled = false,
  className = '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (option) => {
    onChange && onChange(option);
    setIsOpen(false);
  };

  const baseClasses = 'relative w-full bg-white border border-gray-200 rounded-3xl px-5 py-3 cursor-pointer transition-colors duration-200 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent';
  
  const disabledClasses = disabled 
    ? 'bg-gray-100 text-gray-500 cursor-not-allowed' :'';

  const dropdownClasses = `${baseClasses} ${disabledClasses} ${className}`;

  return (
    <div className="relative">
      <div
        className={dropdownClasses}
        onClick={handleToggle}
        {...props}
      >
        <div className="flex items-center justify-between">
          <span className="text-gray-600 font-medium capitalize">
            {value || placeholder}
          </span>
          <img
            src="/images/img_bxsuparrow.svg"
            alt="Arrow"
            className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </div>

      {isOpen && !disabled && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
          {options.map((option, index) => (
            <div
              key={index}
              className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-gray-700 border-b border-gray-100 last:border-b-0"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  options: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Dropdown;