import  { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Spinner, Alert, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import axios from "axios";
import './Cv.css';

const Cv = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const sessionId = params.get("sessionId");
    const formData = location.state?.formData;


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
   const navigate=useNavigate()
  const API = import.meta.env.VITE_API_URL;
  const token=localStorage.getItem("token")


  const initialValues = formData||
  {
    personal_info: {
      name: "",
      email: "",
      phone: "",
      address: "",
      linkedin: "",
      portfolio: ""
    },
    education: [
      {
        institution: "",
        degree: "",
        field: "",
        start_date: "",
        end_date: "",
        gpa: ""
      }
    ],
    experience: [
      {
        position: "",
        company: "",
        dates: "",
        achievements: [""]
      }
    ],
    skillsets: [],
    projects: [
      {
        title: "",
        description: "",
        technologies: [""],
        results: [""]
      }
    ],
    certifications: [
      {
        name: "",
        issuer: "",
        date: ""
      }
    ],
    additional: [
      {
        title: "Languages",
        description: ""
      }
    ],
 
  };
  

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    setError(null);
    try {
      const {...cvData } = values;

      // 1. PUT form data to update session
      await axios.put(
        `${API}/cv-generation/${sessionId}/data`,
        cvData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          }
        }
      );
      console.log("Data Posted Successfuly")
navigate(`cvviewer?sessionId=${sessionId}`);    
 

    } catch (err) {
      console.error("CV generation error:", err);
      setError("Failed to generate your CV. Please try again.");
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  if (!sessionId) {
    return (
      <div className="main d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Alert variant="danger">
          <strong>Error:</strong> Missing session ID. Please start from the homepage.
        </Alert>
      </div>
    );
  }

  return (
    <div className="main bg-light p-4">
      <div className="container pt-2">
        <h4 className="mb-5 text-center secondary font-extrabold  ">From <span className=" i">‘Blah’</span> to <span className=" i">‘Boom!’</span> – <span className="i">AI-Powered</span> CV Magic 🎩✨</h4>
        {error && <Alert variant="danger">{error}</Alert>}
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values, handleChange, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              {/* Personal Information Section */}
              <h5 className="mt-4 mb-3">Personal Information</h5>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="personal_info.name">
                    <Form.Label className="label">Full Name</Form.Label>
                    <Form.Control
                      className="input"
                      type="text"
                      name="personal_info.name"
                      placeholder="Enter your full name"
                      value={values.personal_info.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="personal_info.email">
                    <Form.Label className="label">Email</Form.Label>
                    <Form.Control
                      className="input"
                      type="email"
                      name="personal_info.email"
                      placeholder="Enter your email"
                      value={values.personal_info.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="personal_info.phone">
                    <Form.Label className="label">Phone</Form.Label>
                    <Form.Control
                      className="input"
                      type="tel"
                      name="personal_info.phone"
                      placeholder="Enter your phone number"
                      value={values.personal_info.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="personal_info.address">
                    <Form.Label className="label">Address</Form.Label>
                    <Form.Control
                      className="input"
                      type="text"
                      name="personal_info.address"
                      placeholder="Enter your address"
                      value={values.personal_info.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="personal_info.linkedin">
                    <Form.Label className="label">LinkedIn</Form.Label>
                    <Form.Control
                      className="input"
                      type="url"
                      name="personal_info.linkedin"
                      placeholder="Enter your LinkedIn profile URL"
                      value={values.personal_info.linkedin}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="personal_info.portfolio">
                    <Form.Label className="label">Portfolio</Form.Label>
                    <Form.Control
                      className="input"
                      type="url"
                      name="personal_info.portfolio"
                      placeholder="Enter your portfolio URL"
                      value={values.personal_info.portfolio}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Group>
                </Col>
              </Row>

             
              {/* Education Section */}
              <h5 className="mt-5 mb-3">Education</h5>
              {values.education.map((edu, index) => (
                <div key={index} className="border p-3 mb-3 rounded bg-light">
                  <h6>Education {index + 1}</h6>
                  <Row className="mb-2">
                    <Col md={6}>
                      <Form.Group controlId={`education.${index}.institution`}>
                        <Form.Label className="label">Institution</Form.Label>
                        <Form.Control
                          className="input"
                          type="text"
                          name={`education.${index}.institution`}
                          placeholder="Enter institution name"
                          value={edu.institution}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group controlId={`education.${index}.degree`}>
                        <Form.Label className="label">Degree</Form.Label>
                        <Form.Control
                          className="input"
                          type="text"
                          name={`education.${index}.degree`}
                          placeholder="e.g. B.Sc."
                          value={edu.degree}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group controlId={`education.${index}.field`}>
                        <Form.Label className="label">Field</Form.Label>
                        <Form.Control
                          className="input"
                          type="text"
                          name={`education.${index}.field`}
                          placeholder="e.g. Computer Science"
                          value={edu.field}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-2">
                    <Col md={3}>
                      <Form.Group controlId={`education.${index}.start_date`}>
                        <Form.Label className="label">Start Date</Form.Label>
                        <Form.Control
                          className="input"
                          type="month"
                          name={`education.${index}.start_date`}
                          value={edu.start_date}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group controlId={`education.${index}.end_date`}>
                        <Form.Label className="label">End Date</Form.Label>
                        <Form.Control
                          className="input"
                          type="month"
                          name={`education.${index}.end_date`}
                          value={edu.end_date}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group controlId={`education.${index}.gpa`}>
                        <Form.Label className="label">GPA</Form.Label>
                        <Form.Control
                          className="input"
                          type="text"
                          name={`education.${index}.gpa`}
                          placeholder="e.g. 3.9"
                          value={edu.gpa}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Button
                        variant="danger"
                        className="mt-4"
                        onClick={() => {
                          const newEducation = [...values.education];
                          newEducation.splice(index, 1);
                          setFieldValue("education", newEducation);
                        }}
                      >
                        Remove
                      </Button>
                    </Col>
                  </Row>
                </div>
              ))}
              <Button
               
                className="mb-3 btnn "
                onClick={() => {
                  const newEducation = [...values.education, {
                    institution: "",
                    degree: "",
                    field: "",
                    start_date: "",
                    end_date: "",
                    gpa: ""
                  }];
                  setFieldValue("education", newEducation);
                }}
              >
                + Add Education
              </Button>

              {/* Experience Section */}
              <h5 className="mt-5 mb-3">Experience</h5>
              {values.experience.map((exp, index) => (
                <div key={index} className="border p-3 mb-3 rounded bg-light">
                  <h6>Experience {index + 1}</h6>
                  <Row className="mb-2">
                    <Col md={6}>
                      <Form.Group controlId={`experience.${index}.position`}>
                        <Form.Label className="label">Position</Form.Label>
                        <Form.Control
                          className="input"
                          type="text"
                          name={`experience.${index}.position`}
                          placeholder="Enter position title"
                          value={exp.position}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId={`experience.${index}.company`}>
                        <Form.Label className="label">Company</Form.Label>
                        <Form.Control
                          className="input"
                          type="text"
                          name={`experience.${index}.company`}
                          placeholder="Enter company name"
                          value={exp.company}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-2">
                    <Col md={6}>
                      <Form.Group controlId={`experience.${index}.dates`}>
                        <Form.Label className="label">Dates</Form.Label>
                        <Form.Control
                          className="input"
                          type="text"
                          name={`experience.${index}.dates`}
                          placeholder="e.g. 2022 - Present"
                          value={exp.dates}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Button
                        variant="danger"
                        className="mt-4"
                        onClick={() => {
                          const newExperience = [...values.experience];
                          newExperience.splice(index, 1);
                          setFieldValue("experience", newExperience);
                        }}
                      >
                        Remove
                      </Button>
                    </Col>
                  </Row>

                  <Form.Group controlId={`experience.${index}.achievements`} className="mb-2">
                    <Form.Label className="label">Achievements</Form.Label>
                    {exp.achievements.map((ach, achIndex) => (
                      <div key={achIndex} className="d-flex mb-2">
                        <Form.Control
                          className="input"
                          as="textarea"
                          name={`experience.${index}.achievements.${achIndex}`}
                          placeholder="Enter achievement"
                          value={ach}
                          onChange={(e) => {
                            const newAchievements = [...exp.achievements];
                            newAchievements[achIndex] = e.target.value;
                            setFieldValue(`experience.${index}.achievements`, newAchievements);
                          }}
                          rows={2}
                        />
                        <Button
                          variant="outline-danger"
                          className="ms-2"
                          onClick={() => {
                            const newAchievements = [...exp.achievements];
                            newAchievements.splice(achIndex, 1);
                            setFieldValue(`experience.${index}.achievements`, newAchievements);
                          }}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                    <Button
                      
                      size="sm"
                      className="mt-2  btnn"
                      onClick={() => {
                        const newAchievements = [...exp.achievements, ""];
                        setFieldValue(`experience.${index}.achievements`, newAchievements);
                      }}
                    >
                      + Add Achievement
                    </Button>
                  </Form.Group>
                </div>
              ))}
              <Button
                className="mb-3  btnn"
                onClick={() => {
                  const newExperience = [...values.experience, {
                    position: "",
                    company: "",
                    dates: "",
                    achievements: [""]
                  }];
                  setFieldValue("experience", newExperience);
                }}
              >
                + Add Experience
              </Button>

              {/* Skills Section */}
              <div className="group">
                <h5 className="mt-5 mb-3">Skills</h5>
                <Form.Group controlId="skillsets">
                  <Form.Label className="label">Add your skills (comma separated)</Form.Label>
                  <Form.Control
                    className="input"
                    name="skillsets"
                    placeholder="e.g. Python, FastAPI, Docker"
                    value={values.skillsets.join(", ")}
                    onChange={(e) => {
                      const skills = e.target.value.split(",").map(skill => skill.trim());
                      setFieldValue("skillsets", skills);
                    }}
                  />
                </Form.Group>
                <p className="mt-4">Skills:</p>
                <div className="spans d-flex flex-wrap">
                  {values.skillsets.map((skill, index) => (
                    skill && (
                      <span key={index} className="p-2 ms-2 mb-2 rounded-3">
                        {skill}
                      </span>
                    )
                  ))}
                </div>
              </div>

              {/* Projects Section */}
              <h5 className="mt-5 mb-3">Projects</h5>
              {values.projects.map((project, index) => (
                <div key={index} className="border p-3 mb-3 rounded bg-light">
                  <h6>Project {index + 1}</h6>
                  <Row className="mb-2">
                    <Col md={12}>
                      <Form.Group controlId={`projects.${index}.title`}>
                        <Form.Label className="label">Project Title</Form.Label>
                        <Form.Control
                          className="input"
                          type="text"
                          name={`projects.${index}.title`}
                          placeholder="Enter project title"
                          value={project.title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group controlId={`projects.${index}.description`} className="mb-2">
                    <Form.Label className="label">Description</Form.Label>
                    <Form.Control
                      className="input"
                      as="textarea"
                      name={`projects.${index}.description`}
                      placeholder="Enter project description"
                      value={project.description}
                      onChange={handleChange}
                      rows={3}
                    />
                  </Form.Group>

                  <Form.Group controlId={`projects.${index}.technologies`} className="mb-2">
                    <Form.Label className="label">Technologies Used</Form.Label>
                    {project.technologies.map((tech, techIndex) => (
                      <div key={techIndex} className="d-flex mb-2">
                        <Form.Control
                          className="input"
                          type="text"
                          name={`projects.${index}.technologies.${techIndex}`}
                          placeholder="Enter technology"
                          value={tech}
                          onChange={(e) => {
                            const newTech = [...project.technologies];
                            newTech[techIndex] = e.target.value;
                            setFieldValue(`projects.${index}.technologies`, newTech);
                          }}
                        />
                        <Button
                          variant="outline-danger"
                          className="ms-2"
                          onClick={() => {
                            const newTech = [...project.technologies];
                            newTech.splice(techIndex, 1);
                            setFieldValue(`projects.${index}.technologies`, newTech);
                          }}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                    <Button
                      size="sm" 
                      className="mt-2  btnn"
                      onClick={() => {
                        const newTech = [...project.technologies, ""];
                        setFieldValue(`projects.${index}.technologies`, newTech);
                      }}
                    >
                      + Add Technology
                    </Button>
                  </Form.Group>

                  <Form.Group controlId={`projects.${index}.results`} className="mb-2">
                    <Form.Label className="label">Results/Achievements</Form.Label>
                    {project.results.map((result, resultIndex) => (
                      <div key={resultIndex} className="d-flex mb-2">
                        <Form.Control
                          className="input"
                          as="textarea"
                          name={`projects.${index}.results.${resultIndex}`}
                          placeholder="Enter result/achievement"
                          value={result}
                          onChange={(e) => {
                            const newResults = [...project.results];
                            newResults[resultIndex] = e.target.value;
                            setFieldValue(`projects.${index}.results`, newResults);
                          }}
                          rows={2}
                        />
                        <Button
                          variant="outline-danger"
                          className="ms-2"
                          onClick={() => {
                            const newResults = [...project.results];
                            newResults.splice(resultIndex, 1);
                            setFieldValue(`projects.${index}.results`, newResults);
                          }}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                    <Button
                      size="sm"
                      className="mt-2  btnn"
                      onClick={() => {
                        const newResults = [...project.results, ""];
                        setFieldValue(`projects.${index}.results`, newResults);
                      }}
                    >
                      + Add Result
                    </Button>
                  </Form.Group>
                  <Button
                    variant="danger"
                    onClick={() => {
                      const newProjects = [...values.projects];
                      newProjects.splice(index, 1);
                      setFieldValue("projects", newProjects);
                    }}
                  >
                    Remove Project
                  </Button>
                </div>
              ))}
              <Button
               
                className="mb-3  btnn"
                onClick={() => {
                  const newProjects = [...values.projects, {
                    title: "",
                    description: "",
                    technologies: [""],
                    results: [""]
                  }];
                  setFieldValue("projects", newProjects);
                }}
              >
                + Add Project
              </Button>

              {/* Certifications Section */}
              <h5 className="mt-5 mb-3">Certifications</h5>
              {values.certifications.map((cert, index) => (
                <div key={index} className="border p-3 mb-3 rounded bg-light">
                  <h6>Certification {index + 1}</h6>
                  <Row className="mb-2">
                    <Col md={6}>
                      <Form.Group controlId={`certifications.${index}.name`}>
                        <Form.Label className="label">Certification Name</Form.Label>
                        <Form.Control
                          className="input"
                          type="text"
                          name={`certifications.${index}.name`}
                          placeholder="Enter certification name"
                          value={cert.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId={`certifications.${index}.issuer`}>
                        <Form.Label className="label">Issuing Organization</Form.Label>
                        <Form.Control
                          className="input"
                          type="text"
                          name={`certifications.${index}.issuer`}
                          placeholder="Enter issuing organization"
                          value={cert.issuer}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId={`certifications.${index}.date`}>
                        <Form.Label className="label">Date Obtained</Form.Label>
                        <Form.Control
                          className="input"
                          type="month"
                          name={`certifications.${index}.date`}
                          value={cert.date}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Button
                        variant="danger"
                        className="mt-4"
                        onClick={() => {
                          const newCerts = [...values.certifications];
                          newCerts.splice(index, 1);
                          setFieldValue("certifications", newCerts);
                        }}
                      >
                        Remove
                      </Button>
                    </Col>
                  </Row>
                </div>
              ))}
              <Button
               
                className="mb-3  btnn"
                onClick={() => {
                  const newCerts = [...values.certifications, {
                    name: "",
                    issuer: "",
                    date: ""
                  }];
                  setFieldValue("certifications", newCerts);
                }}
              >
                + Add Certification
              </Button>

              {/* Additional Information Section */}
              <h5 className="mt-5 mb-3">Additional Information</h5>
              {values.additional.map((item, index) => (
                <div key={index} className="border p-3 mb-3 rounded bg-light">
                  <h6>{item.title || "Additional Information"}</h6>
                  <Form.Group controlId={`additional.${index}.description`}>
                    <Form.Label className="label">Details</Form.Label>
                    <Form.Control
                      className="input"
                      as="textarea"
                      name={`additional.${index}.description`}
                      placeholder="Enter additional information"
                      value={item.description}
                      onChange={handleChange}
                      rows={3}
                    />
                  </Form.Group>
                  <Button
                    variant="danger"
                    className="mt-2"
                    onClick={() => {
                      const newAdditional = [...values.additional];
                      newAdditional.splice(index, 1);
                      setFieldValue("additional", newAdditional);
                    }}
                  >
                    Remove
                  </Button>
                  
                </div>
                
              ))}
                <Button
               
                className="mb-3  btnn"
                onClick={() => {
                  const newAdditional = [...values.additional, {
                    title: "New Section",
                    description: ""
                  }];
                  setFieldValue("additional", newAdditional);
                }}
              >
                + Add Additional Section
              </Button>

              <div className="footer d-flex align-items-center flex-row-reverse mt-0 p-0 bg-transparent">

              <Button
                type="submit"
                disabled={isSubmitting || loading}
                className="mb-3 Btn mt-0"
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Generating CV...
                  </>
                ) : (
                  "Generate & Download CV"
                )}
              </Button>
              </div>
            
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Cv;