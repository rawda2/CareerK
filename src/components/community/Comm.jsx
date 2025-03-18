import React from "react";
import "./Comm.css";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import pers1 from './../../assets/pers1.png'
import pers2 from './../../assets/pers2.png'
import pers3 from './../../assets/pers3.png'
import pers4 from './../../assets/pers4.png'
import pers5 from './../../assets/pers5.png'
import pers6 from './../../assets/pers6.png'
import pers7 from './../../assets/pers7.png'
import pers8 from './../../assets/pers8.png'
import main from './../../assets/work.png'

const Comm = () => {
  const members = [
    { id: 1, name: "R", image: pers8},
    { id: 2, name: "F", image: pers2 },
    { id: 3, name: "K", image: pers3 },
    { id: 4, name: "A", image: pers4 },
    { id: 5, name: "L", image: pers5 },
    { id: 6, name: "L", image: pers6 },
    { id: 7, name: "L", image: pers7 },
    { id: 8, name: "L", image: pers1 },

  ];

  return (
    <>
    <section className="all p-5">
    <div className="community-card mb-5 me-4 mt-5 shadow-sm px-5 d-flex align-items-center">
      {/* Left Section */}
      <div className="d-flex align-items-start">
        <img src={main} alt="Pitch" className="pitch-logo" />
        <div className="ms-3">
          <h5 className="fw-bold">Front End</h5>
          <p className="text-muted community-bio">
            Bio about the community Dorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.
          </p>
          <h6 className="fw-bold mt-3">What is Included</h6>
          <span className="badge  me-3">onsite</span>
          <span className="badge ">onsite</span>
        </div>
      </div>

      {/* Right Section - Members */}
      <div className="ms-auto d-flex align-items-center me-5">
        <div className="members-group">
          {members.map((member) => (
            <OverlayTrigger
              key={member.id}
              placement="top"
              overlay={<Tooltip>{member.name}</Tooltip>}
            >
              <img src={member.image} alt={member.name} className="member-avatar" />
            </OverlayTrigger>
          ))}
        </div>
      </div>
    </div>
    <div className="community-card mb-5 me-4 mt-5 shadow-sm px-5 d-flex align-items-center">
      {/* Left Section */}
      <div className="d-flex align-items-start">
        <img src={main} alt="Pitch" className="pitch-logo" />
        <div className="ms-3">
          <h5 className="fw-bold">Front End</h5>
          <p className="text-muted community-bio">
            Bio about the community Dorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.
          </p>
          <h6 className="fw-bold mt-3">What is Included</h6>
          <span className="badge  me-3">onsite</span>
          <span className="badge ">onsite</span>
        </div>
      </div>

      {/* Right Section - Members */}
      <div className="ms-auto d-flex align-items-center me-5">
        <div className="members-group">
          {members.map((member) => (
            <OverlayTrigger
              key={member.id}
              placement="top"
              overlay={<Tooltip>{member.name}</Tooltip>}
            >
              <img src={member.image} alt={member.name} className="member-avatar" />
            </OverlayTrigger>
          ))}
        </div>
      </div>
    </div> <div className="community-card mb-5 me-4 mt-5 shadow-sm px-5 d-flex align-items-center">
      {/* Left Section */}
      <div className="d-flex align-items-start">
        <img src={main} alt="Pitch" className="pitch-logo" />
        <div className="ms-3">
          <h5 className="fw-bold">Front End</h5>
          <p className="text-muted community-bio">
            Bio about the community Dorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.
          </p>
          <h6 className="fw-bold mt-3">What is Included</h6>
          <span className="badge  me-3">onsite</span>
          <span className="badge ">onsite</span>
        </div>
      </div>

      {/* Right Section - Members */}
      <div className="ms-auto d-flex align-items-center me-5">
        <div className="members-group">
          {members.map((member) => (
            <OverlayTrigger
              key={member.id}
              placement="top"
              overlay={<Tooltip>{member.name}</Tooltip>}
            >
              <img src={member.image} alt={member.name} className="member-avatar" />
            </OverlayTrigger>
          ))}
        </div>
      </div>
    </div> <div className="community-card mb-5 me-4 mt-5 shadow-sm px-5 d-flex align-items-center">
      {/* Left Section */}
      <div className="d-flex align-items-start">
        <img src={main} alt="Pitch" className="pitch-logo" />
        <div className="ms-3">
          <h5 className="fw-bold">Front End</h5>
          <p className="text-muted community-bio">
            Bio about the community Dorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.
          </p>
          <h6 className="fw-bold mt-3">What is Included</h6>
          <span className="badge  me-3">onsite</span>
          <span className="badge ">onsite</span>
        </div>
      </div>

      {/* Right Section - Members */}
      <div className="ms-auto d-flex align-items-center me-5">
        <div className="members-group">
          {members.map((member) => (
            <OverlayTrigger
              key={member.id}
              placement="top"
              overlay={<Tooltip>{member.name}</Tooltip>}
            >
              <img src={member.image} alt={member.name} className="member-avatar" />
            </OverlayTrigger>
          ))}
        </div>
      </div>
    </div>
    </section>
  
    </>
    
  );
};

export default Comm;
