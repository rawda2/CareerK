import React from "react";
import "./CourseDetails.css";
import { useParams } from "react-router-dom";
import image1 from "./../../assets/1.png";
import image2 from "./../../assets/2.png";
import image3 from "./../../assets/3.png";
import image4 from "./../../assets/5.png";
import image5 from "./../../assets/6.png";
import image6 from "./../../assets/7.png";
import { Link } from "react-router-dom";

const CourseDetails = () => {
  const { id } = useParams(); // Get the ID from the route
  const courses = [
    {
      id: 1, // Change to string for comparison
      title: "Introduction to React",
      description: "Learn the basics of React and build your first app.",
      instructor: "John Doe",
      price: 99,
      duration: "4 weeks",
      image: image1,
      category: "Web ",
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      description: "Master advanced JavaScript concepts and techniques.",
      instructor: "Jane Smith",
      price: 149,
      duration: "6 weeks",
      image: image2,
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
      category: "Web",
    },
   
  ];

  // Convert `id` to string since `useParams()` returns a string
  const course = courses.find((course) => course.id == id);

  if (!course) {
    return <div>Course not found!</div>;
  }

  return (
    <>
    <div className="all d-flex justify-content-center py-3">
    <section className="main w-90 d-flex justify-content-center p-5">
        <div className="course-details px-4  w-60">
          <img
            src={course.image}
            alt={course.title}
            className=" rounded-4"
            style={{ width: "70%", height: "350px", objectFit: "cover" }}
          />
          <div className="title d-flex justify-content-between w-70 mt-3 px-2">
            <p>
              <strong>By</strong> {course.instructor}
            </p>
            <p>
              {" "}
              <strong>
                <i className=" fa-regular fa-calendar "></i> published in
              </strong>{" "}
              12 sep 2025
            </p>
          </div>
          <div className="details mt-3">
            <h4 className="hBold">Course title</h4>
            <p className=" mb-5">{course.description}</p>
            <h4 className="hBold">OverView</h4>
            <p className=" mb-5 w-70">
              {course.description}
              {course.description}
              {course.description}
            </p>
            <h4 className="hBold">What you'll learn in this course?</h4>
            <div className="detail d-flex gap-2">
              <i className="fa-solid fa-play span mb-3 "></i>
              <p>{course.description}</p>
            </div>
            <div className="detail d-flex gap-2">
              <i className="fa-solid fa-play span mb-3 "></i>
              <p>{course.description}</p>
            </div>
            <div className="detail d-flex gap-2">
              <i className="fa-solid fa-play span mb-3 "></i>
              <p>{course.description}</p>
            </div>
            <div className="detail d-flex gap-2">
              <i className="fa-solid fa-play span mb-3 "></i>
              <p>{course.description}</p>
            </div>
            <button className="Btn px-5 mt-4">Join Course</button>
          </div>
        </div>
        <div className="left w-40 ">
          <div className="first">
            <h3 className=" hBold">what video includes</h3>
            <div className="infos pe-5 mt-3 d-flex flex-column gap-3">
              <div className="info d-flex justify-content-between">
                <p>
                  <i className=" fa-solid fa-chart-simple me-2"></i>Level
                </p>
                <span className=" me-5">Level</span>
              </div>
              <div className="info d-flex justify-content-between">
                <p>
                  <i className=" fa-regular fa-clock me-2"></i>Duration
                </p>
                <span className=" me-5">Duration</span>
              </div>
              <div className="info d-flex justify-content-between">
                <p>
                  <i className=" fa-solid fa-certificate me-2"></i>
                  Certifications
                </p>
                <span className=" me-5">Certifications</span>
              </div>
              <div className="info d-flex justify-content-between">
                <p>
                  <i className=" fa-solid fa-graduation-cap me-2"></i>Graduation
                </p>
                <span className=" me-5">Graduation</span>
              </div>
              <div className="info d-flex justify-content-between">
                <p>
                  <i className=" fa-solid fa-chart-simple me-2"></i>Category{" "}
                </p>
                <span className=" me-5">Category </span>
              </div>
              <div className="info">
                <p className="hBold">{course.price} $</p>
                <button className="Btn w-60 "><Link className="link"  to={`/checkout/${course.id}`}>Enroll Now</Link></button>
              </div>
            </div>
          </div>
          <div className="second mt-5">
            <h3 className="hBold">Recommended Courses</h3>
            <div className="courses  d-flex flex-column gap-5 ">{courses.map((course) => (
                <div className="course d-flex gap-2 rounded-4">
                    <img src={course.image} alt={course.title} 
                   style={{ width: "35%", height: "150px", objectFit: "cover" }}
                   className=" rounded-4"
                    />
                    <div className="details p-2 d-flex flex-column">
                        <h6 className="">{course.title}</h6>
                        <p>{course.duration}</p>
                        <span className="span mt-2 p-2 ms-0 rounded-5 d-flex justify-content-center ">{course.category}</span>
                    </div>
                    <div className="rate ms-4 mt-1 d-flex justify-content-center align-items-baseline me-3 gap-0"><i className=" fa-solid fa-star text-warning bg-transparent"></i> <p> 4.8</p></div>


                </div>
            ))}</div>
          </div>
        </div>
      </section>
    </div>
      
    </>
  );
};

export default CourseDetails;
