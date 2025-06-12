import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
  Badge,
  ListGroup,
  ProgressBar,
} from "react-bootstrap";
import "./ProfilePage.css";
import { Link } from "react-router-dom";
import image1 from "./../../assets/1.png";
import image2 from "./../../assets/2.png";
import image3 from "./../../assets/3.png";
import image4 from "./../../assets/5.png";
import image5 from "./../../assets/6.png";
import image6 from "./../../assets/7.png";
import work from "./../../assets/work.png";
import card from "./../../assets/MasterCard.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const ProfilePage = () => {
  const [jobs1, setJobs] = useState([]);
  const [saved, setSavedJobs] = useState([]);
  const [error, setError] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  const token = localStorage.getItem("token");
  console.log(token);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/job-applications/my-applications`,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",

              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("API Response:", response.data);
        setJobs(response.data.applications);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch jobs. Please try again later.");
        setJobs([]);
      }
    };
    fetchJobs();
  }, []);
  let [current, setCurrent] = useState("profile");

  function handleCurrent(current) {
    setCurrent(current);
  }

  const courses = [
    {
      id: 1,
      title: "Introduction to React",
      description: "Learn the basics of React and build your first app.",
      instructor: "John Doe",
      price: 99,

      progress: 30,
      duration: "4 weeks",
      image: image1, // Replace with real image URL
      category: "Web Development",
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      description: "Master advanced JavaScript concepts and techniques.",
      instructor: "Jane Smith",
      price: 149,
      progress: 70,
      duration: "6 weeks",
      image: image2, // Replace with real image URL
      category: "Web Development",
    },
    {
      id: 3,
      title: "Node.js for Beginners",
      description:
        "Get started with Node.js and build scalable backend applications.",
      instructor: "Alice Johnson",
      price: 129,
      progress: 90,
      duration: "5 weeks",
      image: image3, // Replace with real image URL
      category: "Backend Development",
    },
    {
      id: 4,
      title: "Python for Data Science",
      description: "Learn Python and its applications in data science.",
      instructor: "Bob Brown",
      price: 199,
      progress: 100,
      duration: "8 weeks",
      image: image4, // Replace with real image URL
      category: "Data Science",
    },
    {
      id: 5,
      title: "Advanced JavaScript",
      description: "Master advanced JavaScript concepts and techniques.",
      instructor: "Jane Smith",
      price: 149,
      progress: 20,
      duration: "6 weeks",
      image: image5, // Replace with real image URL
      category: "Web Development",
    },
    {
      id: 6,
      title: "Introduction to React",
      description: "Learn the basics of React and build your first app.",
      instructor: "John Doe",
      price: 99,

      progress: 30,
      duration: "4 weeks",
      image: image6, // Replace with real image URL
      category: "Web Development",
    },
  ];

  const [showPopup, setShowPopup] = useState(false);

  const togglePayPopup = () => {
    setShowPopup(!showPopup);
  };

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
        `${API_URL}/job-applications/withdraw/${applicationId}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Deleted successfully:", response.data);

      // Update the UI by removing the withdrawn job
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== applicationId));
    } catch (error) {
      console.error("Error deleting application:", error);
      alert("Failed to withdraw application. Please try again.");
    }
  };
  useEffect(() => {
    const getSaved = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/developer-profile/bookmarks`,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Saved Jobs:", response.data);
        setSavedJobs(response.data);
      } catch (error) {
        console.error("Error deleting application:", error);
        alert("Failed to Get Saved Jobs. Please try again.");
      }
    };
    getSaved();
  }, []);
  const handleUnSaved = async (post_id) => {
    try {
      const response = await axios.post(
        `${API_URL}/developer-profile/bookmark`,
        { post_id },
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
        {current == "profile" ? (
          <Container className="profile-page w-75 mt-1">
            <Card className="mb-4 card rounded-4 p-4">
              <Card.Body>
                <Card.Title>Personal Information</Card.Title>
                <Form className="form py-4 position-relative">
                  <Row className="mb-3">
                    <Col>
                      <Form.Group
                        controlId="firstName"
                        className=" d-flex gap-2 "
                      >
                        <Form.Group className=" w-50">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            className=" rounded-3"
                            type="text"
                            placeholder="First Name"
                          />
                        </Form.Group>
                        <Form.Group className=" w-50">
                          <Form.Label>Family Name</Form.Label>
                          <Form.Control
                            className=" rounded-3"
                            type="text"
                            placeholder="Family Name"
                          />
                        </Form.Group>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                          className=" rounded-3"
                          type="email"
                          placeholder="Email@Gmail.Com"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <Form.Group controlId="phoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          className=" rounded-3"
                          type="text"
                          placeholder="Address"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="gender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control className=" rounded-3" as="select">
                          <option>Male</option>
                          <option>Female</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="location" className=" w-50">
                        <Form.Label>Location</Form.Label>
                        <Form.Control className=" rounded-3" as="select">
                          <option>Location 1</option>
                          <option>Location 2</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="primary" className="Btn">
                    Save
                  </Button>
                </Form>
              </Card.Body>
            </Card>

            <Card className="mb-4 card rounded-4 p-4">
              <Card.Body>
                <Card.Title>About Me</Card.Title>
                <Form className="form py-4 position-relative">
                  <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      className=" rounded-3 w-75"
                      as="textarea"
                      rows={3}
                      placeholder="Write your description"
                    />
                  </Form.Group>
                  <Button variant="primary" className=" Btn">
                    Save
                  </Button>
                </Form>
              </Card.Body>
            </Card>

            <Card className="mb-4 card rounded-4 p-4">
              <Card.Body>
                <Card.Title>Services</Card.Title>
                <Form className="form py-4 position-relative">
                  <Form.Group controlId="services">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      className=" rounded-3 w-75"
                      as="textarea"
                      rows={3}
                      placeholder="Write your Services"
                    />
                  </Form.Group>
                  <Button variant="primary" className=" Btn">
                    Save
                  </Button>
                </Form>
              </Card.Body>
            </Card>

            <Card className="mb-4 card rounded-4 p-4">
              <Card.Body>
                <Card.Title>Change Password</Card.Title>
                <Form className="form py-4 position-relative">
                  <Row className="mb-3">
                    <Col>
                      <Form.Group controlId="currentPassword">
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control
                          className=" rounded-3"
                          type="password"
                          placeholder="**********"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="newPassword">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                          className=" rounded-3"
                          type="password"
                          placeholder="**********"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group
                        controlId="confirmNewPassword"
                        className=" w-50"
                      >
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control
                          className=" rounded-3"
                          type="password"
                          placeholder="**********"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="primary" className="Btn">
                    Save
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
                        <Col md={4}>
                          <img
                            src={course.image}
                            alt={course.title}
                            className="course-image "
                          />
                        </Col>
                        <Col md={8}>
                          <div className="course-details p-4">
                            <h5>{course.title}</h5>
                            <p className="p">{course.duration}</p>
                            <span className="span d-flex justify-content-center align-items-center m-4 p-2 rounded-5 position-absolute top-0 end-0 px-3">
                              {course.category}
                            </span>
                            <p>
                              <i className="fa-solid fa-play span mb-3 p-3 rounded-circle"></i>
                              <strong>Next Class</strong> {course.description}
                            </p>
                            <ProgressBar
                              now={course.progress}
                              label={`${course.progress}%`}
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
                            <p className=" d-flex"><h6 className=" i">Job Type : </h6> {job.job_type}</p>
                            <p className=" d-flex"><h6 className=" i">Location : </h6> {job.location}</p>
                            <p className=" d-flex">
                              <h6 className=" i">Required Skills : </h6>{" "}
                              {Array.isArray(job.skills)
                                ? job.skills.join(", ")
                                 :  "Not specified"}
                            </p>

                            <p>
                              <small className=" d-flex">
                                <h6 className="i">Created : </h6>{" "}
                                {new Date(job.created_at).toLocaleString()}
                              </small>
                            </p>
                          </div>
                        </Col>
                        <Col md={3} className=" position-relative">
                          <div className="job-info text-start">
                            <h6 className="i">Post Type</h6>

                            <p>{job.post_type}</p>
                            <h6 className="i">Salary </h6>

                            <p> {job.salary_range}</p>

                          </div>
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
        )  :  null}

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
                            <h5>{job.company_name}</h5>
                            <p>{job.title}</p>
                            <button className="special_button me-2">
                              {job.years_of_experience} Yrs Exp
                            </button>
                            <span className={getStatusClass(job.status)}>
                              {job.status}
                            </span>
                            <p>
                              <small>
                                Applied on : {" "}
                                {new Date(job.created_at).toLocaleDateString()}
                              </small>
                            </p>
                          </div>
                        </Col>
                        <Col md={3}>
                          <div className="job-info text-start">
                            <h6 className="i">Expected Salary </h6>

                            <p className="salary special">
                              <span>{job.expected_salary}$</span>{" "}
                              <span className="light">/Year</span>
                            </p>
                            <div className="action d-flex flex-column gap-3">
                              <a
                                href={job.uploaded_cv}
                                target="_blank"
                                download
                                className=" text-center Btn text-decoration-none"
                                rel="noreferrer"
                              >
                                View CV
                              </a>
                              <button className="rounded py-2 btn-outline-danger text-danger">
                                <i className=" fa-solid fa-trash text-danger me-3"></i>
                                <Link
                                  onClick={() => handleWithdraw(job.id)}
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
                className="menu-item rounded-2 mb-2"
                onClick={() => handleCurrent("profile")}
              >
                <i className="fa-solid fa-user"></i> Edit Profile
              </Link>
              <Link
                className="menu-item rounded-2 mb-2"
                onClick={() => handleCurrent("courses")}
              >
                <i className="fa-solid fa-book-open"></i> My Courses
              </Link>
              <Link
                className="menu-item rounded-2 mb-2"
                onClick={() => handleCurrent("jobs")}
              >
                <i className="fa-solid fa-bookmark"></i> Saved Jobs
              </Link>
              <Link
                className="menu-item rounded-2 mb-2"
                onClick={() => handleCurrent("applied")}
              >
                <i className="fa-solid fa-check-double"></i> My Applications
              </Link>
              <Link
                className="menu-item rounded-2 mb-2"
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
