import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import axios from "axios";
import './Cv.css';
import { useState } from "react";
import CVViewer from "./CVViewer";

const Cv = () => {
  const [submittedData, setSubmittedData] = useState(null);

  const initialValues = {
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
    photo: null
  };

  // const handleSubmit = async (values, { setSubmitting }) => {
  //   try {
  //     const formData = new FormData();
      
  //     // Append all form values to FormData
  //     formData.append('personal_info', JSON.stringify(values.personal_info));
  //     formData.append('education', JSON.stringify(values.education));
  //     formData.append('experience', JSON.stringify(values.experience));
  //     formData.append('skillsets', JSON.stringify(values.skillsets));
  //     formData.append('projects', JSON.stringify(values.projects));
  //     formData.append('certifications', JSON.stringify(values.certifications));
  //     formData.append('additional', JSON.stringify(values.additional));
      
  //     if (values.photo) {
  //       formData.append('photo', values.photo);
  //     }

  //     const response = await axios.post('YOUR_API_ENDPOINT', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data'
  //       }
  //     });

  //     console.log('Submission successful', response.data);
  //     setSubmittedData(values)
  //   } catch (error) {
  //     console.error('Submission error', error);
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  const handleSubmit = (values, { setSubmitting }) => {
    try {
      // Convert the Formik values to a storable format
      const cvData = {
        ...values,
        // Handle the file object specially
        photo: values.photo
      };
      
      // Save to localStorage
      localStorage.setItem('cvData', JSON.stringify(cvData));
      
      // Set the submitted data to display the CV
      setSubmittedData(cvData);
    } catch (error) {
      console.error('Error saving CV:', error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="main bg-light mt-0 pt-2 pb-5">
        {submittedData ? (
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Your Professional CV</h2>
          <Button 
            variant="outline-primary" 
            onClick={() => setSubmittedData(null)}
          >
            Edit CV
          </Button>
        </div>
        <CVViewer cvData={submittedData} />
      </div>
    ) : (
 <div className="container mt-4 p-5">
        <h2 className="mb-4">Create Your CV</h2>
        
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            isSubmitting
          }) => (
            <Form onSubmit={handleSubmit} className="position-relative">
              
              {/* Personal Information Section */}
              <h4 className="mb-4">Personal Information</h4>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="personal_info.name">
                    <Form.Label className="label">Name</Form.Label>
                    <Form.Control
                      className="input"
                      type="text"
                      name="personal_info.name"
                      placeholder="Enter your name"
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

              <Form.Group controlId="photo" className="mb-3">
                <Form.Label className="label">Upload your photo</Form.Label>
                <Form.Control
                  className="input"
                  type="file"
                  name="photo"
                  onChange={(event) => {
                    setFieldValue("photo", event.currentTarget.files[0]);
                  }}
                />
              </Form.Group>

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
                  </Row>
                </div>
              ))}

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
                  </Row>

                  <Form.Group controlId={`experience.${index}.achievements`} className="mb-2">
                    <Form.Label className="label">Achievements</Form.Label>
                    {exp.achievements.map((ach, achIndex) => (
                      <Form.Control
                        key={achIndex}
                        className="input mb-2"
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
                    ))}
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="mt-2"
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
                      <Form.Control
                        key={techIndex}
                        className="input mb-2"
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
                    ))}
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="mt-2"
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
                      <Form.Control
                        key={resultIndex}
                        className="input mb-2"
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
                    ))}
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="mt-2"
                      onClick={() => {
                        const newResults = [...project.results, ""];
                        setFieldValue(`projects.${index}.results`, newResults);
                      }}
                    >
                      + Add Result
                    </Button>
                  </Form.Group>
                </div>
              ))}
              <Button
                variant="outline-secondary"
                className="mb-3"
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
                  </Row>
                </div>
              ))}
              <Button
                variant="outline-secondary"
                className="mb-3"
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
                </div>
              ))}

              {/* Submit Button */}
              <button 
                className="p-2 rounded-2 float border-0" 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </Form>
          )}
        </Formik>
      </div>    )}
     
    </div>
  );
};

export default Cv;