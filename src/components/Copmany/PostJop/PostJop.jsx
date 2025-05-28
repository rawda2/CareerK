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
} from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import './PostJop.css'
export default function PostJop() {
  return (
    <>
      <section className="jobpost d-flex bg-light p-4  justify-content-center align-items-center gap-0 flex-column p-5">
        <Card className="mb-4 card rounded-4 p-4 w-90">
          <Card.Body>
            <Card.Title>Post Job</Card.Title>
            <Form className="form py-4 position-relative">
              <Row className="mb-3">
                <Col>
                  <Form.Group
                    controlId="companyname"
                    className=" d-flex gap-2 "
                  >
                    <Form.Group className=" w-100">
                      <Form.Label>Job Title</Form.Label>
                      <Form.Control className=" rounded-3" type="text" />
                    </Form.Group>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="email">
                    <Form.Label>Job Type</Form.Label>
                    <Form.Control className=" rounded-3" type="text" />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="">
                    <Form.Label>Job Descreption</Form.Label>
                    <Form.Control
                      className=" rounded-3 shadow-sm"
                      as="textarea"
                      rows={3}
                      placeholder=""
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className=" mb-3">
                <Col>
                  <Form.Group controlId="gender">
                    <Form.Label>DeadLine</Form.Label>
                    <Form.Control className=" rounded-3" type="text" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="gender">
                    <Form.Label>Price Range</Form.Label>
                    <Form.Control className=" rounded-3" type="text" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="gender">
                    <Form.Label>Job Location</Form.Label>
                    <Form.Control className=" rounded-3 w-50" type="text" />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
        <Card className="mb-4 card rounded-4 p-4 w-90">
          <Card.Body className=" position-relative pb-5">
            <Form className="form py-4 position-relative">
              <Row className="mb-3">
                <Col>
                  <Form.Group
                    controlId="companyname"
                    className=" d-flex gap-2 "
                  >
                    <Form.Group className=" w-100">
                      <Form.Label>Skills</Form.Label>
                      <Form.Control
                        className=" rounded-3"
                        type="text"
                        as="textarea"
                        rows={3}
                      />
                    </Form.Group>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3"></Row>
              <Row className=" mb-3">
                <Col>
                  <Form.Group controlId="gender">
                    <Form.Label>Experience Level</Form.Label>
                    <Form.Control className=" rounded-3" type="text" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="gender">
                    <Form.Label>Company Department</Form.Label>
                    <Form.Control className=" rounded-3" type="text" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="gender">
                    <Form.Label>Job Availability</Form.Label>
                    <Form.Control className=" rounded-3 w-50" type="text" />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
            <button className="Btn position-absolute">
              <Link className=" text-decoration-none" to={'/done3'}>Post</Link>
            </button>
          </Card.Body>
        </Card>
      </section>
    </>
  );
}
