import React, { useState } from "react";
import "./SignUp.css";
import Left from "../Left/Left";
import SignUpForm from "./../SignUpForm/SignUpForm";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [formNu, setFormNum] = useState(1); 

  const handleClick = () => {
    setFormNum((prev) => prev + 1); 
  };

  return (
    <>
      <div className="signup ">
        <div className="body d-flex w-100 vh-100">
          {formNu == 1 ? (
            <>
              <SignUpForm onSuccess={handleClick} />
              <Left />
            </>
          ) : (
            ""
          )}
          {formNu == 2 ? (
            <>
              <div className="form2 p-5 w-50">
                <form className="p-5 rounded-3 w-80 d-flex flex-column justify-content-center">
                  <div className="mb-3 ">
                    <label className="form-label">Country</label>
                    <select className="form-select">
                      <option>Country</option>
                    </select>
                  </div>

                  <div className="mb-3 ">
                    <label className="form-label">City</label>
                    <select className="form-select">
                      <option>City</option>
                    </select>
                  </div>

                  <div className="mb-3 ">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Address"
                    />
                  </div>

                  <button className="Btn mb-3 " onClick={() => handleClick()}>
                    Next
                  </button>

                  <div className="text-center mb-3">Already have Account ?</div>

                  <div className="d-flex justify-content-center gap-3">
                    <button className="btn ">
                      <i className=" fa-solid fa-brands fa-xl fa-google"></i>
                    </button>
                    <button className="btn ">
                      <i className=" fa-solid fa-brands fa-xl fa-github"></i>
                    </button>
                  </div>
                </form>
              </div>
              <Left />
            </>
          ) : (
            ""
          )}
          {formNu == 3 ? (
            <>
              <div className="form3 py-5 px-4 w-50">
                <form className="rounded-3 w-80 d-flex flex-column justify-content-center">
                  <h5 className=" text-dark">Bio</h5>
                  <label>Write Down your Bio</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Write Here"
                  />

                  <h5 className=" text-dark">Experience</h5>
                  <label>Write Down your Experience</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Write Here"
                  />

                  <h5 className=" text-dark">Skills</h5>
                  <label>Write Down your skills</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Write Here"
                  />
                  <div className="mb-3">
                    <span className="badge  me-2">UI Design</span>
                    <span className="badge  me-2">Prototyping</span>
                    <span className="badge  me-2">Design Systems</span>
                    <span className="badge  me-2">Interaction Design</span>
                    <span className="badge  me-2">Responsive Design</span>
                    <span className="badge ">Wireframing</span>
                  </div>

                  <h5 className=" text-dark">Courses</h5>
                  <label>Write Down your Course</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Write Here"
                  />
                  <div className="mb-3">
                    <span className="badge  me-2">C#</span>
                    <span className="badge  me-2">HTML</span>
                    <span className="badge  me-2">CSS</span>
                    <span className="badge  me-2">PHP</span>
                    <span className="badge  me-2">JavaScript</span>
                    <span className="badge  me-2">Python</span>
                    <span className="badge ">MySQL</span>
                  </div>

                  <button className="Btn mb-3 " onClick={() => handleClick()}>
                    Next
                  </button>

                  <div className="text-center mb-3">Already have Account ?</div>

                  <div className="d-flex justify-content-center gap-3">
                    <button className="btn ">
                      <i className=" fa-solid fa-brands fa-xl fa-google"></i>
                    </button>
                    <button className="btn ">
                      <i className=" fa-solid fa-brands fa-xl fa-github"></i>
                    </button>
                  </div>
                </form>
              </div>
              <Left />
            </>
          ) : (
            ""
          )}
          {formNu == 4 ? (
            <>
              <div className="form4 py-5 px-4 w-50">
                <form className="rounded-3 px-5 w-80 d-flex flex-column justify-content-center">
                  <label>Enter Your Current Track (Optional)</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Your Current Track"
                  />

                  <label>Enter Track Level (Optional)</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Your Track Level"
                  />

                  <label>Enter Your Previous Work (Optional)</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Your Previous Work"
                  />

                  <label>Enter Type of Job (Optional)</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Your Type Of Job"
                  />

                  <label>Enter Years of Experience (Optional)</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Years Of Experience"
                  />

                  <label>Enter Expected Salary (Optional)</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Expected Salary"
                  />

                  <button className="Btn mb-3 ">
                  <Link className=" text-decoration-none" to={'/login'}>  Sign Up</Link>
                  </button>

                  <div className="text-center mb-3">Already have Account ?</div>

                  <div className="d-flex justify-content-center gap-3">
                    <button className="btn ">
                      <i className=" fa-solid fa-brands fa-xl fa-google"></i>
                    </button>
                    <button className="btn ">
                      <i className=" fa-solid fa-brands fa-xl fa-github"></i>
                    </button>
                  </div>
                </form>
              </div>
              <Left />
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
