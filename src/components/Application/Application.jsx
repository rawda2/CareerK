
import { useState,useEffect } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import "./Application.css";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { useParams } from "react-router-dom";
import * as Yup from "yup";


export default function Application() {
  const { id } = useParams();
  const [progress, setProgress] = useState(0);
  const [formNo, SetFormNO] = useState(0);
  const url = import.meta.env.VITE_API_URL;
  let token=localStorage.getItem("token")
const [errorMessage, setErrorMessage] = useState("");

    const isServiceApplication = location.pathname.includes("/apply-service");

 useEffect(() => {
    // Fetch job details using the id if needed
    console.log("Applying for job ID:", id);
  }, [id]);
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      years_of_experience: "",
      expected_salary: "",
      uploaded_cv: null,
      email:""
    },
    validationSchema: Yup.object({
    name: Yup.string().required("Name is required"),
    phone: Yup.string().required("Phone is required"),
    years_of_experience: Yup.number()
      .typeError("Must be a number")
      .required("Experience is required"),
    expected_salary: Yup.number()
      .typeError("Must be a number")
      .required("Salary is required"),
    uploaded_cv: Yup.mixed().required("CV is required"),
    email: isServiceApplication
      ? Yup.string()
          .email("Invalid email format")
          .required("Email is required for service applications")
      : Yup.string(),
  }),
   onSubmit: async (values) => {
  try {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("phone", values.phone);
    formData.append("years_of_experience", values.years_of_experience);
    formData.append("expected_salary", values.expected_salary);
    formData.append("uploaded_cv", values.uploaded_cv);

    if (isServiceApplication) {
      formData.append("service_post_id", id);
      formData.append("email", values.email);

    }

    const response = await axios.post(
      `${url}/${isServiceApplication ? "service-application/apply" : `job-application/apply/${id}`}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Success:", response.data);
    setProgress(100);
    SetFormNO(2);
  } catch (error) {
    console.error("Error submitting form:", error);
    if (error.response?.data?.message) {
      setErrorMessage(error.response.data.message);
    } else {
      setErrorMessage("Something went wrong. Please try again.");
    }
  }
},


  });

  const handleCVUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size <= 5 * 1024 * 1024) {
        // 5MB limit
        formik.setFieldValue("uploaded_cv", file);
      } else {
        alert("CV file is too large. Max size is 5MB.");
        e.target.value = ""; // Reset the input
      }
    }
  };

  const handleForm = () => {
    SetFormNO((prevFormNo) => prevFormNo + 1);
    setProgress((prevProgress) => prevProgress + Math.round(100 / 2));
  };

  const back = () => {
    if (formNo > 0 && progress > 0) {
      // Prevent going below 0
      SetFormNO((prevFormNo) => prevFormNo - 1);
      setProgress((prevProgress) => prevProgress - Math.round(100 / 2));
    }
  };

  return (
    <>
      <section className="body py-5 d-flex flex-column align-items-center position-relative">
        {progress < 100 ? (
          <>
            <i
              className="fa-solid fa-arrow-left mt-3 fa-xl position-absolute"
              onClick={back}
              style={{ cursor: "pointer" }}
            ></i>
            <header className="d-flex pe-2 justify-content-between w-50 mb-4">
              <h4> Apply for company name</h4>
              <Link to={'/jops'} className="i mb-5 
              "><i className="fa-solid fa-x " ></i></Link>
            </header>
            <div className="bar d-flex align-items-center w-50">
              <ProgressBar
                now={progress}
                className="flex-grow-1"
                style={{ height: "10px" }}
              />
              <p className="mt-0 ms-3 mb-0">{progress}%</p>
            </div>
          </>
        ) : (
          ""
        )}

        <div className="form mt-3 d-flex w-50 flex-column justify-content-start text-start py-5">
          
        {errorMessage && (
  <div className="alert alert-danger mt-3" role="alert">
    {errorMessage}
  </div>
)}
          {formNo === 0 && (
            <form className="d-flex position-relative p-3 bg-light flex-column gap-2 mt-2">
              <h5>Contact Information</h5>

              <div className="input bg-light d-flex flex-column w-100">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
              </div>
              {isServiceApplication?<div className="input bg-light d-flex flex-column w-100">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
              </div>:""}
              <div className="input bg-light d-flex flex-column w-100">
                <label>Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="input bg-light d-flex flex-column w-100">
                <label>Years of work experience</label>
                <input
                  type="number"
                  name="years_of_experience"
                  value={formik.values.years_of_experience}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="input bg-light d-flex flex-column w-100">
                <label>Expexted Salary</label>
                <input
                  type="number"
                  name="expected_salary"
                  value={formik.values.expected_salary}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="input bg-light-wrapper">
                <div className="drop-zone">
                  {formik.values.uploaded_cv ? (
                    <span>{formik.values.uploaded_cv.name}</span>
                  ) : (
                    <span>Choose file (PDF, DOC, DOCX)</span>
                  )}{" "}
                  <label htmlFor="uploaded_cv" className="upload-btn">
                    Upload
                  </label>
                  <input
                    type="file"
                    name="uploaded_cv"
                    id="uploaded_cv"
                    className="cv-input"
                    accept=".pdf,.doc,.docx"
                    onChange={handleCVUpload}
                  />
                </div>
              </div>

              <button type="button" className="next" onClick={handleForm}>
                Next
              </button>
            </form>
          )}
          {/* {formNo === 1 && (
            <form className="d-flex position-relative p-3 bg-light flex-column gap-2 mt-2">
              <h5>Upload Resume</h5>
              <div className="input bg-light-wrapper">
                <div className="drop-zone">
                  <p>{fileName ? fileName : "Drop your file here or click upload"}</p>
                  <label htmlFor="cv" className="upload-btn">upload</label>
                  <input type="file" name="cv" id="cv" className="cv-input" onChange={handleFileChange} />
                </div>
              </div>
             <button type="button" className="next d-flex justify-content-center px-4" onClick={handleForm}>
                Preview
              </button>
            </form>
          )} */}

          {/* {formNo === 2 && (
            <form className="d-flex position-relative p-3 flex-column gap-2 mt-2">
              <h5>Additional Questions</h5>
              
              <div className="input bg-light d-flex flex-column w-100">
                <label>How many years of work experience do you have with Adobe Illustrator?</label>
                <input type="number" name="illustratorExperience" value={formData.illustratorExperience} onChange={handleChange} />
              </div>
              <div className="input bg-light d-flex flex-column w-100">
                <label>What's your GPA? (If German scale, write 0)</label>
                <input type="number" name="gpa" value={formData.gpa} onChange={handleChange} />
              </div>
              <div className="input bg-light d-flex flex-column w-100">
                <label>What's your GPA in German scale? (If not German scale, write 0)</label>
                <input type="number" name="germanGpa" value={formData.germanGpa} onChange={handleChange} />
              </div>
              <div className="input bg-light d-flex flex-column w-100">
                <label>When is your graduation year?</label>
                <input type="number" name="graduationYear" value={formData.graduationYear} onChange={handleChange} />
              </div>
              <button type="button" className="next d-flex justify-content-center" onClick={handleForm}>
                Preview
              </button>
            </form>
          )} */}
          {formNo === 1 && (
            <div className="preview position-relative p-3">
              <h5> Review Your Application</h5>
              <div className="d-flex rounded-4 p-4 position-relative flex-column gap-2 mt-2">
                <h6>
                  <strong>Contact Information</strong>{" "}
                </h6>
                <p className=" d-flex flex-column">
                  {" "}
                  <label htmlFor="">Name:</label> {formik.values.name}
                </p>
                <p className=" d-flex flex-column">
                  {" "}
                  <label htmlFor="">Phone Country Code:</label> Egypt (+20)
                </p>
                <p className=" d-flex flex-column">
                  {" "}
                  <label htmlFor="">Mobile Phone Number:</label>{" "}
                  {formik.values.phone}
                </p>
               

                <h6>
                  <strong>Upload Resume</strong>{" "}
                </h6>
                <p className=" d-flex flex-column">
                  {" "}
                  <label htmlFor="">File Name:</label>{" "}
                  {formik.values.uploaded_cv.name}
                </p>

                {/* <h6><strong>Additional Information</strong> </h6>
              <p className=" d-flex flex-column"> <label htmlFor="">How Many Years Of Work Experience Do You Have With Figma?</label> {formData.years_of_expreience}</p>
              <p className=" d-flex flex-column"> <label htmlFor="">How Many Years Of Work Experience Do You Have With Adobe Illustrator?</label> {formData.illustratorExperience}</p>
              <p className=" d-flex flex-column"> <label htmlFor="">What's Your GPA?</label> {formData.gpa}</p>
              <p className=" d-flex flex-column"> <label htmlFor="">What's Your GPA In German Scale?</label> {formData.germanGpa}</p>
              <p className=" d-flex flex-column"> <label htmlFor="">Graduation Year:</label> {formData.graduationYear}</p> */}
              </div>
              <button
                type="button"
                className="next d-flex justify-content-center "
                onClick={() => {
              
                  formik.handleSubmit()
                }}
                disabled={!formik.isValid || !formik.dirty}

              >
                Submit
              </button>
            </div>
          )}


          {formNo === 2 && (
            <div className="submit py-2 gap-3 d-flex flex-column mt-3 align-items-center">
              <i className=" fa-solid fa-circle-check text-success"></i>
              <h5>
                <strong>"Application Submitted successfully."</strong>{" "}
              </h5>
              <button
                type="button"
                className="Btn d-flex justify-content-center"
                onClick={handleForm}
              >
                <Link to={"/jops"} className=" text-decoration-none link">
                  Explor Jobs
                </Link>
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
