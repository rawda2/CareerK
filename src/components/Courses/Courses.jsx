import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "./../Loader/Loader"
export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await axios.get(`${API}/tracks-page/tracks`, {
          headers: {
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${token}`,
          },
        });
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching tracks:", error);
      } finally {
        setLoading(false);
      }
    };
    getCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center">
        <Loader/>
      </div>  
    );
  }

  return (
<div className="container mt-5">
  <div className="row">
    {courses.map((course) => (
      <div className="col-md-4 mb-4" key={course.track_id}>
        <Link
          to={`/courseList/${course.track_id}`}
          className="text-decoration-none"
        >
          <div className="card h-100 shadow-sm border-0 rounded-2 overflow-hidden">
            <div className="ratio ratio-16x9">
              <img
                src={course.image_url}
                alt={course.track_title}
                className="card-img-top object-fit-cover"
                style={{ borderTopLeftRadius: "0.5rem", borderTopRightRadius: "0.5rem" }}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x300?text=Course+Image";
                }}
              />
            </div>
            <div className="card-img-overlay d-flex justify-content-center align-items-end p-2 bg-dark bg-opacity-50">
              <h5 className="card-title text-white mb-0">
                {course.track_title}
              </h5>
            </div>
          </div>
        </Link>
      </div>
    ))}
  </div>
</div>

  );
}