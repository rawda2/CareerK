import React, { useState } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import logo from "./../../assets/navLogo.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { Pointer } from "lucide-react";

const NavBar = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const [Notifs, setNotifications] = useState([]);
  const hasUnread = Notifs.some((notif) => !notif.is_read);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const response = await axios.get(`${API_URL}/notifications`, {
          headers: {
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Notifications:", response.data);
        setNotifications(response.data.notifications);
      } catch (error) {
        console.error("Error get Notifications:", error);
      }
    };
    getNotifications();
  }, []);

  const navigate = useNavigate();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const toggleLogoutPopup = () => {
    setShowLogoutPopup(!showLogoutPopup);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const [showNotif, setShowNoti] = useState(false);
  const handleNotify = () => {
    setShowNoti(!showNotif);
  };
  const markAsRead = async (id) => {
    try {
      await axios.patch(
        `${API_URL}/notifications/${id}/read`,
        {}, // body is empty
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true", // optional if needed
          },
        }
      );
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, is_read: true } : notif
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };
  const markAllAsRead = async () => {
    try {
      await axios.patch(
        `${API_URL}/notifications/read-all`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true", // optional if needed
          },
        }
      );
      // Optionally: refresh or update all notifications as read
      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, is_read: true }))
      );
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className=" container-fluid px-5 py-2 d-flex justify-content-between align-items-center">
          <Link className="navbar-brand  mt-1">
            <img src={logo} alt="Logo" />
          </Link>
          <div className=" w-75 " id="navbarNav">
            <ul className="navbar-nav w-100 d-flex justify-content-center mt-3">
              <li className="nav-item me-5">
                <Link className="nav-link" to={"/home"}>
                  Home
                </Link>
              </li>
              <li className="nav-item me-5">
                <Link className="nav-link" to={"/courses"}>
                  Courses
                </Link>
              </li>
              <li className="nav-item me-5">
                <Link className="nav-link" to={"/jops"}>
                  Job Matching
                </Link>
              </li>
              <li className="nav-item me-5">
                <Link className="nav-link" to={"/roadmaps"}>
                  Roadmaps
                </Link>
              </li>
              <li className="nav-item me-5">
                <Link className="nav-link" to={"/comm"}>
                  Community
                </Link>
              </li>
            </ul>
          </div>
          <div className=" d-flex align-items-center w-15 ms-2">
            <div className="nav-item me-2 d-flex flex-column align-items-center">
              <span
                className="nav-link position-relative"
                onClick={handleNotify}
              >
                <i className="fa-regular fa-bell mt-3 ms-2 p-2 profile rounded-circle"></i>
                {hasUnread && (
                  <span
                    className="position-absolute circle  translate-middle p-1 bg-danger border border-light rounded-circle"
                    style={{ width: "10px", height: "10px" }}
                  ></span>
                )}
              </span>
            </div>
 <div className="nav-item d-flex flex-column align-items-center">
              <Link className="nav-link" to={"/privateChat"}>
                <i className=" fa-solid fa-comment-dots  mt-3 me-2  p-2 profile rounded-circle"></i>
              </Link>
            </div>
            <div className="nav-item d-flex flex-column align-items-center">
              <Link className="nav-link" to={"/profile"}>
                <i className="fa-regular fa-user  mt-3 me-2  p-2 profile rounded-circle"></i>
              </Link>
            </div>
            <div className="nav-item d-flex flex-column align-items-center">
              <span onClick={toggleLogoutPopup}>
                <i className="fa-solid fa-right-from-bracket  mt-3  ms-1 p-2 profile rounded-circle"></i>
              </span>
            </div>
          </div>
        </div>
      </nav>
      {showNotif ? (
        <>
          <div className="notify p-3 shadow">
            <div className="head d-flex flex-row-reverse  ">
              <i
                className="fa-solid fa-xmark fa-xl my-2 text-danger "
                onClick={handleNotify}
                style={{ cursor: "pointer" }}
              ></i>
            </div>

            <div className="notes mt-3">
              {Notifs.length > 0 ? (
                Notifs.map((notification) => (
                  <div
                    key={notification.id}
                    className={`note d-flex align-items-center mb-2 mt-3 p-2 ${
                      !notification.is_read ? "unread-notification" : ""
                    }`}
                  >
                    <div className="note-img me-3">
                      {notification.type === "job_acceptance" ? (
                        <i className="fa-solid fa-circle-check fa-xl text-success"></i>
                      ) : notification.type === "job_rejection" ? (
                        <i className="fa-solid fa-circle-xmark fa-xl text-danger"></i>
                      ) : (
                        <i className="fa-solid fa-circle-info fa-xl text-primary"></i>
                      )}
                    </div>
                    <div className="caption flex-grow-1">
                      <h6
                        className={`mb-1 fw-bold d-flex align-items-center justify-content-between pe-5 ${
                          notification.is_read ? "text-muted" : ""
                        }`}
                      >
                        {notification.title}
                        {!notification.is_read && (
                          <div className="ms-2">
                            <span className="badge">New</span>
                          </div>
                        )}
                      </h6>

                      <p
                        className={`mb-1 ${
                          notification.is_read ? "text-muted" : ""
                        }`}
                      >
                        {notification.message}
                      </p>
                      <small className="text-muted d-flex justify-content-between pe-3">
                        {new Date(notification.created_at).toLocaleString()}
                        <span
                          className=" text-decoration-none i"
                          style={{ cursor: "pointer" }}
                          onClick={() => markAsRead(notification.id)}
                        >
                          Mark as read{" "}
                        </span>
                      </small>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-3">
                  <i className="fa-regular fa-bell-slash fa-2x text-muted mb-2"></i>
                  <p>No new notifications</p>
                </div>
              )}
            </div>
            <div className="footer p-0 mt-2 bg-transparent  d-flex justify-content-between">
              <span
                className="text-decoration-none i d-flex align-items-center "
                onClick={markAllAsRead}
                style={{ cursor: "pointer" }}
              >
                <i className="fa-solid fa-check me-2"></i> Mark All as read
              </span>
            </div>
          </div>
        </>
      ) : null}
      {showLogoutPopup && (
        <div className="overlay">
          <div className="logout-popup p-4 rounded-4 shadow position-relative text-center bg-light">
            <div className="title d-flex justify-content-between">
              <h4>Logout</h4>
              <i className="fa-solid fa-xmark" onClick={toggleLogoutPopup}></i>
            </div>
            <p>Are you sure you want to logout?</p>
            <div className="d-flex justify-content-end gap-2">
              <button className="btn btn-outline-danger">
                <Link id="link" onClick={handleLogout}>
                  LogOut
                </Link>
              </button>
              <button className="btn btn-danger" onClick={toggleLogoutPopup}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
