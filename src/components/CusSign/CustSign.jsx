import React, { useState } from "react";
import Left from "../Left/Left";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./../SignUpForm/SignUpForm.css";
import { NavLink } from "react-router-dom";

export default function CustSign() {
  const navigate = useNavigate();
  const [formNu, setFormNum] = useState(1); // Start with step 1
  const [apiError, setApiError] = useState("");
  const [photo, setPhoto] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  const handleClick = () => {
    let isValid = true;
    switch (formNu) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        break;
      case 3:
        // Don't validate on last step - formik handles submission
        break;
      default:
        break;
    }

    if (isValid && formNu < 3) {
      setFormNum(prev => prev + 1);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size <= 12 * 1024 * 1024) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPhoto(reader.result);
        };
        reader.readAsDatalL(file);
        formik.setFieldValue("profile_picture", file);
      } else {
        alert("Profile picture is too large. Max size is 12MB.");
        e.target.value = "";
      }
    }
  };

  const handleBack = () => {
    setFormNum(prev => prev - 1);
  };

  const validateStep1 = () => {
    formik.setTouched({
      name: true,
      email: true,
      password: true,
      confirm_password: true,
    });
    const errors = {
      ...(formik.errors.name && { name: formik.errors.name }),
      ...(formik.errors.email && { email: formik.errors.email }),
      ...(formik.errors.password && { password: formik.errors.password }),
      ...(formik.errors.confirm_password && { confirm_password: formik.errors.confirm_password }),
    };
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = () => {
    formik.setTouched({ brief_description: true });
    return !formik.errors.brief_description;
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      brief_description: "",
      contact_email: "",
      phone_number: "",
      profile_picture: null,
      role:"customer"
    
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Company name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
      confirm_password: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Please confirm your password'),
      brief_description: Yup.string().min(20, 'Bio must be at least 20 characters').required('Bio is required'),
      contact_email: Yup.string().email('Invalid email address').required('Contact email is required'),
      phone_number: Yup.string()
        .matches(/^[0-9]+$/, 'Must be only digits')
        .min(10, 'Must be at least 10 digits')
        .required('Phone number is required'),
      profile_picture: Yup.mixed()
        .test('fileSize', 'File too large', value => !value || (value && value.size <= 12 * 1024 * 1024))
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      setApiError("");

      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      try {
        const response = await axios.post(
          `${API_URL}/customer/register`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        console.log("Registration successful:", response.data);
        resetForm();
        navigate("/login", { state: { registrationSuccess: true } });
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        setApiError(error.response?.data?.message || "An unexpected error occurred. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });


  return (
    <div className="signup">
      <div className="body d-flex w-100 vh-100">
        {formNu === 1 && (
          <>
            <div className="Signform py-5 w-50">
              <form className="px-5 pt-1 pb-4 rounded-3 d-flex flex-column justify-content-center">
                <h3 className="mb-4 h3">Sign up customer account</h3>

                {apiError && <div className="alert alert-danger w-100">{apiError}</div>}

                <div className="inputs w-100 d-flex flex-column gap-2">
                  <div className="position-relative">
                    <label htmlFor="name">Name*</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      {...formik.getFieldProps("name")}
                      className={`form-control ${
                        formik.touched.name && formik.errors.name
                          ? "is-invalid"
                          : formik.touched.name && !formik.errors.name
                          ? "is-valid"
                          : ""
                      }`}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <div className="invalid-feedback">{formik.errors.name}</div>
                    )}
                  </div>

                  <div className="position-relative">
                    <label htmlFor="email">Email Address*</label>
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

                  <div className="position-relative">
                    <label htmlFor="password">Password*</label>
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

                  <div className="position-relative">
                    <label htmlFor="confirm_password">Confirm Password*</label>
                    <input
                      type="password"
                      id="confirm_password"
                      name="confirm_password"
                      {...formik.getFieldProps("confirm_password")}
                      className={`form-control ${
                        formik.touched.confirm_password && formik.errors.confirm_password
                          ? "is-invalid"
                          : formik.touched.confirm_password && !formik.errors.confirm_password
                          ? "is-valid"
                          : ""
                      }`}
                    />
                    {formik.touched.confirm_password && formik.errors.confirm_password && (
                      <div className="invalid-feedback">{formik.errors.confirm_password}</div>
                    )}
                  </div>

                  <div className="input w-100 bg-transparent d-flex justify-content-center align-items-center mt-3">
                    <button
                      type="button"
                      className="btn"
                      onClick={handleClick}
                    >
                      Next
                    </button>
                    <p className="mt-3">
                      Already have an Account?{" "}
                      <NavLink to={"/login"}>Log In</NavLink>
                    </p>
                  </div>
                </div>
              </form>
            </div>
            <Left />
          </>
        )}

        {formNu === 2 && (
          <>
            <div className="form1 py-5 px-5 w-50">
              <i className="fa-solid fa-arrow-left" onClick={handleBack}></i>

              <div className="photo-upload mb-4 text-center d-flex justify-content-center px-5 w-80">
                <div className="photo position-relative">
                  {photo ? (
                    <>
                      <label className="custom-upload-btn position-absolute z-1">
                        <input
                          type="file"
                          name="profile_picture"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          className="d-none"
                        />
                        <i className="fa-solid fa-pen-to-square pen-icon"></i>
                      </label>
                      <img src={photo} alt="Profile" className="object-cover" />
                    </>
                  ) : (
                    <>
                      <label className="custom-upload-btn position-absolute z-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          className="d-none"
                        />
                        <i className="fa-solid fa-pen-to-square pen-icon"></i>
                      </label>
                      <div className="noPhoto object-fit-cover"></div>
                    </>
                  )}
                </div>
              </div>

              {apiError && <div className="alert alert-danger w-80 mx-auto">{apiError}</div>}

              <form className="rounded-3 w-80 py-5 px-5 d-flex flex-column justify-content-center">
                <label>Brief Bio*</label>
                <textarea
                  className={`form-control mb-3 ${
                    formik.touched.brief_description && formik.errors.brief_description
                      ? "is-invalid"
                      : formik.touched.brief_description && !formik.errors.brief_description
                      ? "is-valid"
                      : ""
                  }`}
                  placeholder="Write Here"
                  name="brief_description"
                  value={formik.values.brief_description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  rows="3"
                />
                {formik.touched.brief_description && formik.errors.brief_description && (
                  <div className="invalid-feedback">{formik.errors.brief_description}</div>
                )}

                <button
                  type="button"
                  className="Btn mb-3"
                  onClick={handleClick}
                >
                  Next
                </button>
              </form>
            </div>
            <Left />
          </>
        )}

        {formNu === 3 && (
          <>
            <div className="form1 py-5 px-5 w-50">
              <i className="fa-solid fa-arrow-left last" onClick={handleBack}></i>
              
              {apiError && <div className="alert alert-danger w-80 mx-auto">{apiError}</div>}

              <form 
                className="px-5 py-5 pt-1 pb-4 rounded-3 d-flex flex-column justify-content-center"
                onSubmit={formik.handleSubmit}
              >
                <h4 className="mt-3 mb-5">Contact Information</h4>

                <div className="position-relative w-80 mt-2">
                  <label htmlFor="phone_number">Phone Number*</label>
                  <input
                    type="tel"
                    id="phone_number"
                    name="phone_number"
                    {...formik.getFieldProps("phone_number")}
                    className={`form-control ${
                      formik.touched.phone_number && formik.errors.phone_number
                        ? "is-invalid"
                        : formik.touched.phone_number && !formik.errors.phone_number
                        ? "is-valid"
                        : ""
                    }`}
                  />
                  {formik.touched.phone_number && formik.errors.phone_number && (
                    <div className="invalid-feedback">{formik.errors.phone_number}</div>
                  )}
                </div>

                <div className="position-relative w-80">
                  <label htmlFor="contact_email">Contact Email*</label>
                  <input
                    type="email"
                    id="contact_email"
                    name="contact_email"
                    {...formik.getFieldProps("contact_email")}
                    className={`form-control ${
                      formik.touched.contact_email && formik.errors.contact_email
                        ? "is-invalid"
                        : formik.touched.contact_email && !formik.errors.contact_email
                        ? "is-valid"
                        : ""
                    }`}
                  />
                  {formik.touched.contact_email && formik.errors.contact_email && (
                    <div className="invalid-feedback">{formik.errors.contact_email}</div>
                  )}
                </div>

                <button
                  type="submit"
                  className="Btn mt-4 w-80"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  ) : (
                    "Submit"
                  )}
                </button>
              </form>
            </div>
            <Left />
          </>
        )}
      </div>
    </div>
  );
}