import  { useState } from "react";
import "./SignUp.css";
import Left from "../Left/Left";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./../SignUpForm/SignUpForm.css";
import { NavLink } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [formNu, setFormNum] = useState(1);
  const [photo, setPhoto] = useState(null);
  const [apiError, setApiError] = useState("");
  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const [interestedCourses, setInterestedCourses] = useState([]);
  const [currentCourse, setCurrentCourse] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  const handleClick = () => {
    // Validate current step before proceeding
    let isValid = true;
    formik.setTouched({
      name: true,
      email: true,
      password: true,
      confirm_password: true,
      brief_bio: true,
      contact_email: true,
      phone_number: true,
    });
    switch (formNu) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        break;
      case 3:
        isValid = validateStep3();
        break;
      default:
        break;
    }
    
    if (isValid) {
      setFormNum((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setFormNum((prev) => prev - 1);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size <= 12 * 1024 * 1024) { // 12MB limit
        const reader = new FileReader();
        reader.onloadend = () => {
          setPhoto(reader.result);
        };
        reader.readAsDataURL(file);
        formik.setFieldValue("profile_picture", file);
      } else {
        alert("Profile picture is too large. Max size is 12MB.");
        e.target.value = ""; // Reset the input
      }
    }
  };
  
  const handleCVUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size <= 5 * 1024 * 1024) { // 5MB limit
        formik.setFieldValue("uploaded_cv", file);
      } else {
        alert("CV file is too large. Max size is 5MB.");
        e.target.value = ""; // Reset the input
      }
    }
  };

  const addSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      const newSkills = [...skills, currentSkill.trim()];
      setSkills(newSkills);
      formik.setFieldValue("skills", newSkills);
      setCurrentSkill("");
    }
  };
  
  const addCourse = () => {
    if (currentCourse.trim() && !interestedCourses.includes(currentCourse.trim())) {
      const newCourses = [...interestedCourses, currentCourse.trim()];
      setInterestedCourses(newCourses);
      formik.setFieldValue("interested_courses", newCourses);
      setCurrentCourse("");
    }
  };

  const removeSkill = (skillToRemove) => {
    const updatedSkills = skills.filter(skill => skill !== skillToRemove);
    setSkills(updatedSkills);
    formik.setFieldValue("skills", updatedSkills);
  };



  const removeCourse = (courseToRemove) => {
    const updatedCourses = interestedCourses.filter(course => course !== courseToRemove);
    setInterestedCourses(updatedCourses);
    formik.setFieldValue("interested_courses", updatedCourses);
  };

  // Validation for each step
  const validateStep1 = () => {
    const fields = ['first_name', 'last_name', 'email', 'password', 'confirm_password', 'phone_number', 'iAgree'];
    fields.forEach(field => formik.setFieldTouched(field, true));
    
    const errors = {};
    if (!formik.values.first_name) errors.first_name = 'Required';
    if (!formik.values.last_name) errors.last_name = 'Required';
    if (!formik.values.email) errors.email = 'Required';
    if (!formik.values.password) errors.password = 'Required';
    if (!formik.values.confirm_password) errors.confirm_password = 'Required';
    if (!formik.values.phone_number) errors.phone_number = 'Required';
    if (!formik.values.iAgree) errors.iAgree = 'You must accept the terms';
    
    formik.setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = () => {
    const fields = ['gender', 'date_of_birth', 'country', 'city', 'address'];
    fields.forEach(field => formik.setFieldTouched(field, true));
    
    const errors = {};
    if (!formik.values.gender) errors.gender = 'Required';
    if (!formik.values.date_of_birth) errors.date_of_birth = 'Required';
    if (!formik.values.country) errors.country = 'Required';
    if (!formik.values.city) errors.city = 'Required';
    if (!formik.values.address) errors.address = 'Required';
    
    formik.setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep3 = () => {
    const fields = ['brief_bio', 'skills'];
    fields.forEach(field => formik.setFieldTouched(field, true));
    
    const errors = {};
    if (!formik.values.brief_bio) errors.brief_bio = 'Required';
    if (skills.length === 0) errors.skills = 'At least one skill is required';
    
    formik.setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
      gender: "",
      date_of_birth: "",
      phone_number: "",
      country: "",
      city: "",
      address: "",
      brief_bio: "",
      skills: [],
      current_track: "",
      track_level: "",
      previous_job: "",
      type_of_job: "",
      years_of_experience: "",
      expected_salary: "",
      uploaded_cv: null,
      interested_courses: [],
      role:"Developer",
      profile_picture: null,
    },
    validationSchema: Yup.object({
      // Step 1 validation
      first_name: Yup.string().required('First name is required'),
      last_name: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
      confirm_password: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Please confirm your password'),
      phone_number: Yup.string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(10, 'Must be at least 10 digits')
        .required('Phone number is required'),
     
      // Step 2 validation
      gender: Yup.string().required('Gender is required'),
      date_of_birth: Yup.date()
        .max(new Date(), 'Date of birth cannot be in the future')
        .required('Date of birth is required'),
      country: Yup.string().required('Country is required'),
      city: Yup.string().required('City is required'),
      address: Yup.string().required('Address is required'),
      
      // Step 3 validation
      brief_bio: Yup.string()
        .min(20, 'Bio must be at least 20 characters')
        .required('Bio is required'),
      skills: Yup.array()
        .min(1, 'At least one skill is required')
        .required('Skills are required'),
      
      // Step 4 fields (all optional)
      current_track: Yup.string(),
      track_level: Yup.string(),
      previous_job: Yup.string(),
      type_of_job: Yup.string(),
      years_of_experience: Yup.string(),
      expected_salary: Yup.string(),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      setApiError("");
    
      try {
        // 1. First format the date
        const formattedValues = {
          ...values,
          date_of_birth: values.date_of_birth 
            ? new Date(values.date_of_birth).toISOString() 
            : null
        };
    
        // 2. Create FormData with the formatted values
        const formData = new FormData();
        
        // Debug: Log the values before creating FormData
        console.log("Formatted values:", formattedValues);
    
        // 3. Append all fields to FormData
        Object.entries(formattedValues).forEach(([key, value]) => {
          if (value === null || value === undefined) return;
          
          if (key === "uploaded_cv" || key === "profile_picture") {
            formData.append(key, value);
          } 
          else if (Array.isArray(value)) {
            // formData.append(key,value);
             value.forEach(item => formData.append(`${key}[]`, item));
          }
          else {
            formData.append(key, value);
          }
        });
    
        // Debug: Log FormData contents
        console.log("FormData contents:");
        for (let [key, value] of formData.entries()) {
          console.log(key, value);
        }
    
        const response = await axios.post(
          `${API_URL}/developer/register`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
    
        console.log("Registration successful:", response.data);
        resetForm();
        navigate("/login", { state: { registrationSuccess: true } });
        
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        if (error.response && error.response.data) {
          const { message } = error.response.data;
          setApiError(message || "An error occurred during sign up.");
        } else {
          setApiError("An unexpected error occurred. Please try again.");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  localStorage.setItem("UserType","developer")

  // Sample countries and cities data
  const countries = ["Egypt", "USA", "UK", "Canada", "Germany"];
  const citiesByCountry = {
    Egypt: ["Cairo", "Alexandria", "Giza", "Luxor"],
    USA: ["New York", "Los Angeles", "Chicago", "Houston"],
    UK: ["London", "Manchester", "Liverpool", "Birmingham"],
    Canada: ["Toronto", "Vancouver", "Montreal", "Calgary"],
    Germany: ["Berlin", "Munich", "Hamburg", "Frankfurt"],
  };

  return (
    <div className="signup">
      <div className="body d-flex w-100 vh-100">
        {formNu === 1 && (
          <>
            <div className="Signform py-5 w-50">
              <form
                className="px-5 pt-1 pb-4 rounded-3 d-flex flex-column justify-content-center"
                noValidate
              >
                <h3 className="mb-4 h3">Sign up For an Account</h3>

                {apiError && (
                  <div className="alert alert-danger w-100">{apiError}</div>
                )}

                <div className="inputs w-100 d-flex flex-column gap-2">
                  {/* First and Last Name Fields */}
                  <div className="position-relative w-100 twoInone">
                    <div className="part">
                      <label htmlFor="first_name">First Name*</label>
                      <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        {...formik.getFieldProps("first_name")}
                        className={`form-control ${
                          formik.touched.first_name && formik.errors.first_name
                            ? "is-invalid"
                            : formik.touched.first_name && !formik.errors.first_name
                            ? "is-valid"
                            : ""
                        }`}
                      />
                      {formik.touched.first_name && formik.errors.first_name && (
                        <div className="invalid-feedback">
                          {formik.errors.first_name}
                        </div>
                      )}
                    </div>
                    <div className="part">
                      <label htmlFor="last_name">Last Name*</label>
                      <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        {...formik.getFieldProps("last_name")}
                        className={`form-control ${
                          formik.touched.last_name && formik.errors.last_name
                            ? "is-invalid"
                            : formik.touched.last_name && !formik.errors.last_name
                            ? "is-valid"
                            : ""
                        }`}
                      />
                      {formik.touched.last_name && formik.errors.last_name && (
                        <div className="invalid-feedback">
                          {formik.errors.last_name}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Email Field */}
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
                      <div className="invalid-feedback">
                        {formik.errors.email}
                      </div>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div className="position-relative">
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
                      <div className="invalid-feedback">
                        {formik.errors.phone_number}
                      </div>
                    )}
                  </div>

                  {/* Password Fields */}
                  <div className="position-relative twoInone">
                    <div className="part">
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
                        <div className="invalid-feedback">
                          {formik.errors.password}
                        </div>
                      )}
                    </div>
                    <div className="part">
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
                        <div className="invalid-feedback">
                          {formik.errors.confirm_password}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Terms Checkbox */}
                  <div className="mt-3">
                    <label>
                      <input
                        type="checkbox"
                        id="iAgree"
                        name="iAgree"
                        checked={formik.values.iAgree}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`form-check-input me-3 ${
                          formik.touched.iAgree && formik.errors.iAgree
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      I agree to the{" "}
                      <a
                        href="#!"
                        className="link-primary text-decoration-none"
                      >
                        terms and conditions*
                      </a>
                    </label>
                    {formik.touched.iAgree && formik.errors.iAgree && (
                      <div className="invalid-feedback d-block">
                        {formik.errors.iAgree}
                      </div>
                    )}
                  </div>

                  {/* Next Button */}
                  <div className="input w-100 d-flex justify-content-center align-items-center mt-3">
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
            <div className="form1 px-5 py-4  w-50">
              <i
                className="fa-solid fa-arrow-left mt-1"
                onClick={handleBack}
              ></i>

              <form className="px-5 rounded-3  mt-0 w-80 d-flex flex-column justify-content-center">
                <div className="w-100 mb-3">
                  <div className="d-flex align-items-center justify-content-center text-center">
                    <div className="photo">
                      {photo ? (
                        <>
                          <label className="custom-upload-btn position-absolute">
                            <input
                              type="file"
                              name="profile_picture"
                              accept="image/*"
                              onChange={handlePhotoChange}
                              className="d-none"
                            />
                            <i className="fa-solid fa-pen-to-square pen-icon"></i>
                          </label>
                          <img
                            src={photo}
                            alt="Profile"
                            className="object-cover w-100 h-100 rounded-circle"
                          />
                        </>
                      ) : (
                        <>
                          <label className="custom-upload-btn position-absolute">
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
                </div>

                <div className="twoInone">
                  {/* Gender Field */}
                  <div className="mb-3 part">
                    <label className="form-label">Gender*</label>
                    <select
                      className={`form-select ${
                        formik.touched.gender && formik.errors.gender
                          ? "is-invalid"
                          : formik.touched.gender && !formik.errors.gender
                          ? "is-valid"
                          : ""
                      }`}
                      name="gender"
                      value={formik.values.gender}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {formik.touched.gender && formik.errors.gender && (
                      <div className="invalid-feedback">
                        {formik.errors.gender}
                      </div>
                    )}
                  </div>

                  {/* Birthday Field */}
                  <div className="mb-3 part">
                    <label className="form-label">Birthday*</label>
                    <input
                      type="date"
                      className={`form-control ${
                        formik.touched.date_of_birth && formik.errors.date_of_birth
                          ? "is-invalid"
                          : formik.touched.date_of_birth && !formik.errors.date_of_birth
                          ? "is-valid"
                          : ""
                      }`}
                      name="date_of_birth"
                      value={formik.values.date_of_birth}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      max={new Date().toISOString().split('T')[0]}
                    />
                    {formik.touched.date_of_birth && formik.errors.date_of_birth && (
                      <div className="invalid-feedback">
                        {formik.errors.date_of_birth}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Country*</label>
                  <select
                    className={`form-select ${
                      formik.touched.country && formik.errors.country
                        ? "is-invalid"
                        : formik.touched.country && !formik.errors.country
                        ? "is-valid"
                        : ""
                    }`}
                    name="country"
                    value={formik.values.country}
                    onChange={(e) => {
                      formik.handleChange(e);
                      formik.setFieldValue("city", ""); // Reset city when country changes
                    }}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  {formik.touched.country && formik.errors.country && (
                    <div className="invalid-feedback">
                      {formik.errors.country}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">City*</label>
                  <select
                    className={`form-select ${
                      formik.touched.city && formik.errors.city
                        ? "is-invalid"
                        : formik.touched.city && !formik.errors.city
                        ? "is-valid"
                        : ""
                    }`}
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={!formik.values.country}
                  >
                    <option value="">Select City</option>
                    {formik.values.country &&
                      citiesByCountry[formik.values.country]?.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                  </select>
                  {formik.touched.city && formik.errors.city && (
                    <div className="invalid-feedback">
                      {formik.errors.city}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Address*</label>
                  <input
                    type="text"
                    className={`form-control ${
                      formik.touched.address && formik.errors.address
                        ? "is-invalid"
                        : formik.touched.address && !formik.errors.address
                        ? "is-valid"
                        : ""
                    }`}
                    placeholder="Address"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.address && formik.errors.address && (
                    <div className="invalid-feedback">
                      {formik.errors.address}
                    </div>
                  )}
                </div>

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
            <div className="form1 py-4 px-5 w-50">
              <i
                className="fa-solid fa-arrow-left last"
                onClick={handleBack}
              ></i>

              <form className="rounded-3 w-80 py-5 px-5 d-flex flex-column justify-content-center">
                <label>Brief Bio*</label>
                <textarea
                  className={`form-control mb-3 ${
                    formik.touched.brief_bio && formik.errors.brief_bio
                      ? "is-invalid"
                      : formik.touched.brief_bio && !formik.errors.brief_bio
                      ? "is-valid"
                      : ""
                  }`}
                  placeholder="Write Here"
                  name="brief_bio"
                  value={formik.values.brief_bio}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  rows="3"
                />
                {formik.touched.brief_bio && formik.errors.brief_bio && (
                  <div className="invalid-feedback">
                    {formik.errors.brief_bio}
                  </div>
                )}

                <label htmlFor="uploaded_cv">Upload CV*</label>
                <label className="custom-btn mt-2 mb-2 form-control">
                  {formik.values.uploaded_cv ? (
                    <span>{formik.values.uploaded_cv.name}</span>
                  ) : (
                    <span>Choose file (PDF, DOC, DOCX)</span>
                  )}
                  <input
                    type="file"
                    id="uploaded_cv"
                    name="uploaded_cv"
                    accept=".pdf,.doc,.docx"
                    onChange={handleCVUpload}
                    className="d-none"
                  />
                </label>

                <label>Your skills*</label>
                <div className="d-flex mb-2">
                  <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Add skill"
                    value={currentSkill}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                  />
                  <button
                    type="button"
                    className="Btn py-0 "
                    onClick={addSkill}
                  >
                    Add
                  </button>
                </div>
                {formik.touched.skills && formik.errors.skills && (
                  <div className="invalid-feedback d-block mb-2">
                    {formik.errors.skills}
                  </div>
                )}
                <div className="mb-3 d-flex gap-2 flex-wrap">
                  {skills.map((skill) => (
                    <span key={skill} className="badge me-2">
                      {skill}
                      <button
                        type="button"
                        className="btn-close btn-close-white ms-1"
                        onClick={() => removeSkill(skill)}
                        aria-label="Remove"
                      />
                    </span>
                  ))}
                </div>

                <label>Your Courses*</label>
                <div className="d-flex mb-2">
                  <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Add course"
                    value={currentCourse}
                    onChange={(e) => setCurrentCourse(e.target.value)}
                  />
                  <button
                    type="button"
                    className="Btn"
                    onClick={addCourse}
                  >
                    Add
                  </button>
                </div>
              <div className="mb-3 d-flex gap-2 flex-wrap">
                  {interestedCourses.map((course) => (
                    <span key={course} className="badge me-2">
                      {course}
                      <button
                        type="button"
                        className="btn-close btn-close-white ms-1"
                        onClick={() => removeCourse(course)}
                        aria-label="Remove"
                      />
                    </span>
                  ))}
                </div>

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

        {formNu === 4 && (
          <>
            <div className="form1 py-4 px-5 w-50">
              <i
                className="fa-solid fa-arrow-left last"
                onClick={handleBack}
              ></i>

              <form 
                className="rounded-3 px-5 w-80 d-flex flex-column justify-content-center"
                onSubmit={formik.handleSubmit}
              >
                <label>Enter Your Current Track (Optional)</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Your Current Track"
                  name="current_track"
                  value={formik.values.current_track}
                  onChange={formik.handleChange}
                />

                <label>Enter Track Level (Optional)</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Your Track Level"
                  name="track_level"
                  value={formik.values.track_level}
                  onChange={formik.handleChange}
                />

                <label>Enter Your Previous Work (Optional)</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Your Previous Work"
                  name="previous_job"
                  value={formik.values.previous_job}
                  onChange={formik.handleChange}
                />

                <label>Enter Type of Job (Optional)</label>
                <select
                  className="form-control mb-3"
                  name="type_of_job"
                  value={formik.values.type_of_job}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Job Type</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="freelance">Freelance</option>
                </select>

                <label>Enter Years of Experience (Optional)</label>
                <input
                  type="number"
                  min="0"
                  className="form-control mb-3"
                  placeholder="Years Of Experience"
                  name="years_of_experience"
                  value={formik.values.years_of_experience}
                  onChange={formik.handleChange}
                />

                <label>Enter Expected Salary (Optional)</label>
                <input
                  type="number"
                  min="0"
                  className="form-control mb-3"
                  placeholder="Expected Salary"
                  name="expected_salary"
                  value={formik.values.expected_salary}
                  onChange={formik.handleChange}
                />

                <button
                  type="submit"
                  className="Btn mt-4 "
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