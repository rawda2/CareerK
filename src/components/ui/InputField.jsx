import React from 'react';
import PropTypes from 'prop-types';

const InputField = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  disabled = false,
  error = '',
  label = '',
  icon = null,
  className = '',
  ...props
}) => {
  const baseClasses = 'w-full px-4 py-3 border rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent';
  
  const stateClasses = error 
    ? 'border-red-300 bg-red-50 text-red-900 placeholder-red-400 focus:ring-red-500' :'border-gray-200 bg-white text-gray-900 placeholder-gray-500';
    
  const disabledClasses = disabled 
    ? 'bg-gray-100 text-gray-500 cursor-not-allowed' :'hover:border-gray-300';

  const inputClasses = `${baseClasses} ${stateClasses} ${disabledClasses} ${icon ? 'pl-12' : ''} ${className}`;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            {typeof icon === 'string' ? (
              <img src={icon} alt="" className="w-6 h-6 text-gray-400" />
            ) : (
              icon
            )}
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={inputClasses}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

InputField.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  className: PropTypes.string,
};

export default InputField;