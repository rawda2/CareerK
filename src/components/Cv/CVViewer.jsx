import React from 'react';
import { Container, Row, Col, Image, Badge } from 'react-bootstrap';
import './CVViewer.css';

const CVViewer = ({ cvData }) => {
  return (
    <Container className="cv-container mt-4 mb-5">
      {/* Header Section */}
      <Row className="cv-header align-items-center mb-4">
        <Col md={3} className="text-center">
          {cvData.photo && (
            <Image 
              src={URL.createObjectURL(cvData.photo)} 
              roundedCircle 
              className="cv-photo"
              alt="Profile"
            />
          )}
        </Col>
        <Col md={9} className="cv-title">
          <h1 className="mb-1">{cvData.personal_info.name}</h1>
          <h4 className="text-muted">{cvData.personal_info.title}</h4>
          <div className="cv-contact mt-2">
            <p>
              <i className="bi bi-envelope me-2"></i>
              {cvData.personal_info.email}
            </p>
            <p>
              <i className="bi bi-phone me-2"></i>
              {cvData.personal_info.phone}
            </p>
            <p>
              <i className="bi bi-geo-alt me-2"></i>
              {cvData.personal_info.address}
            </p>
            {cvData.personal_info.linkedin && (
              <p>
                <i className="bi bi-linkedin me-2"></i>
                <a href={cvData.personal_info.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn Profile
                </a>
              </p>
            )}
            {cvData.personal_info.portfolio && (
              <p>
                <i className="bi bi-globe me-2"></i>
                <a href={cvData.personal_info.portfolio} target="_blank" rel="noopener noreferrer">
                  Portfolio
                </a>
              </p>
            )}
          </div>
        </Col>
      </Row>

      {/* Main Content */}
      <Row>
        <Col md={8}>
          {/* Professional Summary */}
          <section className="cv-section mb-4">
            <h2 className="section-title">
              <i className="bi bi-person-lines-fill me-2"></i>
              Professional Summary
            </h2>
            <p className="summary-text">
              {cvData.summary || 'Experienced professional with a proven track record...'}
            </p>
          </section>

          {/* Experience */}
          <section className="cv-section mb-4">
            <h2 className="section-title">
              <i className="bi bi-briefcase me-2"></i>
              Work Experience
            </h2>
            {cvData.experience.map((exp, index) => (
              <div key={index} className="experience-item mb-3">
                <h4 className="job-title">{exp.position}</h4>
                <div className="job-meta">
                  <span className="company-name">{exp.company}</span>
                  <span className="text-muted mx-2">|</span>
                  <span className="job-dates">{exp.dates}</span>
                </div>
                <ul className="achievements-list">
                  {exp.achievements.map((ach, idx) => (
                    <li key={idx}>{ach}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Projects */}
          <section className="cv-section mb-4">
            <h2 className="section-title">
              <i className="bi bi-code-square me-2"></i>
              Projects
            </h2>
            {cvData.projects.map((project, index) => (
              <div key={index} className="project-item mb-3">
                <h4 className="project-title">{project.title}</h4>
                <p className="project-description">{project.description}</p>
                <div className="project-tech mb-2">
                  {project.technologies.map((tech, idx) => (
                    <Badge key={idx} bg="secondary" className="me-2">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <ul className="project-results">
                  {project.results.map((result, idx) => (
                    <li key={idx}>{result}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        </Col>

        <Col md={4}>
          {/* Skills */}
          <section className="cv-section mb-4">
            <h2 className="section-title">
              <i className="bi bi-tools me-2"></i>
              Skills
            </h2>
            <div className="skills-container">
              {cvData.skillsets.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-name">{skill}</div>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: '80%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="cv-section mb-4">
            <h2 className="section-title">
              <i className="bi bi-mortarboard me-2"></i>
              Education
            </h2>
            {cvData.education.map((edu, index) => (
              <div key={index} className="education-item mb-3">
                <h4 className="degree">{edu.degree} in {edu.field}</h4>
                <div className="institution">{edu.institution}</div>
                <div className="education-meta">
                  <span>{edu.start_date} - {edu.end_date}</span>
                  {edu.gpa && <span className="gpa">GPA: {edu.gpa}</span>}
                </div>
              </div>
            ))}
          </section>

          {/* Certifications */}
          <section className="cv-section mb-4">
            <h2 className="section-title">
              <i className="bi bi-award me-2"></i>
              Certifications
            </h2>
            {cvData.certifications.map((cert, index) => (
              <div key={index} className="certification-item mb-2">
                <h5 className="cert-name">{cert.name}</h5>
                <div className="cert-meta">
                  <span className="issuer">{cert.issuer}</span>
                  <span className="date"> - {cert.date}</span>
                </div>
              </div>
            ))}
          </section>

          {/* Languages */}
          <section className="cv-section">
            <h2 className="section-title">
              <i className="bi bi-translate me-2"></i>
              Languages
            </h2>
            {cvData.additional.find(item => item.title === 'Languages') && (
              <div className="languages">
                {cvData.additional
                  .find(item => item.title === 'Languages')
                  .description.split(',')
                  .map((lang, index) => (
                    <div key={index} className="language-item">
                      <span className="language-name">{lang.trim()}</span>
                      <div className="language-proficiency">
                        <span className="proficiency-dot filled"></span>
                        <span className="proficiency-dot filled"></span>
                        <span className="proficiency-dot filled"></span>
                        <span className="proficiency-dot"></span>
                        <span className="proficiency-dot"></span>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default CVViewer;