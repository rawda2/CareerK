import React, { useState } from 'react';
import Image from '../AppImage';
import Icon from '../AppIcon';

function CourseCard({ 
  course = {
    id: 1,
    title: "BackEnd Code Behind",
    description: "Master server-side development with comprehensive backend programming techniques and best practices.",
    image: "/assets/images/course-placeholder.jpg",
    duration: "12 weeks",
    level: "Intermediate",
    instructor: "John Doe",
    rating: 4.8,
    students: 1250
  },
  onPlayClick,
  onTrailerClick,
  className = ""
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handlePlayClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onPlayClick) {
      onPlayClick(course);
    }
  };

  const handleTrailerClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onTrailerClick) {
      onTrailerClick(course);
    }
  };

  const handleCardClick = () => {
    // Handle card click for navigation or detailed view
    console.log('Course card clicked:', course.title);
  };

  return (
    <div 
      className={`
        relative bg-surface rounded-lg overflow-hidden cursor-pointer
        transition-all duration-200 ease-out
        hover:shadow-card-lg hover:scale-[1.02]
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Course Image Container */}
      <div className="relative aspect-video bg-surface-light overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          className={`
            w-full h-full object-cover transition-all duration-200 ease-out
            ${imageLoaded ? 'opacity-100' : 'opacity-0'}
            ${isHovered ? 'scale-105' : 'scale-100'}
          `}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Loading Skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-surface-light animate-pulse" />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

        {/* Play Button Overlay */}
        <div 
          className={`
            absolute inset-0 flex items-center justify-center
            transition-all duration-200 ease-out
            ${isHovered ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <button
            onClick={handlePlayClick}
            className="
              flex items-center justify-center w-16 h-16 
              bg-primary/90 hover:bg-primary rounded-full
              transition-all duration-200 ease-out
              hover:scale-110 shadow-elevated
              backdrop-blur-sm
            "
            aria-label={`Play ${course.title} preview`}
          >
            <Icon 
              name="Play" 
              size={24} 
              color="white" 
              className="ml-1"
            />
          </button>
        </div>

        {/* Course Level Badge */}
        <div className="absolute top-3 left-3">
          <span className="
            px-2 py-1 text-xs font-medium rounded-full
            bg-secondary/90 text-white backdrop-blur-sm
          ">
            {course.level}
          </span>
        </div>

        {/* Duration Badge */}
        <div className="absolute top-3 right-3">
          <span className="
            px-2 py-1 text-xs font-medium rounded-full
            bg-background/80 text-text-secondary backdrop-blur-sm
          ">
            {course.duration}
          </span>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6">
        {/* Course Title */}
        <h3 className="
          text-fluid-lg font-semibold text-text-primary mb-2
          line-clamp-2 leading-tight
        ">
          {course.title}
        </h3>

        {/* Course Description */}
        <p className="
          text-fluid-sm text-text-secondary mb-4
          line-clamp-3 leading-relaxed
        ">
          {course.description}
        </p>

        {/* Course Meta Information */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            {/* Rating */}
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={16} color="#D97706" className="fill-current" />
              <span className="text-sm font-medium text-text-primary">
                {course.rating}
              </span>
            </div>

            {/* Students Count */}
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={16} color="#94A3B8" />
              <span className="text-sm text-text-secondary">
                {course.students.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Instructor */}
          <div className="text-sm text-text-secondary">
            {course.instructor}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <button
            onClick={handleTrailerClick}
            className="
              flex-1 flex items-center justify-center space-x-2
              px-4 py-2 bg-primary hover:bg-primary-600
              text-white text-sm font-medium rounded-lg
              transition-all duration-200 ease-out
              hover:shadow-card focus:outline-none focus:ring-2 focus:ring-primary/50
            "
          >
            <Icon name="Play" size={16} />
            <span>Watch Trailer</span>
          </button>

          <button
            className="
              px-4 py-2 border border-border-light hover:border-primary/50
              text-text-secondary hover:text-primary text-sm font-medium rounded-lg
              transition-all duration-200 ease-out
              hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/50
            "
          >
            <Icon name="Bookmark" size={16} />
          </button>
        </div>
      </div>

      {/* Hover Gradient Effect */}
      <div 
        className={`
          absolute inset-0 pointer-events-none
          bg-gradient-to-br from-primary/5 via-transparent to-secondary/5
          transition-opacity duration-200 ease-out
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}
      />
    </div>
  );
}

export default CourseCard;