import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./SignUpForm.css";
import { NavLink, useNavigate } from "react-router-dom";

export default function SignUpForm() {
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate(); // Hook to navigate between routes

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      iAgree: false,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Please confirm your password"),
      phone: Yup.string().required("Phone is required"),
      iAgree: Yup.boolean().oneOf(
        [true],
        "You must accept the terms and conditions"
      ),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      setApiError(""); // Clear any previous error messages
      try {
        const response = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signup",
          {
            name: `${values.firstName} ${values.lastName}`,
            email: values.email,
            password: values.password,
            rePassword: values.rePassword,
            phone: values.phone,
          }
        );
        resetForm(); // Reset the form after successful submission
        navigate("/login"); // Navigate to login page
      } catch (error) {
        if (error.response && error.response.data) {
          const { message } = error.response.data;
          setApiError(message || "An error occurred during sign up.");
        } else {
          setApiError("An unexpected error occurred. Please try again.");
        }
      }
      setSubmitting(false);
    },
    
  });

  return (
    <div className="Signform py-3 d-flex flex-column justify-content-center align-items-center py-4">
      <form
        onSubmit={formik.handleSubmit}
        className="px-5 pt-1 pb-4 rounded-3 d-flex flex-column justify-content-center"
        noValidate
      >
        <h3 className="mb-4">Sign up For an Account</h3>

        {/* Display API error */}
        {apiError && <div className="alert alert-danger w-100">{apiError}</div>}

        <div className="inputs w-100 d-flex flex-column gap-2">
          {/* First and Last Name Fields */}
          <div className="position-relative w-100 twoInone">
            <div className="part">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                {...formik.getFieldProps("firstName")}
                className={`form-control ${
                  formik.touched.firstName && formik.errors.firstName
                    ? "is-invalid"
                    : formik.touched.firstName && !formik.errors.firstName
                    ? "is-valid"
                    : ""
                }`}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <div className="invalid-feedback">
                  {formik.errors.firstName}
                </div>
              )}
            </div>
            <div className="part">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                {...formik.getFieldProps("lastName")}
                className={`form-control ${
                  formik.touched.lastName && formik.errors.lastName
                    ? "is-invalid"
                    : formik.touched.lastName && !formik.errors.lastName
                    ? "is-valid"
                    : ""
                }`}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <div className="invalid-feedback">{formik.errors.lastName}</div>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div className="position-relative">
            <label htmlFor="email">Email Address</label>
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
            {formik.touched.email && formik.errors.email && (
              <div className="invalid-feedback">{formik.errors.email}</div>
            )}
          </div>

          {/* Password Fields */}
          <div className="position-relative twoInone">
            <div className="part">
              <label htmlFor="password">Password</label>
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
              {formik.touched.password && formik.errors.password && (
                <div className="invalid-feedback">{formik.errors.password}</div>
              )}
            </div>
            <div className="part">
              <label htmlFor="rePassword">Re-Password</label>
              <input
                type="password"
                id="rePassword"
                name="rePassword"
                {...formik.getFieldProps("rePassword")}
                className={`form-control ${
                  formik.touched.rePassword && formik.errors.rePassword
                    ? "is-invalid"
                    : formik.touched.rePassword && !formik.errors.rePassword
                    ? "is-valid"
                    : ""
                }`}
              />
              {formik.touched.rePassword && formik.errors.rePassword && (
                <div className="invalid-feedback">
                  {formik.errors.rePassword}
                </div>
              )}
            </div>
          </div>

          {/* Phone Field */}
          <div className="position-relative">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              {...formik.getFieldProps("phone")}
              className={`form-control ${
                formik.touched.phone && formik.errors.phone
                  ? "is-invalid"
                  : formik.touched.phone && !formik.errors.phone
                  ? "is-valid"
                  : ""
              }`}
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="invalid-feedback">{formik.errors.phone}</div>
            )}
          </div>

          {/* Terms Checkbox */}
          <div className="mt-3">
            <label>
              <input
                type="checkbox"
                id="iAgree"
                name="iAgree"
                {...formik.getFieldProps("iAgree")}
                className={`form-check-input me-3 ${
                  formik.touched.iAgree && formik.errors.iAgree
                    ? "is-invalid"
                    : ""
                }`}
              />
              I agree to the{" "}
              <a href="#!" className="link-primary text-decoration-none">
                terms and conditions
              </a>
            </label>
            {formik.touched.iAgree && formik.errors.iAgree && (
              <div className="invalid-feedback">{formik.errors.iAgree}</div>
            )}
          </div>

          {/* Submit Button */}
          <div className="input w-100 d-flex justify-content-center align-items-center mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Submitting..." : "Sign Up"}
            </button>
            <p className="mt-3">
              Already have an Account?{" "}
              <NavLink to={"/login"}>Log In</NavLink>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
