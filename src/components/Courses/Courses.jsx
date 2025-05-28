import React from "react";
import "./Courses.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import image1 from './../../assets/1.png'
import image2 from './../../assets/2.png'
import image3 from './../../assets/3.png'
import image4 from './../../assets/5.png'
import image5 from './../../assets/6.png'
import image6 from './../../assets/7.png'



export default function Courses() {
  // Define real course data
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Introduction to React",
      description: "Learn the basics of React and build your first app.",
      instructor: "John Doe",
      price: 99,
      duration: "4 weeks",
      image: image1, // Replace with real image URL
      category: "Web ",
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      description: "Master advanced JavaScript concepts and techniques.",
      instructor: "Jane Smith",
      price: 149,
      duration: "6 weeks",
      image: image2, // Replace with real image URL
      category: "Web ",
    },
    {
      id: 3,
      title: "Node.js for Beginners",
      description:
        "Get started with Node.js and build scalable backend applications.",
      instructor: "Alice Johnson",
      price: 129,
      duration: "5 weeks",
      image: image3, // Replace with real image URL
      category: "Backend ",
    },
    {
      id: 4,
      title: "Python for Data Science",
      description: "Learn Python and its applications in data science.",
      instructor: "Bob Brown",
      price: 199,
      duration: "8 weeks",
      image: image4, // Replace with real image URL
      category: "Data Science",
    },
    {
      id: 5,
      title: "Advanced JavaScript",
      description: "Master advanced JavaScript concepts and techniques.",
      instructor: "Jane Smith",
      price: 149,
      duration: "6 weeks",
      image: image5, // Replace with real image URL
      category: "Web ",
    },
    {
      id: 6,
      title: "Introduction to React",
      description: "Learn the basics of React and build your first app.",
      instructor: "John Doe",
      price: 99,
      duration: "4 weeks",
      image: image6, // Replace with real image URL
      category: "Web ",
    },
    // Add more courses as needed
  ]);

  const handleClick=()=>{
    window.scrollTo({
      top: 300,
      behavior: "smooth",
    });
  }

  return (
    <>
      <section className="header px-5 py-2 my-0">
        <div className="d-flex py-3 px-lg-5 justify-content-center gap-3 align-items-center">
          <div className="search py-1 px-2 rounded-2 mt-1 d-flex align-items-center">
            <i className="fa-solid fa-magnifying-glass fa-xl i"></i>
            <input
              type="search"
              className="fa-search border-0 py-2 px-3"
              placeholder="Job title, Keyword..."
            />
          </div>
          <button className="find">
            <Link className="link">Search</Link>
          </button>
        </div>
        <div className="filters px-lg-5 d-flex justify-content-center">
          <div className="filter ms-2">
            <select
              name="filters"
              id="filters"
              className="list px-2 d-flex align-items-center justify-content-center py-2 rounded"
            >
              <option value="Filter With" selected>
                Filter With
              </option>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
              <option value="Option 3">Option 3</option>
            </select>
          </div>
          <div className="filter ms-2">
            <select
              name="filters"
              id="filters"
              className="list px-2 d-flex align-items-center justify-content-center py-2 rounded"
            >
              <option value="Filter With" selected>
                Filter With
              </option>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
              <option value="Option 3">Option 3</option>
            </select>
          </div>
        </div>
      </section>
      <section className="body py-3 px-3 d-flex  flex-wrap align-items-center justify-content-center gap-3 w-100">
        {courses.map((course) => (
            <Link
  key={course.id}
  to={`/course/${course.id}`}
  onClick={()=>handleClick}
        state={{course}}
        className="course-card text-decoration-none my-2 border  d-flex flex-column  w-40 position-relative"
        >
          <div className="title position-relative d-flex">
          <img
              src={course.image}
              alt={course.title}
              className="course-image  "
              style={{ width: "30%", height: "100%", objectFit: "cover" }}
            />
            <span className="span d-flex justify-content-center text-start gap-0  align-items-center me-2 py-1 px-2  rounded-5 position-absolute top-0 end-0">
              {course.category}
            </span>

            <div className="caption p-2 d-flex flex-column justify-content-center align-items-start">
              <h5 className=" text-black">{course.title}</h5>
              <p className=" textGray ">{course.duration}</p>
             
            </div>
          </div>
          
<div className="details d-flex flex-column justify-content-center mt-4 ps-3 ">
<div className="detail d-flex gap-2">
  <i className="fa-solid fa-play span mb-3 "></i>
  <p>{course.description}</p>
</div>
<div className="detail d-flex gap-2">
  <i className="fa-solid fa-play span mb-3 "></i>
  <p>{course.description}</p>
</div>


</div>
          
          </Link>
          
        ))}
      </section>
    </>
  );
}
