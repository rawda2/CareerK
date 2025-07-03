import { Form, Card, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup"; // ✅ Add Yup
import './PostJop.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PostJob() {
  const url = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // ✅ Define validation schema
  const validationSchema = Yup.object({
    title: Yup.string().required("Job title is required"),
    job_description: Yup.string().required("Job description is required"),
    job_type: Yup.string().required("Job type is required"),
    location: Yup.string().required("Location is required"),
    salary_range: Yup.string().required("Salary range is required"),
    deadline_task: Yup.string().required("Deadline is required"),
    skills: Yup.string().required("Skills are required"),
    experience_required: Yup.string().required("Experience is required"),
    company_department: Yup.string().required("Department is required"),
    job_availability: Yup.string().required("Availability is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      job_description: '',
      job_type: '',
      location: '',
      salary_range: '',
      deadline_task: '',
      skills: '',
      experience_required: '',
      company_department: '',
      job_availability: ''
    },
    validationSchema,
    validateOnChange: true,  // ✅ validate on every keystroke
  validateOnBlur: true, 
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.post(`${url}/job-post/create`, values, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Job posted successfully:", response.data);
        localStorage.setItem("jobs", JSON.stringify(values));
        toast.success("Job Posted successfully");
        navigate("/done3");
      } catch (error) {
        console.error("Error posting job:", error);
        alert("Failed to post the job. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={3000} />
      <section className="jobpost d-flex bg-light w-100 justify-content-center align-items-center flex-column p-5">
        <form onSubmit={formik.handleSubmit} className="w-100 d-flex flex-wrap justify-content-center ">
          <Card className="mb-4 card rounded-4 p-4 w-90">
            <Card.Body>
              <h2 className="  mb-5">Post Job </h2>
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label >Job Title <span className=" text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.title}
                      isInvalid={formik.touched.title && formik.errors.title}
                      className="rounded-3"
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.title}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label >Job Type <span className=" text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      name="job_type"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.job_type}
                      isInvalid={formik.touched.job_type && formik.errors.job_type}
                      className="rounded-3"
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.job_type}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label >Job Description <span className=" text-danger">*</span></Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="job_description"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.job_description}
                      isInvalid={formik.touched.job_description && formik.errors.job_description}
                      className="rounded-3 shadow-sm"
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.job_description}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label >Deadline <span className=" text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      name="deadline_task"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.deadline_task}
                      isInvalid={formik.touched.deadline_task && formik.errors.deadline_task}
                      className="rounded-3"
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.deadline_task}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label >Salary Range <span className=" text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      name="salary_range"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.salary_range}
                      isInvalid={formik.touched.salary_range && formik.errors.salary_range}
                      className="rounded-3"
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.salary_range}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label >Job Location <span className=" text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      name="location"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.location}
                      isInvalid={formik.touched.location && formik.errors.location}
                      className="rounded-3 w-50"
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.location}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card className="mb-4 card rounded-4 p-4 w-90">
            <Card.Body className="position-relative pb-5">
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label >Skills / Qualifications <span className=" text-danger">*</span></Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="skills"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.skills}
                      isInvalid={formik.touched.skills && formik.errors.skills}
                      className="rounded-3"
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.skills}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label >Experience Level <span className=" text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      name="experience_required"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.experience_required}
                      isInvalid={formik.touched.experience_required && formik.errors.experience_required}
                      className="rounded-3"
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.experience_required}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label >Company Department <span className=" text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      name="company_department"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.company_department}
                      isInvalid={formik.touched.company_department && formik.errors.company_department}
                      className="rounded-3"
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.company_department}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label >Job Availability <span className=" text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      name="job_availability"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.job_availability}
                      isInvalid={formik.touched.job_availability && formik.errors.job_availability}
                      className="rounded-3 w-50"
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.job_availability}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <button type="submit" className="Btn position-absolute" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Posting...
                  </>
                ) : (
                  "Post"
                )}
              </button>
            </Card.Body>
          </Card>
        </form>
      </section>
    </>
  );
}
