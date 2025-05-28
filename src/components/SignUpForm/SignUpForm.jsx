import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./SignUpForm.css";
import { NavLink, useNavigate } from "react-router-dom";

export default function SignUpForm({ onSuccess }) {
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
        resetForm();
        onSuccess(); 
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
    
    </div>
  );
}
