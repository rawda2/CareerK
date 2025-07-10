import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Left from "../Left/Left";
import { NavLink } from "react-router-dom";
import "./CsignUp.css";

export default function CsignUp() {
  const [formNu, setFormNum] = useState(4);
  const [photo, setPhoto] = useState(null);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handlePhotoChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file && file.size <= 12 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setPhoto(base64String);
        setFieldValue("profile_picture", base64String);
      };
      reader.readAsDataURL(file);
    } else {
      alert("File is too large. Max size is 12 MB.");
    }
  };

  const validationSchema = Yup.object().shape({
    // Step 1 validation
    company_name: Yup.string().required("Company name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),

    // Step 2 validation
    industry: Yup.string().required("Industry is required"),
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
    address: Yup.string().required("Address is required"),
    website: Yup.string().url("Invalid URL format"),

    // Step 3 validation
    contact_name: Yup.string().required("Contact name is required"),
    contact_email: Yup.string().email("Invalid email").required("Contact email is required"),
    phone_number: Yup.string()
      .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, "Invalid phone number")
      .required("Phone number is required"),
    
    // Step 4 validation
    brief_description: Yup.string()
      .max(500, "Description must be 500 characters or less")
      .required("Brief description is required"),
    profile_picture: Yup.mixed().required("Profile picture is required")
  });

  const handleSubmit = async (values) => {
    try {
      setApiError("");
      const response = await axios.post(`${API_URL}/company/register`, values);
      console.log("Registration successful:", response.data);
  
      navigate("/login");
      
    } catch (error) {
      console.error("Registration failed:", error);
      setApiError(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  const handleNext = (validateForm, setTouched, currentStepFields) => {
    const touchedObj = {};
    currentStepFields.forEach(field => {
      touchedObj[field] = true;
    });
    setTouched(touchedObj);

    validateForm().then(errors => {
      const stepErrors = {};
      currentStepFields.forEach(field => {
        if (errors[field]) stepErrors[field] = errors[field];
      });

      if (Object.keys(stepErrors).length === 0) {
        setFormNum(prev => prev + 1);
      }
    });
  };

  const stepFields = {
    1: ['company_name', 'email', 'password', 'confirm_password'],
    2: ['industry', 'country', 'city', 'address', 'website'],
    3: ['contact_name', 'contact_email', 'phone_number', 'social_media_links'],
    4: ['brief_description', 'profile_picture']
  };

  // Sample data for selects
  const industries = ["Technology", "Finance", "Healthcare", "Education", "Other"];
  const countries = ["USA", "UK", "Canada", "Australia", "Germany", "Other"];

  return (
    <div className="CsignUp d-flex justify-content-between align-items-center">
      <Formik
        initialValues={{
          company_name: "",
          email: "",
          password: "",
          confirm_password: "",
          brief_description: "",
          country: "",
          city: "",
          address: "",
          website: "",
          industry: "",
          contact_name: "",
          contact_email: "",
          phone_number: "",
          social_media_links: "",
          profile_picture: "",
          role:"company"
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, isSubmitting, validateForm, setFieldValue, setTouched }) => (
          <>
            {apiError && <div className="alert alert-danger">{apiError}</div>}

            {/* Step 1: Basic Information */}
            {formNu === 1 && (
              <div className="form1 py-4 px-2 w-50">
                <Form className="px-5 rounded-3 w-100 d-flex flex-column justify-content-center">
                <h3 className="mb-4 h3">Sign up as Company</h3>

                  <div className="mb-3">
                    <label className="form-label">Company Name*</label>
                    <Field
                      name="company_name"
                      className={`form-control ${touched.company_name && errors.company_name ? 'is-invalid' : ''}`}
                    />
                    <ErrorMessage name="company_name" component="div" className="invalid-feedback" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email*</label>
                    <Field
                      name="email"
                      type="email"
                      className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                    />
                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Password*</label>
                    <Field
                      name="password"
                      type="password"
                      className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                    />
                    <ErrorMessage name="password" component="div" className="invalid-feedback" />
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Confirm Password*</label>
                    <Field
                      name="confirm_password"
                      type="password"
                      className={`form-control ${touched.confirm_password && errors.confirm_password ? 'is-invalid' : ''}`}
                    />
                    <ErrorMessage name="confirm_password" component="div" className="invalid-feedback" />
                  </div>

                  <div className="input bg-transparent w-100 d-flex justify-content-center flex-column align-items-center mt-3">
                    <button
                      type="button"
                      className="btn"
                      onClick={() => handleNext(validateForm, setTouched, stepFields[formNu])}                    >
                      Next
                    </button>
                    <p className="mt-3">
                      Already have an Account?{" "}
                      <NavLink to={"/login"}>Log In</NavLink>
                    </p>
                  </div>
                </Form>
              </div>
            )}

            {/* Step 2: Company Location */}
            {formNu === 2 && (
              <div className="form1 px-2 pt-3 w-50">
                <Form className="px-5 rounded-3 w-80 py-5 d-flex flex-column position-relative justify-content-center">
              
                    <i className="fas fa-arrow-left me-2" onClick={() => setFormNum(1)}></i> 
                    

                  <div className="mb-3">
                    <label className="form-label">Industry*</label>
                    <Field
                      as="select"
                      name="industry"
                      className={`form-select ${touched.industry && errors.industry ? 'is-invalid' : ''}`}
                    >
                      <option value="">Select industry</option>
                      {industries.map(ind => (
                        <option key={ind} value={ind}>{ind}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="industry" component="div" className="invalid-feedback" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Country*</label>
                    <Field
                      as="select"
                      name="country"
                      className={`form-select ${touched.country && errors.country ? 'is-invalid' : ''}`}
                    >
                      <option value="">Select country</option>
                      {countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="country" component="div" className="invalid-feedback" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">City*</label>
                    <Field
                      name="city"
                      className={`form-control ${touched.city && errors.city ? 'is-invalid' : ''}`}
                    />
                    <ErrorMessage name="city" component="div" className="invalid-feedback" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Address*</label>
                    <Field
                      name="address"
                      className={`form-control ${touched.address && errors.address ? 'is-invalid' : ''}`}
                    />
                    <ErrorMessage name="address" component="div" className="invalid-feedback" />
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Website</label>
                    <Field
                      name="website"
                      type="url"
                      className={`form-control ${touched.website && errors.website ? 'is-invalid' : ''}`}
                    />
                    <ErrorMessage name="website" component="div" className="invalid-feedback" />
                  </div>

                  <div className="d-flex justify-content-between">
                  
                  <div className="input w-100 d-flex justify-content-center flex-column align-items-center mt-3">
                    <button
                      type="button"
                      className="btn"
                      onClick={() => handleNext(validateForm, setTouched, stepFields[formNu])}                 
                        
                    >
                      Next
                    </button>
                    <p className="mt-3">
                      Already have an Account?{" "}
                      <NavLink to={"/login"}>Log In</NavLink>
                    </p>
                  </div>
                  </div>
                </Form>
              </div>
            )}

            {/* Step 3: Contact Information */}
            {formNu === 3 && (
              <div className="form1 px-2 py-3 w-50">
                <Form className="px-5 rounded-3 w-80 py-5 d-flex flex-column position-relative justify-content-center">
                    <i className="fas fa-arrow-left me-2" onClick={() => setFormNum(2)}></i>

                  <div className="mb-3">
                    <label className="form-label">Contact Name*</label>
                    <Field
                      name="contact_name"
                      className={`form-control ${touched.contact_name && errors.contact_name ? 'is-invalid' : ''}`}
                    />
                    <ErrorMessage name="contact_name" component="div" className="invalid-feedback" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Contact Email*</label>
                    <Field
                      name="contact_email"
                      type="email"
                      className={`form-control ${touched.contact_email && errors.contact_email ? 'is-invalid' : ''}`}
                    />
                    <ErrorMessage name="contact_email" component="div" className="invalid-feedback" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Phone Number*</label>
                    <Field
                      name="phone_number"
                      className={`form-control ${touched.phone_number && errors.phone_number ? 'is-invalid' : ''}`}
                    />
                    <ErrorMessage name="phone_number" component="div" className="invalid-feedback" />
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Social Media Links</label>
                    <Field
                      name="social_media_links"
                      className="form-control"
                    />
                  </div>

                  <div className="input w-100 d-flex justify-content-center flex-column align-items-center mt-3">
                    <button
                      type="button"
                      className="btn"
                      onClick={() => handleNext(validateForm, setTouched, stepFields[formNu])}                    >
                    
                      Next
                    </button>
                    <p className="mt-3">
                      Already have an Account?{" "}
                      <NavLink to={"/login"}>Log In</NavLink>
                    </p>
                  </div>
                </Form>
              </div>
            )}

            {/* Step 4: Profile Completion */}
            {formNu === 4 && (
              <div className="form1 px-3 py-3 w-50 text-start d-flex flex-column align-items-start">
                <Form className="px-5 rounded-3 py-5 position-relative w-100 d-flex flex-column justify-content-center align-items-center">
                <i className="fas fa-arrow-left me-2"  onClick={() => setFormNum(3)}></i> 

                  <div className="photo-upload mb-4 text-center">
                  <div className="photo position-relative">
                      {photo ? (
                        <>
                          <label className="custom-upload-btn position-absolute  z-1">
                            <input
                              type="file"
                              name="profile_picture"
                              accept="image/*"
                              onChange={(e)=>{handlePhotoChange(e,setFieldValue)}}
                              className="d-none"
                            />
                            <i className="fa-solid fa-pen-to-square pen-icon"></i>
                          </label>
                          <img
                            src={photo}
                            alt="Profile"
                            className="object-cover"
                          />
                        </>
                      ) : (
                        <>
                          <label className="custom-upload-btn position-absolute  z-1">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e)=>{handlePhotoChange(e,setFieldValue)}}
                              className="d-none"
                            />
                            <i className="fa-solid fa-pen-to-square pen-icon"></i>
                          </label>
                          <div className="noPhoto object-fit-cover"></div>
                        </>
                      )}
                    </div>
                  
                    <ErrorMessage name="profile_picture" component="div" className="invalid-feedback" />
                  </div>

                  <div className="w-100 mb-4 mt-5">
                    <label className="form-label">Company Description*</label>
                    <Field
                      as="textarea"
                      name="brief_description"
                      className={`form-control ${touched.brief_description && errors.brief_description ? 'is-invalid' : ''}`}
                      rows="5"
                    />
                    <ErrorMessage name="brief_description" component="div" className="invalid-feedback" />
                    <div className="text-end text-muted">
                      {values.brief_description?.length || 0}/500
                    </div>
                  </div>

                  <button
                  type="submit"
                  className="Btn mt-4 mx-5"
                  disabled={isSubmitting}
                  >
                
                  {isSubmitting ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  ) : (
                    "Submit"
                  )}
                </button>
                </Form>
              </div>
            )}
          </>
        )}
      </Formik>
      <Left />
    </div>
  );
}
