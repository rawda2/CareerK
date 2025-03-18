import React, { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';

const Data = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Generate fake course data
    const fakeCourses = Array.from({ length: 10 }, () => ({
      id: faker.string.uuid(),
      title: faker.lorem.words(3), // Generate a course title
      description: faker.lorem.paragraph(), // Generate a course description
      instructor: faker.person.fullName(), // Generate an instructor name
      price: faker.commerce.price({ min: 50, max: 300, dec: 0 }), // Generate a price
      duration: `${faker.number.int({ min: 1, max: 12 })} weeks`, // Generate course duration
    }));
    setCourses(fakeCourses);
  }, []);

  return (
    <div>
      <h1>Fake Courses</h1>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <p><strong>Instructor:</strong> {course.instructor}</p>
            <p><strong>Price:</strong> ${course.price}</p>
            <p><strong>Duration:</strong> {course.duration}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Data;