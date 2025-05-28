import React from "react";
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
import { useState } from "react";
import { Link } from "react-router-dom";
export default function Settings() {
    let [current, setCurrent] = useState("profile");

    function handleCurrent(current) {
        setCurrent(current);
    }
    const industries = ["Technology", "Finance", "Healthcare", "Education", "Other"];
    const countries = ["Egypt", "USA", "UK", "Canada", "Australia", "Germany", "Other"];

    return (
        <section className=" d-flex p-4  justify-content-center gap-0 ">
            {current == "profile" ? (
                <Container className="Cprofile-page w-75 mt-2  d-flex flex-column">
                    <div className="header d-flex gap-3 flex-row-reverse px-3 py-2">
                   
                        <button  className="Btn">
                          <Link className=" text-decoration-none">Save</Link>  
                        </button>
                        <button  className="btnn py-2 px-3">
                          <Link className=" text-decoration-none">Discard</Link>  
                        </button>

                    </div>
                    <Card className="mb-4 card rounded-4 p-4">
                        <Card.Body>
                            <Card.Title>Company Information</Card.Title>
                            <Form className="form py-4 position-relative">
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Group
                                            controlId="companyname"
                                            className=" d-flex gap-2 "
                                        >
                                            <Form.Group className=" w-100">
                                                <Form.Label>Company Name</Form.Label>
                                                <Form.Control
                                                    className=" rounded-3"
                                                    type="text"
                                                    placeholder="Company Name"
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
                                                placeholder="+"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="gender">
                                            <Form.Label>Industry</Form.Label>
                                            <Form.Control className=" rounded-3" as="select">
                                                <option value="">Select industry</option>
                                                {industries.map(ind => (
                                                    <option key={ind} value={ind}>{ind}</option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className=" mb-3">
                                    <Col>
                                        <Form.Group controlId="gender">
                                            <Form.Label>Country</Form.Label>
                                            <Form.Control className=" rounded-3" as="select">
                                                <option value="">Select Country</option>
                                                {countries.map(country => (
                                                    <option key={country} value={country}>{country}</option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>

                                    </Col>
                                    <Col>
                                        <Form.Group controlId="gender">
                                            <Form.Label>WebSite_Url</Form.Label>
                                            <Form.Control
                                                className=" rounded-3"
                                                type="text"
                                                placeholder="ex. https://facebock.com"
                                            />
                                        </Form.Group>

                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="gender">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control
                                                className=" rounded-3"
                                                type="text"
                                                placeholder="address"
                                            />
                                        </Form.Group>

                                    </Col>
                                    <Col>
                                        <Form.Group controlId="gender">
                                            <Form.Label>SocialMedia_Url</Form.Label>
                                            <Form.Control
                                                className=" rounded-3"
                                                type="text"
                                                placeholder="ex. https://facebock.com"
                                            />
                                        </Form.Group>

                                    </Col>
                                </Row>

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

                            </Form>
                        </Card.Body>
                    </Card>

                    <Card className="mb-4 card rounded-4 p-4">
                        <Card.Body>
                            <Card.Title>About Me</Card.Title>
                            <Form className="form py-4 position-relative">
                                <Form.Group controlId="description">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        className=" rounded-3 w-75 mb-3"
                                        as="input"

                                        placeholder="Write Company Title"
                                    />
                                </Form.Group>
                                <Form.Group controlId="description">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        className=" rounded-3 w-75"
                                        as="input"
                                        placeholder="Write your description"
                                    />
                                </Form.Group>

                            </Form>
                        </Card.Body>
                    </Card>




                </Container>
            ) : (
                ""
            )}

            <Container className="aside shadow py-3 rounded-4">
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
                            <i className="fa-solid fa-book-open"></i> Posted Jops
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
                    </ListGroup>
                </Card>
            </Container>

        </section>
    );
}
