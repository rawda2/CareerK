import React from 'react';
import PropTypes from 'prop-types';

const RatingBar = ({
  rating = 0,
  maxRating = 5,
  size = 'medium',
  readonly = true,
  onChange,
  className = '',
  showValue = false,
  ...props
}) => {
  const sizes = {
    small: 'w-3 h-3',
    medium: 'w-4 h-4',
    large: 'w-5 h-5',
  };

  const handleStarClick = (value) => {
    if (!readonly && onChange) {
      onChange(value);
    }
  };

  const renderStar = (index) => {
    const isFilled = index < rating;
    const starClasses = `${sizes[size]} ${readonly ? '' : 'cursor-pointer hover:scale-110'} transition-transform duration-150`;
    
    return (
      <button
        key={index}
        type="button"
        onClick={() => handleStarClick(index + 1)}
        disabled={readonly}
        className={`${starClasses} ${readonly ? 'cursor-default' : ''}`}
      >
        <svg
          viewBox="0 0 24 24"
          fill={isFilled ? '#FF8A29' : '#D9D9D9'}
          className="w-full h-full"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </button>
    );
  };

  return (
    <div className={`flex items-center space-x-1 ${className}`} {...props}>
      <div className="flex items-center space-x-0.5">
        {Array.from({ length: maxRating }, (_, index) => renderStar(index))}
      </div>
      {showValue && (
        <span className="text-sm text-gray-600 ml-2">
          ({rating.toFixed(1)})
        </span>
      )}
    </div>
  );
};

RatingBar.propTypes = {
  rating: PropTypes.number,
  maxRating: PropTypes.number,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  readonly: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
  showValue: PropTypes.bool,
};

export default RatingBar;