import React from "react";
import { useParams } from "react-router-dom";
import "./CheckOut.css";
import image1 from "./../../assets/1.png";
import image2 from "./../../assets/2.png";
import image3 from "./../../assets/3.png";
import image4 from "./../../assets/5.png";
import image5 from "./../../assets/6.png";
import image6 from "./../../assets/7.png";

import pay1 from "./../../assets/pay1.png";
import pay2 from "./../../assets/pay2.png";
import pay3 from "./../../assets/pay3.png";
import { Link } from "react-router-dom";

export default function CheckOut() {
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
      category: "Web Development",
      classes: 4,
      discount: 10,
      tax: 5,
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      description: "Master advanced JavaScript concepts and techniques.",
      instructor: "Jane Smith",
      price: 149,
      duration: "6 weeks",
      image: image2,
      category: "Web Development",
      classes: 4,
      discount: 10,
      tax: 5,
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
      category: "Backend Development",
      classes: 4,
      discount: 10,
      tax: 5,
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
      classes: 4,
      discount: 10,
      tax: 5,
    },
    {
      id: 5,
      title: "Advanced JavaScript",
      description: "Master advanced JavaScript concepts and techniques.",
      instructor: "Jane Smith",
      price: 149,
      duration: "6 weeks",
      image: image5, // Replace with real image URL
      category: "Web Development",
      classes: 4,
      discount: 10,
      tax: 5,
    },
    {
      id: 6,
      title: "Introduction to React",
      description: "Learn the basics of React and build your first app.",
      instructor: "John Doe",
      price: 99,
      duration: "4 weeks",
      image: image6, // Replace with real image URL
      category: "Web Development",
      classes: 4,
      discount: 10,
      tax: 5,
    },
  ];

  // Convert `id` to string since `useParams()` returns a string
  const course = courses.find((course) => course.id == id);

  if (!course) {
    return <div>Course not found!</div>;
  }
  return (
    <>
      <div className="main p-5 d-flex justify-content-between align-items-center">
        <div className="left px-5 w-100">
          <div className="course d-flex gap-3">
            <img
              src={course.image}
              alt={course.title}
              className=" rounded-4"
              style={{ width: "40%", height: "200px", objectFit: "cover" }}
            />
            <div className="desc ms-2">
              <h4 className="hBold">{course.title}</h4>
              <p>
                <strong>
                  {course.duration} - {course.classes}Classes Monthly
                </strong>
              </p>
              <div className="detail d-flex gap-2 align-items-center justify-content-center">
                <i className="fa-solid fa-play span mb-3 "></i>
                <p>{course.description}</p>
              </div>
              <p>
                <strong> ${course.price}/Monthly</strong>
              </p>
            </div>
          </div>
          <div className="payment-container mt-5">
            {/* Payment Options */}
            <h2 className="payment-title">Payment Options</h2>
            <div className="payment-options d-flex justify-content-around align-items-center w-100">
              <img src={pay1} alt="Visa" className="payment-icon" />
              <img src={pay2} alt="MasterCard" className="payment-icon" />
              <img src={pay3} alt="Apple Pay" className="payment-icon" />
            </div>
            <div className="divider"></div>

            {/* Payment Information */}
            <h2 className="payment-title">Payment Information</h2>
            <form className="payment-form">
              <label>Name on Card</label>
              <input
                type="text"
                className=" rounded-3"
                placeholder="Name on Card"
              />

              <label>Card Number</label>
              <input
                type="text"
                className=" rounded-3"
                placeholder="1234 1234 1234 1234"
              />

              <div className="input-row">
                <div className="input-group">
                  <label>Expiration Date</label>
                  <input
                    type="text"
                    className=" rounded-3"
                    placeholder="MM / YY"
                  />
                </div>
                <div className="input-group">
                  <label>Security Code</label>
                  <input type="text" className=" rounded-3" placeholder="CVC" />
                </div>
              </div>

              <button type="submit" className="checkout-btn">
                <Link className="link" to={'/done'}> Checkout</Link>
               
              </button>
            </form>
          </div>
        </div>
        <div className="right d-flex flex-column align-items-start ms-5 ps-5 w-40">
          <h4 className="hBold">Price Summary</h4>
          <div className="price w-60 d-flex justify-content-between align-items-center">
            <p>Course Price</p>
            <span>{course.price}$</span>
          </div>
          <div className="price w-60 d-flex justify-content-between align-items-center">
            <p>Discount</p>
            <span>{course.discount}$</span>
          </div>
          <div className="price w-60 d-flex justify-content-between align-items-center">
            <p>Taxs</p>
            <span>{course.tax}$</span>
          </div>
          <div className="price w-60 d-flex justify-content-between align-items-center">
            <p>Final Price</p>
            <span>{course.price - course.discount + course.tax}$</span>
          </div>
        </div>
      </div>
    </>
  );
}
