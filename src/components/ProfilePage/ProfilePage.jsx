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

const ProfilePage = () => {
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

  const jobs = [
    {
      title: "Senior UX Designer",
      company: "DesignHub Inc.",
      location: "remote",
      team: "Product & Design",
      salary: "$160k",
      time: "15 min ago",
      applied: "8 applied",
      type: "Full-time",
    },
    {
      title: "Frontend Engineer (React)",
      company: "TechNova",
      location: "hybrid",
      team: "Engineering",
      salary: "$150k",
      time: "1 hour ago",
      applied: "12 applied",
      type: "Full-time",
    },
    {
      title: "Digital Marketing Specialist",
      company: "GrowthMasters",
      location: "remote",
      team: "Marketing",
      salary: "$110k",
      time: "2 hours ago",
      applied: "5 applied",
      type: "Contract",
    },
    {
      title: "DevOps Engineer",
      company: "CloudSecure",
      location: "onsite",
      team: "Engineering",
      salary: "$150k",
      time: "3 hours ago",
      applied: "3 applied",
      type: "Full-time",
    },
    {
      title: "Product Manager",
      company: "InnovateCo",
      location: "hybrid",
      team: "Product",
      salary: "$190k",
      time: "5 hours ago",
      applied: "7 applied",
      type: "Full-time",
    },
    {
      title: "Data Scientist",
      company: "AI Labs",
      location: "remote",
      team: "Research",
      salary: "$200k",
      time: "1 day ago",
      applied: "9 applied",
      type: "Full-time",
    },
    {
      title: "Customer Support Rep",
      company: "ServicePlus",
      location: "onsite",
      team: "Operations",
      salary: "$60k",
      time: "1 day ago",
      applied: "20 applied",
      type: "Part-time",
    },
  ];
  const [showPopup, setShowPopup] = useState(false);

  const togglePayPopup = () => {
    setShowPopup(!showPopup);
  };
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const toggleLogoutPopup = () => {
    setShowLogoutPopup(!showLogoutPopup);
  };
  return (
    <>
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
        {current == "jobs" ? (
          <Container className="saved-jobs w-75">
            <Card className="mb-4">
              <Card.Body>
                <Card.Title className=" m-3">Saved Jobs</Card.Title>
                <ListGroup variant="flush" className="">
                  {jobs.map((job, index) => (
                    <ListGroup.Item key={index} className="job-item">
                      <Row>
                        <Col md={2}>
                          <div className="company-logo">
                            <img
                              src={work}
                              alt={job.company}
                              className="logo-image"
                            />
                          </div>
                        </Col>
                        <Col md={7}>
                          <div className="job-details">
                            <h5>{job.title}</h5>
                            <p>{job.company}</p>
                            <button className="special_button me-2">
                              {job.location}
                            </button>
                            <button className="special_button">
                              {job.type}
                            </button>
                            <p>
                              <small>
                                {job.time} • {job.applied}
                              </small>
                            </p>
                          </div>
                        </Col>
                        <Col md={3} className="">
                          <div className="job-info text-start">
                            <h6>Team</h6>
                            <p>{job.team}</p>
                            <p className="salary special">
                              <span>{job.salary}</span>{" "}
                              <span className="light">/Year</span>
                            </p>
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
            <Button className="float-right" onClick={togglePayPopup}>Add Card</Button>
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
                onClick={() => handleCurrent("pay")}
              >
                <i className="fa-solid fa-credit-card"></i> Payment Options
              </Link>
              <Link className="menu-item logout rounded-2 mb-2" onClick={toggleLogoutPopup}>
                <i className="fa-solid fa-right-from-bracket"></i> Logout
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
                  <input type="text" className="form-control" placeholder="Cvc" />
                </div>
                <div className="col">
                  <label className="form-label">Expire Date</label>
                  <input type="text" className="form-control" placeholder="1234" />
                </div>
              </div>
              <div className="mb-3 w-100">
                <label className="form-label">Card Name</label>
                <input type="text" className="form-control" placeholder="Card Name" />
              </div>
              <div className="mb-3 w-100">
                <label className="form-label">Card Number</label>
                <input type="text" className="form-control" placeholder="8255 5214 5111 4567" />
              </div>
            </div>
            <button className="btn btn-primary float-right">Save</button>
          </div>
        </div>
      )}
       {showLogoutPopup && (
        <div className="overlay">
          <div className="logout-popup p-4 rounded-4 shadow position-relative text-center bg-light">
            <div className="title d-flex justify-content-between">
              <h4>Logout</h4>
              <i className="fa-solid fa-xmark" onClick={toggleLogoutPopup}></i>
            </div>
            <p>Are you sure you want to logout?</p>
            <div className="d-flex justify-content-end gap-2">
              <button className="btn btn-outline-danger">Log out</button>
              <button className="btn btn-danger" onClick={toggleLogoutPopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}

        
      </section>


    </>
  );
};

export default ProfilePage;
