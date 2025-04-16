import React, { useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import "./Application.css";
import { Link } from "react-router-dom";
export default function Application() {
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [formNo, SetFormNO] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    phone: "",
    figmaExperience: "",
    illustratorExperience: "",
    gpa: "",
    germanGpa: "",
    graduationYear: "",
  });

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    }
  };

  const handleForm = () => {
    SetFormNO((prevFormNo) => prevFormNo + 1);
    setProgress((prevProgress) => prevProgress + Math.round(100 / 3));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const back = () => {
    if (formNo > 0) {  // Prevent going below 0
      SetFormNO((prevFormNo) => prevFormNo - 1);
      setProgress((prevProgress) => prevProgress - Math.round(100 / 3));
    }
  };

  return (
    <>
      <section className="body py-5 d-flex flex-column align-items-center position-relative">
      <i className="fa-solid fa-arrow-left position-absolute" onClick={back} style={{ cursor: "pointer" }}></i>        <header className="d-flex pe-2 justify-content-between w-50 mb-4">

          <h4> Apply for company name</h4>
          <i className="fa-solid fa-x" onClick={back}></i>
        </header>
        <div className="bar d-flex align-items-center w-50">
          <ProgressBar
            now={progress}
            className="flex-grow-1"
            style={{ height: "10px" }}
          />
          <p className="mt-0 ms-3 mb-0">{progress}%</p>
        </div>
        <div className="form mt-3 d-flex w-50 flex-column justify-content-start text-start py-5">
          {formNo === 0 && (
            <form className="d-flex position-relative flex-column gap-2 mt-2">
              <h5>Contact Information</h5>
              <div className="input d-flex flex-column w-100">
                <label>Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
              </div>
              <div className="input d-flex flex-column w-100">
                <label>Full Name</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
              </div>
              <div className="input d-flex flex-column w-100">
                <label>Phone Number</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
              </div>
              <button type="button" className="next" onClick={handleForm}>
                Next
              </button>
            </form>
          )}
          {formNo === 1 && (
            <form className="d-flex position-relative flex-column gap-2 mt-2">
              <h5>Upload Resume</h5>
              <div className="input-wrapper">
                <div className="drop-zone">
                  <p>{fileName ? fileName : "Drop your file here or click upload"}</p>
                  <label htmlFor="cv" className="upload-btn">upload</label>
                  <input type="file" name="cv" id="cv" className="cv-input" onChange={handleFileChange} />
                </div>
              </div>
              <button type="button" className="next" onClick={handleForm}>
                Next
              </button>
            </form>
          )}
          {formNo === 2 && (
            <form className="d-flex position-relative flex-column gap-2 mt-2">
              <h5>Additional Questions</h5>
              <div className="input d-flex flex-column w-100">
                <label>How many years of work experience do you have with Figma?</label>
                <input type="number" name="figmaExperience" value={formData.figmaExperience} onChange={handleChange} />
              </div>
              <div className="input d-flex flex-column w-100">
                <label>How many years of work experience do you have with Adobe Illustrator?</label>
                <input type="number" name="illustratorExperience" value={formData.illustratorExperience} onChange={handleChange} />
              </div>
              <div className="input d-flex flex-column w-100">
                <label>What's your GPA? (If German scale, write 0)</label>
                <input type="number" name="gpa" value={formData.gpa} onChange={handleChange} />
              </div>
              <div className="input d-flex flex-column w-100">
                <label>What's your GPA in German scale? (If not German scale, write 0)</label>
                <input type="number" name="germanGpa" value={formData.germanGpa} onChange={handleChange} />
              </div>
              <div className="input d-flex flex-column w-100">
                <label>When is your graduation year?</label>
                <input type="number" name="graduationYear" value={formData.graduationYear} onChange={handleChange} />
              </div>
              <button type="button" className="next d-flex justify-content-center" onClick={handleForm}>
                Preview
              </button>
            </form>
          )}
          {formNo === 3 && (
            <div className="preview position-relative">
              <h5> Review Your Application</h5>
              <div className="d-flex rounded-4 p-4 position-relative flex-column gap-2 mt-2">
              <h6><strong>Contact Information</strong> </h6>
              <p className=" d-flex flex-column"> <label htmlFor="">Name:</label>  {formData.fullName}</p>
              <p className=" d-flex flex-column"> <label htmlFor="">Phone Country Code:</label> Egypt (+20)</p>
              <p className=" d-flex flex-column"> <label htmlFor="">Mobile Phone Number:</label> {formData.phone}</p>
              <p className=" d-flex flex-column"> <label htmlFor="">Email Address:</label> {formData.email}</p>
              
              <h6><strong>Upload Resume</strong> </h6>
              <p className=" d-flex flex-column"> <label htmlFor="">File Name:</label> {fileName ? fileName : "No file uploaded"}</p>

              <h6><strong>Additional Information</strong> </h6>
              <p className=" d-flex flex-column"> <label htmlFor="">How Many Years Of Work Experience Do You Have With Figma?</label> {formData.figmaExperience}</p>
              <p className=" d-flex flex-column"> <label htmlFor="">How Many Years Of Work Experience Do You Have With Adobe Illustrator?</label> {formData.illustratorExperience}</p>
              <p className=" d-flex flex-column"> <label htmlFor="">What's Your GPA?</label> {formData.gpa}</p>
              <p className=" d-flex flex-column"> <label htmlFor="">What's Your GPA In German Scale?</label> {formData.germanGpa}</p>
              <p className=" d-flex flex-column"> <label htmlFor="">Graduation Year:</label> {formData.graduationYear}</p>
              
            </div>
            <button type="button" className="next d-flex justify-content-center " onClick={()=>{setProgress(100);SetFormNO(4)}}>
                Submit
              </button>
            </div>
          )}
          {formNo===4&&(
           <div className="submit py-5 gap-3 d-flex flex-column justify-content-center align-items-center">
            <i className=" fa-solid fa-circle-check text-success"></i>
            <h5><strong>"Application Submitted successfully."</strong> </h5>
            <button type="button" className="Btn d-flex justify-content-center" onClick={handleForm}>
               <Link to={'/jops'} className=" text-decoration-none link">Explor Jops</Link>
              </button>
           </div>
          )}
        </div>
      </section>
    </>
  );
}
