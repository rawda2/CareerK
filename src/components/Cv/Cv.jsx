import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import './Cv.css'
const Cv = () => {
    const [formData, setFormData] = useState({
        name: "",
        title: "",
        email: "",
        contact: "",
        photo: null,
        experiences: [
          {
            title: "",
            from: "",
            to: "",
            companyName: "",
            experienceType: "Full Time",
            description: "",
            currentWork: false,
          },
        ],
      });
    
      // Handle general form changes
      const handleChange = (e, index = null) => {
        const { name, value, type, checked, files } = e.target;
    
        if (index === null) {
          setFormData({ ...formData, [name]: type === "file" ? files[0] : value });
        } else {
          const updatedExperiences = [...formData.experiences];
          updatedExperiences[index][name] = type === "checkbox" ? checked : value;
          setFormData({ ...formData, experiences: updatedExperiences });
        }
      };
    
      // Add new experience section
      const addExperience = () => {
        setFormData({
          ...formData,
          experiences: [
            ...formData.experiences,
            {
              title: "",
              from: "",
              to: "",
              companyName: "",
              experienceType: "Full Time",
              description: "",
              currentWork: false,
            },
          ],
        });
      };
    
      // Handle form submission
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
      };
    
      return (
        <div className="main bg-light mt-0 pt-2 pb-5">
 <div className=" container  mt-4 p-5 ">
          <h4 className="mb-4">Personal Information</h4>
          <Form onSubmit={handleSubmit} className=" position-relative">
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="name">
                  <Form.Label className=" label">Name</Form.Label>
                  <Form.Control
                  className="input"
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="title">
                  <Form.Label className=" label">Title</Form.Label>
                  <Form.Control
                  className="input"
                    type="text"
                    name="title"
                    placeholder="Enter your title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
    
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="email">
                  <Form.Label className=" label">Email</Form.Label>
                  <Form.Control
                  className="input"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="contact">
                  <Form.Label className=" label">Contact Number</Form.Label>
                  <Form.Control
                  className="input"
                    type="tel"
                    name="contact"
                    placeholder="Enter your contact number"
                    value={formData.contact}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
    
            <Form.Group controlId="photo" className="mb-3">
              <Form.Label className=" label">Upload your photo</Form.Label>
              <Form.Control
              className="input" type="file" name="photo" onChange={handleChange} />
            </Form.Group>
    
            {/* Experience Sections */}
            <h5 className="mt-5 mb-3">Experience</h5>
            {formData.experiences.map((experience, index) => (
              <div key={index} className="border p-3 mb-3 rounded bg-light">
                <h6>Experience {index + 1}</h6>
                <Row className="mb-2">
                  <Col md={6}>
                    <Form.Group controlId={`experienceTitle${index}`}>
                      <Form.Label className=" label">Title</Form.Label>
                      <Form.Control
                      className="input"
                        type="text"
                        name="title"
                        placeholder="Enter job title"
                        value={experience.title}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group controlId={`from${index}`}>
                      <Form.Label className=" label">From</Form.Label>
                      <Form.Control
                      className="input"
                        type="month"
                        name="from"
                        value={experience.from}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group controlId={`to${index}`}>
                      <Form.Label className=" label">To</Form.Label>
                      <Form.Control
                      className="input"
                        type="month"
                        name="to"
                        value={experience.to}
                        onChange={(e) => handleChange(e, index)}
                        disabled={experience.currentWork}
                      />
                    </Form.Group>
                  </Col>
                </Row>
    
                <Row className="mb-2">
                  <Col md={6}>
                    <Form.Group controlId={`companyName${index}`}>
                      <Form.Label className=" label">Company Name</Form.Label>
                      <Form.Control
                      className="input"
                        type="text"
                        name="companyName"
                        placeholder="Enter company name"
                        value={experience.companyName}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId={`experienceType${index}`}>
                      <Form.Label className=" label">Experience Type</Form.Label>
                      <Form.Select
                        name="experienceType"
                        value={experience.experienceType}
                        onChange={(e) => handleChange(e, index)}
                      >
                        <option>Full Time</option>
                        <option>Part Time</option>
                        <option>Freelance</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
    
                <Form.Group controlId={`description${index}`} className="mb-2">
                  <Form.Label className=" label">Description</Form.Label>
                  <Form.Control
                  className="input"
                    as="textarea"
                    name="description"
                    placeholder="Enter description"
                    value={experience.description}
                    onChange={(e) => handleChange(e, index)}
                    rows={2}
                  />
                </Form.Group>
    
                <Form.Group controlId={`currentWork${index}`} className="mb-2">
                  <Form.Check
                  className="checkBox py-3"
                    type="checkbox"
                    label="I'm Currently Working Here"
                    name="currentWork"
                    checked={experience.currentWork}
                    onChange={(e) => handleChange(e, index)}
                  />
                </Form.Group>
              </div>
            ))}
    
            {/* Add Experience Button */}
            <Button variant="" onClick={addExperience} className="mb-3">
              + Add Experience
            </Button>


            <div className="group">
            <h5 className="mt-5 mb-3">Skills</h5>
            <Form.Group controlId="skills">
                  <Form.Label className=" label">Write Down your skills</Form.Label>
                  <Form.Control
                  className="input"
                    placeholder="Write Here"
                  />
                </Form.Group>
                <p className="mt-4">Skills:</p>
                <div className="spans d-flex flex-wrap">
                <span className=' p-2 ms-2 mb-2 rounded-3'>Figma</span>
                <span className=' p-2 ms-2 mb-2 rounded-3'>Figma</span>
                <span className=' p-2 ms-2 mb-2 rounded-3'>Figma</span>
                <span className=' p-2 ms-2 mb-2 rounded-3'>Figma</span>
                <span className=' p-2 ms-2 mb-2 rounded-3'>Figma</span>
                <span className=' p-2 ms-2 mb-2 rounded-3'>Figma</span>
                <span className=' p-2 ms-2 mb-2 rounded-3'>Figma</span>

              </div>
            </div>
            <div className="group">
            <h5 className="mt-5 mb-3">Tools</h5>
            <Form.Group controlId="skills">
                  <Form.Label className=" label">Write down the tools you use</Form.Label>
                  <Form.Control
                  className="input"
                    placeholder="Write Here"
                  />
                </Form.Group>
                <p className="mt-4">Tools:</p>
                <div className="spans d-flex flex-wrap">
                <span className=' p-2 ms-2 mb-2 rounded-3'>Figma</span>
                <span className=' p-2 ms-2 mb-2 rounded-3'>Figma</span>
                <span className=' p-2 ms-2 mb-2 rounded-3'>Figma</span>
                <span className=' p-2 ms-2 mb-2 rounded-3'>Figma</span>
                <span className=' p-2 ms-2 mb-2 rounded-3'>Figma</span>
                <span className=' p-2 ms-2 mb-2 rounded-3'>Figma</span>
                <span className=' p-2 ms-2 mb-2 rounded-3'>Figma</span>

              </div>
            </div>
            <div className="group">
            <h5 className="mt-5 mb-3">Languages:</h5>
            <Form.Group controlId="skills">
                  <Form.Label className=" label">Write down the Languages you speak</Form.Label>
                  <Form.Control
                  className="input"
                    placeholder="Write Here"
                  />
                </Form.Group>
                <p className="mt-4">Languages::</p>
                <div className="spans d-flex flex-wrap">
                <span className=' p-2 ms-2 mb-2 rounded-3'>Figma</span>
                <span className=' p-2 ms-2 mb-2 rounded-3'>Figma</span>
                <span className=' p-2 ms-2 mb-2 rounded-3'>Figma</span>
               
              </div>
            </div>
            
    
            {/* Submit Button */}
            <button className="p-2 rounded-2 float border-0" type="submit">
              Submit
            </button>
          </Form>
        </div>
        </div>
       
      );
};

export default Cv;
