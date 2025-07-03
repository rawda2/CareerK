import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

function InteractionOverlay({
  isVisible = false,
  onPlayClick,
  onClose,
  title = "",
  description = "",
  className = ""
}) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const handlePlayClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onPlayClick) {
      onPlayClick();
    }
  };

  const handleOverlayClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClose) {
      onClose();
    }
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  if (!isAnimating && !isVisible) {
    return null;
  }

  return (
    <div 
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        bg-background/80 backdrop-blur-md
        transition-all duration-200 ease-out
        ${isVisible ? 'opacity-100' : 'opacity-0'}
        ${className}
      `}
      onClick={handleOverlayClick}
    >
      {/* Overlay Content */}
      <div 
        className={`
          relative bg-surface border border-border-light rounded-xl
          p-8 max-w-md w-full mx-4 shadow-card-lg
          transition-all duration-200 ease-out
          ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
        `}
        onClick={handleContentClick}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="
            absolute top-4 right-4 p-2 rounded-lg
            text-text-secondary hover:text-text-primary
            hover:bg-surface-light transition-all duration-200 ease-out
            focus:outline-none focus:ring-2 focus:ring-primary/50
          "
          aria-label="Close overlay"
        >
          <Icon name="X" size={20} />
        </button>

        {/* Content */}
        <div className="pr-8">
          {title && (
            <h3 className="text-fluid-xl font-semibold text-text-primary mb-3">
              {title}
            </h3>
          )}
          
          {description && (
            <p className="text-fluid-sm text-text-secondary mb-6 leading-relaxed">
              {description}
            </p>
          )}

          {/* Play Button */}
          <div className="flex items-center justify-center mb-6">
            <button
              onClick={handlePlayClick}
              className="
                flex items-center justify-center w-20 h-20
                bg-primary hover:bg-primary-600 rounded-full
                transition-all duration-200 ease-out
                hover:scale-110 shadow-elevated
                focus:outline-none focus:ring-2 focus:ring-primary/50
              "
              aria-label="Play content"
            >
              <Icon 
                name="Play" 
                size={32} 
                color="white" 
                className="ml-1"
              />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handlePlayClick}
              className="
                flex-1 flex items-center justify-center space-x-2
                px-4 py-3 bg-primary hover:bg-primary-600
                text-white font-medium rounded-lg
                transition-all duration-200 ease-out
                hover:shadow-card focus:outline-none focus:ring-2 focus:ring-primary/50
              "
            >
              <Icon name="Play" size={18} />
              <span>Start Preview</span>
            </button>

            <button
              onClick={onClose}
              className="
                px-4 py-3 border border-border-light hover:border-primary/50
                text-text-secondary hover:text-primary font-medium rounded-lg
                transition-all duration-200 ease-out
                hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/50
              "
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-primary/20 rounded-full blur-sm" />
        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-secondary/20 rounded-full blur-sm" />
      </div>
    </div>
  );
}

export default InteractionOverlay;