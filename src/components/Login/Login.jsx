import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Left from "../Left/Left";

import "./Login.css"; // You can reuse the same CSS file as SignUp
import "../SignUpForm/SignUpForm.css"; // Reuse this if needed for consistent styles
import { Navigate, NavLink, useNavigate } from "react-router-dom";

export default function Login() {
  const [apiError, setApiError] = useState(""); // State to store API error message
   const navigate=useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required")
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      setApiError(""); // Clear any previous error messages
      try {
        // Send form data to the API
        const response = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          {
            email: values.email,
            password: values.password,
          }
        );
        localStorage.setItem('token', response.data.token);
        console.log("Login Successful:", response.data);
        resetForm();
        navigate('/home');
      } catch (error) {
        if (error.response && error.response.data) {
          // Handle API error response
          const { message, errors } = error.response.data;
          console.error("Error during login:", message, errors);
          setApiError(message || "An error occurred during login.");
        } else {
          console.error("Error during login:", error.message);
          setApiError("An unexpected error occurred. Please try again.");
        }
      }
      setSubmitting(false);
    },
  });

  return (
    <section className="Signform w-100 d-flex flex-column justify-content-center align-items-center  ">
      <div className="body d-flex w-100 vh-100">
        <div className="right w-50 vh-100 d-flex flex-column justify-content-center align-items-center">
        <form
        onSubmit={formik.handleSubmit}
        className="px-5 pt-1 pb-4 rounded-3 d-flex flex-column justify-content-center align-items-start w-100"
        noValidate
      >
        <h3 className="mb-4">Login to your account</h3>

        {apiError && <div className="alert alert-danger w-100">{apiError}</div>}

        <div className="inputs w-100 d-flex flex-column gap-2">
          <div className="position-relative">
            <label htmlFor="email">Email Address</label>
            <div className="input d-flex flex-row">
            <input
              type="email"
              id="email"
              name="email"
              {...formik.getFieldProps("email")}
              className={`form-control ${
                formik.touched.email && formik.errors.email
                  ? "is-invalid"
                  : formik.touched.email && !formik.errors.email
                  ? "is-valid"
                  : ""
              }`}
            />
            <i className=" fa-solid fa-user"></i>
            </div>
          
            {formik.touched.email && formik.errors.email && (
              <div className="invalid-feedback">{formik.errors.email}</div>
            )}
          </div>

          <div className="position-relative">
            <label htmlFor="password">Password</label>
            <div className="input">
            <input
              type="password"
              
              id="password"
              name="password"
              {...formik.getFieldProps("password")}
              className={`form-control ${
                formik.touched.password && formik.errors.password
                  ? "is-invalid"
                  : formik.touched.password && !formik.errors.password
                  ? "is-valid"
                  : ""
              }`}
            />
            <i className="fa-solid fa-lock"></i>
            </div>
            
            {formik.touched.password && formik.errors.password && (
              <div className="invalid-feedback">{formik.errors.password}</div>
            )}
          </div>

          
          <div className="input w-100 d-flex justify-content-center align-items-center mt-3">
            <button
              type="submit"
              className="btn btn-primary "
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Logging in..." : "Log In"}
            </button>
            <p className="mt-3">
              Don't have an Account? <NavLink to={"/signup"}>Sign Up</NavLink>
            </p>
            <p className="">
            <NavLink to={"/reset"}>  Forgot Password </NavLink>
            </p>
          </div>
        </div>
        
      </form>
      <div className="Or position-relative">
        <p>OR</p>
      </div>
      <div className="btns d-flex flex-column gap-4">
       <button className=" shadow ">
          <i className=" fa-solid fa-brands fa-google"></i>
          <a href="#">Log in with Google</a>
        </button>
         <button className=" shadow ">
          <i className=" fa-solid fa-brands fa-github"></i>
          <a href="#">Log in with GitHub</a>
        </button>
      </div>
      </div>

    

     <Left/>
      </div>

     
    </section>
  );
}



// ashrawdamain@gmail.com
// Rery123@2
