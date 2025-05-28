import React from 'react';
import './ContinueAs.css';
import logo from './../../assets/logo (2).png';
import home from './../../assets/home.png';
import person from './../../assets/person.png';
import customer from './../../assets/vector.png';
import { useNavigate } from 'react-router-dom';

const ContinueAs = ({ onSelect = () => {} }) => {
  const navigate = useNavigate();

  const handleSelect = (type) => {
    onSelect(type);
    if (type === 'developer') {
      navigate('/signup');
    }
    if (type === 'company') {
      navigate('/csignup');
    }
    if (type === 'customer') {
      navigate('/custsignUp');
    }
  };

  return (
    <div className="continue-as-container">
      <img src={logo} alt="Careerk Logo" className="logo" />

      <div className="content-wrapper">
        <h1 className="title">Continue as a</h1>

        <div className="options-container row w-100 d-flex flex-nowrap">
          <div className="col-md-4 mb-3" onClick={() => handleSelect('developer')}>
            <div className="option-card px-5 py-4 h-100">
              <div className="card-body d-flex flex-column align-items-center option-content">
                <img src={person} alt="Developer Icon" className="option-icon mb-3" />
                <h5 className="card-title option-title">Developer</h5>
                <button className=" btn-light  circle-icon d-flex justify-content-center align-items-center mt-3">
                  <img
                    src="https://dashboard.codeparrot.ai/api/image/Z-FERf8PKu40N2N-/frame-10-2.png"
                    alt="Select Developer"
                    className="select-icon"
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3" onClick={() => handleSelect('company')}>
            <div className=" option-card px-5 py-4 h-100">
              <div className="card-body d-flex flex-column align-items-center option-content">
                <img src={home} alt="Company Icon" className="option-icon mb-3" />
                <h5 className="card-title option-title">Company</h5>
                <button className=" btn-light  circle-icon d-flex justify-content-center align-items-center mt-3">
                  <img
                    src="https://dashboard.codeparrot.ai/api/image/Z-FERf8PKu40N2N-/frame-10-2.png"
                    alt="Select Company"
                    className="select-icon"
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3" onClick={() => handleSelect('customer')}>
            <div className=" option-card px-5 py-4 h-100">
              <div className="card-body d-flex flex-column align-items-center option-content">
                <img src={customer} alt="Customer Icon" className="option-icon mb-3" />
                <h5 className="card-title option-title">Customer</h5>
                <button className=" btn-light  circle-icon d-flex justify-content-center align-items-center mt-3">
                  <img
                    src="https://dashboard.codeparrot.ai/api/image/Z-FERf8PKu40N2N-/frame-10-2.png"
                    alt="Select Customer"
                    className="select-icon"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContinueAs;
