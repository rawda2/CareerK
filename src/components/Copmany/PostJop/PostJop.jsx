import { Form, Card, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import './PostJop.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function PostJob() {
  const url = import.meta.env.VITE_API_URL;
  let token=localStorage.getItem("token")
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: '',
      job_description: '',
      job_type: '',
      location: '',
      salary_range: '',
      deadline_task:'',
      skills:'',
      experience_required: '',
     company_department:'',
     job_availability:''
    },
    onSubmit:async (values) => {
      try {
      const response = await axios.post(`${url}/jobs/create-job-post`, values,{
        headers: {
        Authorization: `Bearer ${token}`,        },
      });
      console.log("Job posted successfully:", response.data);
      localStorage.setItem("jobs", JSON.stringify(values));
      alert("Job posted successfully!");
      navigate("/done3")
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Failed to post the job. Please try again.");
    }
  },
  });

  return (
    <section className="jobpost d-flex bg-light p-4 justify-content-center align-items-center flex-column p-5">
      <form onSubmit={formik.handleSubmit} className="w-100">
        <Card className="mb-4 card rounded-4 p-4 w-90">
          <Card.Body>
            <Card.Title>Post Job</Card.Title>
            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Job Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    className="rounded-3"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Job Type</Form.Label>
                  <Form.Control
                    type="text"
                    name="job_type"
                    onChange={formik.handleChange}
                    value={formik.values.job_type}
                    className="rounded-3"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Job Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="job_description"
                    onChange={formik.handleChange}
                    value={formik.values.job_description}
                    className="rounded-3 shadow-sm"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Deadline</Form.Label>
                  <Form.Control
                    type="text"
                    name="deadline_task"
                    onChange={formik.handleChange}
                    value={formik.values.deadline_task}
                    className="rounded-3"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Salary Range</Form.Label>
                  <Form.Control
                    type="text"
                    name="salary_range"
                    onChange={formik.handleChange}
                    value={formik.values.salary_range}
                    className="rounded-3"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Job Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    onChange={formik.handleChange}
                    value={formik.values.location}
                    className="rounded-3 w-50"
                  />
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
                  <Form.Label>Skills / Qualifications</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="skills"
                    onChange={formik.handleChange}
                    value={formik.values.skills}
                    className="rounded-3"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Experience Level</Form.Label>
                  <Form.Control
                    type="text"
                    name="experience_required"
                    onChange={formik.handleChange}
                    value={formik.values.experience_required}
                    className="rounded-3"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Company Department</Form.Label>
                  <Form.Control
                    type="text"
                    name="company_department"
                     onChange={formik.handleChange}
                    value={formik.values.company_department}
                    className="rounded-3"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Job Availability</Form.Label>
                  <Form.Control
                    type="text"
                    name="job_availability"
                    className="rounded-3 w-50"
                     onChange={formik.handleChange}
                    value={formik.values.job_availability}
                  />
                </Form.Group>
              </Col>
            </Row>
<button type="submit" className="Btn position-absolute">
  Post
</button>

          </Card.Body>
        </Card>
      </form>
    </section>
  );
}
