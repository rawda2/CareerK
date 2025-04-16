import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './ContinueAs.css';
import logo from './../../assets/logo (2).png'
import home from './../../assets/home.png'
import person from './../../assets/person.png'
import { useNavigate } from 'react-router-dom';



const ContinueAs = ({ onSelect = () => {} }) => {
    const navigate = useNavigate();

    const handleSelect = (type) => {
      onSelect(type);
      if (type === 'developer') {
        navigate('/signup');
      }
    };
  return (
    <div className="continue-as-container">
      <img 
        src={logo} 
        alt="Careerk Logo" 
        className="logo"
      />
      
      <div className="content-wrapper">
        <h1 className="title">Continue as a</h1>
        
        <div className="options-container">
          <Card className="option-card" onClick={() => handleSelect('developer')}>
            <Card.Body className="option-content">
              <Card.Img 
                src={person}
                alt="Developer Icon" 
                className="option-icon"
              />
              <Card.Title className="option-title">Developer</Card.Title>
              <Button variant="light" className="circle-icon">
                <img 
                  src="https://dashboard.codeparrot.ai/api/image/Z-FERf8PKu40N2N-/frame-10-2.png" 
                  alt="Select Developer" 
                  className="select-icon"
                />

              </Button>
            </Card.Body>
          </Card>

          <Card className="option-card" onClick={() => handleSelect('company')}>
            <Card.Body className="option-content">
              <Card.Img 
                src={home}
                alt="Company Icon" 
                className="option-icon"
              />
              <Card.Title className="option-title">Company</Card.Title>
              <Button variant="light" className="circle-icon">
                <img 
                  src="https://dashboard.codeparrot.ai/api/image/Z-FERf8PKu40N2N-/frame-10-2.png" 
                  alt="Select Company" 
                  className="select-icon"
                />
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContinueAs;
