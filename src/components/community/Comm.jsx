import React, { useState, useEffect } from "react";
import "./Comm.css";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";

import main from "./../../assets/work.png";
import pers1 from "./../../assets/pers1.png";
import pers2 from "./../../assets/pers2.png";
import pers3 from "./../../assets/pers3.png";
import pers4 from "./../../assets/pers4.png";
import pers5 from "./../../assets/pers5.png";
import pers6 from "./../../assets/pers6.png";
import pers7 from "./../../assets/pers7.png";
import pers8 from "./../../assets/pers8.png";

const members = [
  { id: 1, name: "R", image: pers8 },
  { id: 2, name: "F", image: pers2 },
  { id: 3, name: "K", image: pers3 },
  { id: 4, name: "A", image: pers4 },
  { id: 5, name: "L", image: pers5 },
  { id: 6, name: "L", image: pers6 },
  { id: 7, name: "L", image: pers7 },
  { id: 8, name: "L", image: pers1 },
];

const Comm = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [groups, setGroups] = useState([]);
  const [joined, setJoined] = useState([]);
  const [current, setCurrent] = useState("groups");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAllGroups = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/community/groups`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
          Authorization: `Bearer ${token}`,
        },
      });
      setGroups(response.data.groups || []);
    } catch (err) {
      setError("Error fetching groups.");
    } finally {
      setLoading(false);
    }
  };

  const fetchJoinedGroups = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/community/my-groups`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
          Authorization: `Bearer ${token}`,
        },
      });
      setJoined(response.data.groups || []);
    } catch (err) {
      setError("Error fetching joined groups.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllGroups();
  }, []);

  const handleJoin = async (chat_room_id) => {
    try {
      const response = await axios.post(
        `${API_URL}/community/join/${chat_room_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Successfully joined the group! 🎉");
      } else {
        toast.info("You have already joined this group.");
      }
    } catch (err) {
      if (err.response?.status === 400) {
        toast.info("You're already a member of this group.");
      } else if (err.response?.status === 401) {
        toast.error("Unauthorized! Please login again.");
      } else {
        toast.error("Something went wrong. Try again later.");
      }
    }
  };
  const handleLeave=async(chat_room_id)=>{
  try{
    const respoonse=await axios.delete(`${API_URL}/community/leave/${chat_room_id}`,{
      headers: {
          Authorization: `Bearer ${token}`,
        },

    })
    console.log(respoonse)
  }
  catch(err){
    console.log(err)
  }
}
const GroupCard = ({ group, showJoin = true, onNavigate }) => (
  <div
    key={group.id}
    className="community-card mb-5 me-4 mt-5 shadow-sm px-5  d-flex align-items-center card-hover"
  >
    <div className="d-flex align-items-start w-100">
      <img src={main} alt="Pitch" className="pitch-logo" />
      <div className="ms-3 w-100">
        <div className="d-flex align-items-center justify-content-between">
          <h5 className="fw-bold">{group.group_name}</h5>
          <div className="d-flex gap-2">
            {showJoin ? (
              <button
                className="btnn border-0"
                onClick={(e) => {
                  e.stopPropagation();
                  handleJoin(group.chat_room_id);
                }}
              >
                <i className="fa-solid fa-right-to-bracket"></i> Join
              </button>
            ) : (
              <button
                className="btnn border-0 text-danger"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLeave(group.chat_room_id);
                  toast.success("Left the group successfully.");
                  fetchJoinedGroups(); // refresh list
                }}
              >
                <i className="fa-solid fa-arrow-alt-circle-left text-danger"></i> Leave
              </button>
            )}
            {/* ✅ Details button to navigate */}
            {!showJoin && (
              <button
                className="btnn border-0 btn-details"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate(group);
                }}
              >
                <i className="fa-solid fa-comments"></i> Chat
              </button>
            )}
          </div>
        </div>

        <p className="text-muted fw-bold community-bio">{group.interest_tag}</p>
        <p className="w-75 mt-3">
          A supportive JavaScript community for all levels, offering discussions,
          challenges, and resources on core concepts and modern frameworks like
          React and Node.js.
        </p>
      </div>
    </div>

    {showJoin && (
      <div className="ms-auto d-flex align-items-center me-5 flex-column">
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
    )}
  </div>
);




  return (
    <>
      <nav className="my-0 d-flex flex-row-reverse pe-5 me-5 py-5 mb-5 gap-3 mt-4">
        <button
          className={`btnn ${current === "groups" ? "active" : ""}`}
          onClick={() => {
            setCurrent("groups");
            fetchAllGroups();
          }}
        >
          All Groups
        </button>
        <button
          className={`btnn ${current === "joined" ? "active" : ""}`}
          onClick={() => {
            setCurrent("joined");
            fetchJoinedGroups();
          }}
        >
          My Groups
        </button>
      </nav>

      <ToastContainer position="bottom-right" autoClose={3000} />

      {loading ? (
        <Loader />
      ) : (
      <section className="all px-5 mt-0">
  {(current === "groups" ? groups : joined).map((group) => (
    <GroupCard
      key={group.id}
      group={group}
      showJoin={current === "groups"}
      onNavigate={
        current === "joined"
          ? (group) => navigate(`/chat/${group.chat_room_id}`, { state: { group } })
          : null
      }
    />
  ))}
</section>

      )}
    </>
  );
};

export default Comm;
