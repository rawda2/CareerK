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
import { useNavigate } from "react-router-dom";

export  const communities = [
    {
      id: 1,
      title: "Front End",
      bio: "Bio about the community Dorem ipsum dolor sit amet, consectetur adipiscing elit.",
      badges: ["onsite", "remote"],
      members: [1, 2, 3]
    },
    {
      id: 2,
      title: "Back End",
      bio: "Backend development community focusing on server-side technologies.",
      badges: ["onsite", "hybrid"],
      members: [4, 5]
    },
    {
      id: 3,
      title: "UI/UX Design",
      bio: "Design community for creating beautiful and functional user interfaces.",
      badges: ["remote", "workshops"],
      members: [6, 7]
    },
    {
      id: 4,
      title: "DevOps",
      bio: "Community for infrastructure, deployment, and automation enthusiasts.",
      badges: ["onsite", "cloud"],
      members: [8, 1]
    },
  ];
const Comm = () => {
  const navigate =useNavigate()
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
 
  const handleCardClick = (id) => {
    navigate(`/chat/${id}`);
  };
  return (
    <>
    <section className="all p-5">
   {communities.map((comm, index) => (
        <div
          key={comm.id}
          className="community-card mb-5 me-4 mt-5 py-5 shadow-sm px-5 d-flex align-items-center card-hover"
          onClick={() => handleCardClick(comm.id)}
          style={{ cursor: "pointer" }}
        >
          {/* Left Section */}
          <div className="d-flex align-items-start">
            <img src={main} alt="Pitch" className="pitch-logo" />
            <div className="ms-3">
              <h5 className="fw-bold">{comm.title}</h5>
              <p className="text-muted community-bio">{comm.bio}</p>
              <h6 className="fw-bold mt-3">What is Included</h6>
              {comm.badges.map((item, idx) => (
                <span className="badge me-3" key={idx}>{item}</span>
              ))}
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
                  <img
                    src={member.image}
                    alt={member.name}
                    className="member-avatar"
                  />
                </OverlayTrigger>
              ))}
            </div>
          </div>
        </div>
      ))}

    </section>
  
    </>
    
  );
};

export default Comm;
