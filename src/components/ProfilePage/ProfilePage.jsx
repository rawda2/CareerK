import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
  ListGroup,
  ProgressBar,
} from "react-bootstrap";
import "./ProfilePage.css";
import { Link } from "react-router-dom";

import work from "./../../assets/work.png";
import card from "./../../assets/MasterCard.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Profile from "../Profile/Profile";

const ProfilePage = () => {
  const [courses, setCourses] = useState([]);
  const [jobs1, setJobs] = useState([]);
  const [services, setServices] = useState([]);

  const [saved, setSavedJobs] = useState([]);
  const [error, setError] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;
  const [loading,setLoading]=useState(false)
  const token = localStorage.getItem("token");
  console.log(token);
  let [current, setCurrent] = useState("profile");

  function handleCurrent(current) {
    setCurrent(current);
  }

  const [showPopup, setShowPopup] = useState(false);

  const togglePayPopup = () => {
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/developer/my-applications`,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",

              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(
          "API Response Applications:",
          response.data.job_applications
        );
        setJobs(response.data.job_applications);

        setServices(response.data.service_applications);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch jobs. Please try again later.");
        setJobs([]);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/courses-page/courses/ongoing`,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",

              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("API Courses:", response.data);
        setCourses(response.data);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch Courses. Please try again later.");
      }
    };
    fetchCourses();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "badge ms-0  active";
      case "accepted":
        return "badge ms-0 success";
      case "rejected":
        return "badge ms-0 danger";
      default:
        return "badge  secondary";
    }
  };
  const handleWithdraw = async (applicationId) => {
    try {
      const response = await axios.delete(
        `${API_URL}/job-application/${applicationId}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Deleted successfully:", response.data);
      toast.success("Application Deleted  successfully");

      // Update the UI by removing the withdrawn job
      setJobs((prevJobs) =>
        prevJobs.filter((job) => job.application_id !== applicationId)
      );
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };
  useEffect(() => {
    const getSaved = async () => {
      try {
        const response = await axios.get(`${API_URL}/bookmarks`, {
          headers: {
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Saved Jobs:", response.data);
        setSavedJobs(response.data);
      } catch (error) {
        console.error("Error get save jobs:", error);
      }
    };
    getSaved();
  }, []);
  const handleUnSaved = async (post_id) => {
    try {
      const response = await axios.patch(
        `${API_URL}/bookmarks/${ post_id}`,
        { },
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("UNSaved successfully:", response.data.message);

      // Update the saved jobs list by filtering out the unsaved job
      setSavedJobs((prevSaved) =>
        prevSaved.filter((job) => job.post_id !== post_id)
      );

      toast.success("Job unsaved successfully");
    } catch (error) {
      console.error("Error Saving Job:", error);
      toast.error("Failed to unsave job. Please try again.");
    }
  };

  const getCV = async () => {
    const response = await axios.get(`${API_URL}/developer/my-cv`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true",
      },
    });
    console.log(response.data);
  };
  const initialFormData = {
  first_name: "",
  last_name: "",
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
  profile_picture: null,
};

const [formData, setFormData] = useState(initialFormData);
const clearForm = () => {
  setFormData(initialFormData);
};
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formDataToSend = new FormData();
     setLoading(true)
    Object.keys(formData).forEach((key) => {
      if (key === "skills") {
        formDataToSend.append(key, JSON.stringify(formData[key]));
      } else if (formData[key] !== null) {
        formDataToSend.append(key, formData[key]);
      }
    });

    const response = await axios.patch(
      `${API_URL}/developer/edit-profile`,
      formDataToSend,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Axios automatically parses JSON
    console.log("Profile updated successfully:", response.data);
    toast.success("Profile Updated Successfuly")
    clearForm()
     setCurrent("profile")
     setLoading(false)
  } catch (error) {
    if (error.response) {
      console.error("Server error:", error.response.data);
    } else {
      console.error("Unexpected error:", error.message);
    }
  }
   finally {
    setLoading(false); }
    
};

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <section className=" d-flex p-4 justify-content-center gap-0 ">
        {current == "profile" ? <Profile /> : ""}
       {current == "Editprofile" ? (
  <Container className="profile-page w-75 mt-1">
    <Card className="mb-4 card rounded-4 p-4">
      <Card.Body>
        <Card.Title>Personal Information</Card.Title>
        <Form className="form py-4 position-relative" onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="firstName" className="d-flex gap-2">
                <Form.Group className="w-50">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    className="rounded-3"
                    type="text"
                    placeholder="First Name"
                    value={formData.first_name}
                    onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                  />
                </Form.Group>
                <Form.Group className="w-50">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    className="rounded-3"
                    type="text"
                    placeholder="Last Name"
                    value={formData.last_name}
                    onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                  />
                </Form.Group>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="phoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  className="rounded-3"
                  type="text"
                  placeholder="Phone Number"
                  value={formData.phone_number}
                  onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  className="rounded-3"
                  type="text"
                  placeholder="Country"
                  value={formData.country}
                  onChange={(e) => setFormData({...formData, country: e.target.value})}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  className="rounded-3"
                  type="text"
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  className="rounded-3"
                  type="text"
                  placeholder="Address"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" className="btnn float-end  text-light" type="submit">
            {loading?"Saving.....":"Save"}
          </Button>
        </Form>
      </Card.Body>
    </Card>

    <Card className="mb-4 card rounded-4 p-4">
      <Card.Body>
        <Card.Title>Professional Information</Card.Title>
        <Form className="form py-4 position-relative" onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="currentTrack">
                <Form.Label>Current Track</Form.Label>
                <Form.Control
                  className="rounded-3"
                  type="text"
                  placeholder="Current Track"
                  value={formData.current_track}
                  onChange={(e) => setFormData({...formData, current_track: e.target.value})}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="trackLevel">
                <Form.Label>Track Level</Form.Label>
                <Form.Control
                  className="rounded-3"
                  as="select"
                  value={formData.track_level}
                  onChange={(e) => setFormData({...formData, track_level: e.target.value})}
                >
                  <option value="">Select Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="previousJob">
                <Form.Label>Previous Job</Form.Label>
                <Form.Control
                  className="rounded-3"
                  type="text"
                  placeholder="Previous Job"
                  value={formData.previous_job}
                  onChange={(e) => setFormData({...formData, previous_job: e.target.value})}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="jobType">
                <Form.Label>Type of Job</Form.Label>
                <Form.Control
                  className="rounded-3"
                  as="select"
                  value={formData.type_of_job}
                  onChange={(e) => setFormData({...formData, type_of_job: e.target.value})}
                >
                  <option value="">Select Job Type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Internship">Internship</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="experience">
                <Form.Label>Years of Experience</Form.Label>
                <Form.Control
                  className="rounded-3"
                  type="number"
                  placeholder="Years of Experience"
                  value={formData.years_of_experience}
                  onChange={(e) => setFormData({...formData, years_of_experience: e.target.value})}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="expectedSalary">
                <Form.Label>Expected Salary</Form.Label>
                <Form.Control
                  className="rounded-3"
                  type="number"
                  placeholder="Expected Salary"
                  value={formData.expected_salary}
                  onChange={(e) => setFormData({...formData, expected_salary: e.target.value})}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button  className="btnn float-end" type="submit">
            Save
          </Button>
        </Form>
      </Card.Body>
    </Card>

    <Card className="mb-4 card rounded-4 p-4">
      <Card.Body>
        <Card.Title>About Me</Card.Title>
        <Form className="form py-4 position-relative" onSubmit={handleSubmit}>
          <Form.Group controlId="description">
            <Form.Label>Brief Bio</Form.Label>
            <Form.Control
              className="rounded-3 w-75"
              as="textarea"
              rows={3}
              placeholder="Write your brief bio"
              value={formData.brief_bio}
              onChange={(e) => setFormData({...formData, brief_bio: e.target.value})}
            />
          </Form.Group>
          <Form.Group controlId="skills" className="mt-3">
            <Form.Label>Skills (comma separated)</Form.Label>
            <Form.Control
              className="rounded-3 w-75"
              type="text"
              placeholder="e.g., JavaScript, Python, React"
              value={formData.skills.join(', ')}
              onChange={(e) => setFormData({...formData, skills: e.target.value.split(',').map(skill => skill.trim())})}
            />
          </Form.Group>
          <Button  className="btnn float-end mt-3" type="submit">
            Save
          </Button>
        </Form>
      </Card.Body>
    </Card>

    <Card className="mb-4 card rounded-4 p-4">
      <Card.Body>
        <Card.Title>Upload CV</Card.Title>
        <Form className="form py-4 position-relative" onSubmit={handleSubmit}>
          <Form.Group controlId="cvUpload">
            <Form.Label>Upload your CV (PDF)</Form.Label>
            <Form.Control
              className="rounded-3 w-75"
              type="file"
              accept=".pdf"
              onChange={(e) => setFormData({...formData, uploaded_cv: e.target.files[0]})}
            />
          </Form.Group>
          <Button  className="btnn float-end mt-3" type="submit">
            Upload
          </Button>
        </Form>
      </Card.Body>
    </Card>

    <Card className="mb-4 card rounded-4 p-4">
      <Card.Body>
        <Card.Title>Profile Picture</Card.Title>
        <Form className="form py-4 position-relative" onSubmit={handleSubmit}>
          <Form.Group controlId="profilePicture">
            <Form.Label>Upload Profile Picture</Form.Label>
            <Form.Control
              className="rounded-3 w-75"
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({...formData, profile_picture: e.target.files[0]})}
            />
          </Form.Group>
          <Button  className="btnn float-end mt-3" type="submit">
            Upload
          </Button>
        </Form>
      </Card.Body>
    </Card>
  </Container>
) : (
  ""
)}
        {current == "courses" ? (
          <Container className="my-courses  w-75 mt-1">
            <Card className="mb-4 py-4 px-3">
              <Card.Body>
                <Card.Title className="mb-3">My Courses</Card.Title>
                <ListGroup>
                  {courses.map((course, index) => (
                    <ListGroup.Item
                      key={index}
                      className="course-item  rounded-3 px-0 mb-5 d-flex align-items-center "
                    >
                      <Row>
                        <Col md={5}>
                          <img
                            src={course.image_url}
                            alt={course.name}
                            className="course-image  w-100"
                          />
                        </Col>
                        <Col md={7}>
                          <div className="course-details p-4">
                            <h5>{course.name}</h5>
                            <p className="p">{course.last_accessed_at}</p>
                            <span
                              className={`span d-flex justify-content-center align-items-center m-4 p-2 rounded-5 position-absolute top-0 end-0 px-3 special_button`}
                            >
                              {course.difficulty}
                            </span>

                            <p>
                              <i className="fa-solid fa-play span mb-3 p-3 rounded-circle"></i>
                              {course.description}{" "}
                            </p>
                            <ProgressBar
                              now={course.progress_percentage || 30}
                              label={`${course.progress_percentage || 30}%`}
                            />
                          </div>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Container>
        ) : (
          ""
        )}
        {current === "jobs" ? (
          <Container className="saved-jobs w-75">
            <Card className="mb-4">
              <Card.Body>
                <Card.Title className="m-3">Saved Jobs</Card.Title>
                <ListGroup variant="flush">
                  {saved.map((job, index) => (
                    <ListGroup.Item key={index} className="job-item">
                      <Row className=" position-relative">
                        <Col md={2}>
                          <div className="company-logo">
                            <img
                              src={work}
                              alt="Company Logo"
                              className="logo-image"
                            />
                          </div>
                        </Col>
                        <Col md={7}>
                          <div className="job-details">
                            <h5>{job.title || "Untitled Job"}</h5>
                            <p className=" d-flex">
                              <h6 className=" i">Job Type : </h6> {job.job_type}
                            </p>
                            <p className=" d-flex">
                              <h6 className=" i">Location : </h6> {job.location}
                            </p>
                            <p className=" d-flex flex-column">
                              <h6 className=" i">Required Skills : </h6>{" "}
                              {Array.isArray(job.skills)
                                ? job.skills.join(" ,  ")
                                : "Not specified"}
                            </p>

                            <p>
                              <small className=" d-flex">
                                <h6 className="i">Created : </h6>{" "}
                                {new Date(job.created_at).toLocaleString()}
                              </small>
                            </p>
                          </div>
                        </Col>
                        <Col
                          md={3}
                          className=" position-relative d-flex justify-content-between flex-column"
                        >
                          <div className="job-info text-start">
                            <h6 className="i">Post Type</h6>

                            <p>{job.post_type}</p>
                            <h6 className="i">Salary </h6>

                            <p> {job.salary_range}</p>
                          </div>
                          <button className="Btn mb-3">
                            <Link
                              className=" text-decoration-none"
                              to={`/fill/${job.id}`}
                            >
                              Apply This
                            </Link>{" "}
                          </button>

                          <i
                            className=" fa-bookmark i fa-solid position-absolute "
                            onClick={() => handleUnSaved(job.post_id)}
                          ></i>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Container>
        ) : null}

        {current === "applied" ? (
          <Container className="saved-jobs w-75">
            <Card className="mb-4">
              <Card.Body>
                <Card.Title className="m-3">Applied Jobs</Card.Title>
                <ListGroup variant="flush">
                  {jobs1.map((job, index) => (
                    <ListGroup.Item
                      key={index}
                      className="job-item  py-5 border-bottom"
                    >
                      <Row>
                        <Col md={2}>
                          <div className="company-logo mt-3">
                            <img
                              src={work}
                              alt={job.company_name}
                              className="logo-image"
                            />
                          </div>
                        </Col>
                        <Col md={7}>
                          <div className="job-details mt-3">
                            <h4>{job.job_post.title}</h4>
                            <h5>{job.job_post.company.company_name}</h5>
                            <p>{job.title}</p>
                            <button className="special_button me-2">
                              {job.job_post.experience_required} Yrs Exp
                            </button>
                            <span className={getStatusClass(job.status)}>
                              {job.status}
                            </span>
                            <p>
                              <small>
                                Applied on :{" "}
                                {new Date(job.applied_at).toLocaleDateString()}
                              </small>
                            </p>
                          </div>
                        </Col>
                        <Col md={3}>
                          <div className="job-info text-start">
                            <h6 className="i">Expected Salary </h6>

                            <p className="salary special">
                              <span>{job.job_post.salary_range}$</span>{" "}
                              <span className="light">/Year</span>
                            </p>
                            <div className="action d-flex flex-column gap-3">
                              <button
                                target="_blank"
                                onClick={() => {
                                  getCV();
                                }}
                                className=" text-center Btn text-decoration-none"
                              >
                                View CV
                              </button>
                              <button className="rounded py-2 btn-outline-danger text-danger">
                                <i className=" fa-solid fa-trash text-danger me-3"></i>
                                <Link
                                  onClick={() =>
                                    handleWithdraw(job.application_id)
                                  }
                                  className=" link text-danger"
                                >
                                  Withdraw
                                </Link>
                              </button>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Container>
        ) : (
          ""
        )}

        {current == "pay" ? (
          <Container className="my-4 p-5 bg-white border rounded w-75 position-relative ">
            <h3 className="mx-auto mb-3">Payment Cards</h3>
            <Row className="mb-4 d-flex justify-content-center">
              <Col md={5}>
                <Card className="mb-4 py-4 card1">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="font-weight-bold">ADRBank</span>
                      <i class="fa-solid fa-ellipsis me-3 fa-xl"></i>
                    </div>
                    <Card.Text className="mb-3 font-weight-bold">
                      8763 2736 9873 0329
                    </Card.Text>
                    <div className="d-flex justify-content-between align-items-end">
                      <div>
                        <div className="">Card Holder Name</div>
                        <div className="font-weight-bold">HILLERY NEVELIN</div>
                      </div>
                      <div>
                        <div className="">Expired Date</div>
                        <div className="font-weight-bold">10/28</div>
                      </div>
                      <img
                        src={card}
                        alt="mastercard"
                        className="img-fluid"
                        style={{ width: "60px" }}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={5}>
                <Card className="mb-4 py-4 card2">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="font-weight-bold">ADRBank</span>
                      <i class="fa-solid fa-ellipsis me-3 fa-xl"></i>
                    </div>
                    <Card.Text className="mb-3 font-weight-bold">
                      8763 2736 9873 0329
                    </Card.Text>
                    <div className="d-flex justify-content-between align-items-end">
                      <div>
                        <div className="">Card Holder Name</div>
                        <div className="font-weight-bold">HILLERY NEVELIN</div>
                      </div>
                      <div>
                        <div className="">Expired Date</div>
                        <div className="font-weight-bold">10/28</div>
                      </div>
                      <img
                        src={card}
                        className="img-fluid"
                        style={{ width: "60px" }}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Button className="float-right" onClick={togglePayPopup}>
              Add Card
            </Button>
          </Container>
        ) : (
          ""
        )}

        <Container className="aside mt-4 shadow py-3 rounded-4">
          <Card className="profile-menu">
            <ListGroup variant="menu">
              <Link
                className={`menu-item rounded-2 mb-2 main ${
                  current === "profile" ? "active" : ""
                }`}
                onClick={() => handleCurrent("profile")}
              >
                <i className="fa-solid fa-user bg-transparent p-0 text-light"></i>{" "}
                Profile
              </Link>

              <Link
                className={`menu-item rounded-2 mb-2 ${
                  current === "Editprofile" ? "active" : ""
                }`}
                onClick={() => handleCurrent("Editprofile")}
              >
                <i className="fa-solid fa-user"></i> Edit Profile
              </Link>

              <Link
                className={`menu-item rounded-2 mb-2 ${
                  current === "courses" ? "active" : ""
                }`}
                onClick={() => handleCurrent("courses")}
              >
                <i className="fa-solid fa-book-open"></i> My Courses
              </Link>

              <Link
                className={`menu-item rounded-2 mb-2 ${
                  current === "jobs" ? "active" : ""
                }`}
                onClick={() => handleCurrent("jobs")}
              >
                <i className="fa-solid fa-bookmark"></i> Saved Jobs
              </Link>

              <Link
                className={`menu-item rounded-2 mb-2 ${
                  current === "applied" ? "active" : ""
                }`}
                onClick={() => handleCurrent("applied")}
              >
                <i className="fa-solid fa-check-double"></i> My Applications
              </Link>

              <Link
                className={`menu-item rounded-2 mb-2 ${
                  current === "pay" ? "active" : ""
                }`}
                onClick={() => handleCurrent("pay")}
              >
                <i className="fa-solid fa-credit-card"></i> Payment Options
              </Link>
            </ListGroup>
          </Card>
        </Container>
        {showPopup && (
          <div className="overlay">
            <div className="add-card-popup p-4 rounded-4 shadow position-relative text-start">
              <div className="title d-flex justify-content-between">
                <h4>Add Card</h4>
                <i className="fa-solid fa-xmark" onClick={togglePayPopup}></i>
              </div>
              <div className="main d-flex justify-content-center align-items-center flex-column">
                <div className="row mb-3">
                  <div className="col">
                    <label className="form-label">cvc</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Cvc"
                    />
                  </div>
                  <div className="col">
                    <label className="form-label">Expire Date</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="1234"
                    />
                  </div>
                </div>
                <div className="mb-3 w-100">
                  <label className="form-label">Card Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Card Name"
                  />
                </div>
                <div className="mb-3 w-100">
                  <label className="form-label">Card Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="8255 5214 5111 4567"
                  />
                </div>
              </div>
              <button className="btn btn-primary float-right">Save</button>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default ProfilePage;
