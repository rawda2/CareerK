import { useEffect, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Details.css";
import calnder from "./../../../assets/Group.png";
import money from "./../../../assets/tdesign_money-filled.png";
import { ToastContainer, toast } from "react-toastify";

export default function Details() {
  const { id } = useParams();
  const location = useLocation();
  const [task, setTask] = useState(location.state?.svc || null);
  const [applicants, setApplicants] = useState([]);

  const [loading, setLoading] = useState(!location.state?.svc);
  const [error, setError] = useState("");

  console.log("Token:", localStorage.getItem("token"));
  console.log("Task ID:", id);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/service-application/post/${id}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "ngrok-skip-browser-warning": "true",
            },
          }
        );
        setApplicants(response.data.applications);
        console.log(response.data.applications);
      } catch (err) {
        console.error("Failed to fetch task:", err);
        setError(err.response?.data?.message || "Failed to load task details");
      } finally {
        setLoading(false);
      }
    };
    fetchTaskDetails();
  }, []);

  const downloadDeveloperCV = async (service_id) => {
    try {
      const API = import.meta.env.VITE_API_URL;

      const response = await axios.get(
        `${API}/cv/download?type=service_application&id=${service_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "ngrok-skip-browser-warning": "true",
          },
          responseType: "blob", // Still needed to handle PDF data
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      // Open the PDF in a new browser tab
      window.open(url, "_blank");

      // Optional: Revoke object URL after a delay
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 1000 * 60); // Revoke after 1 minute
    } catch (error) {
      console.error("Error opening developer CV:", error);
      alert("Failed to open CV. Please try again.");
    }
  };

const handleStatusChange = async (applicationId, newStatus) => {
  console.log("Updating application:", applicationId, "to", newStatus);

  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_API_URL}/service-application/${applicationId}/status`,
      { status: newStatus },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      }
    );

    setApplicants((prevApplicants) =>
      prevApplicants.map((app) =>
        app.id === applicationId ? { ...app, status: newStatus } : app
      )
    );

    toast.success("Status updated successfully");
  } catch (error) {
    console.error("Full error:", {
      message: error.message,
      url: error.config?.url,
      response: error.response?.data,
    });
    toast.error(error.response?.data?.message || "Failed to update status");
  }
};

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="alert alert-danger mt-3">{error}</div>;
  if (!task) return <p className="mt-3">No task found</p>;


  return (
    <section className="px-5 py-3">
       <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
      <nav className="px-5 d-flex justify-content-between align-items-center">
        <h3>Task Applicants</h3>
        <button className="Btn py-1">
          <i className="p-0 bg-transparent text-light fa-solid fa-plus"></i>
          <Link className="link" to={`/editTask/${task.id}`}>
            Edit Task
          </Link>
        </button>
      </nav>

      <div className="container mt-5">
        <h3>{task.title}</h3>
        <p>{task.description}</p>

        <div className="d-flex gap-4 align-items-center">
          <p className="line"></p>
          <p>
            <img src={calnder} alt="" className="w-5 mb-1" />
            Task Deadline: {new Date(task.deadline).toLocaleString()}
          </p>
          <p className="line"></p>
          <p>
            <img src={money} alt="" className="w-5 mb-1" />
            {task.budget_range} Per Task
          </p>
        </div>

        <hr />

        {applicants.length === 0 ? (
          <p className="text-muted">No applicants yet.</p>
        ) : (
          <div className="row">
            {applicants.map((applicant) => (
              <div key={applicant.id} className="col-md-12 mb-4">
                <div className="p-3 border rounded bg-light">
                  <nav className="d-flex justify-content-between">
                    <div className="title d-flex flex-column text-start">
                      <h5>{applicant.name}</h5>
                      <h6 className="text-muted mb-1">
                        {applicant.currentTrack}
                      </h6>
                    </div>
                    <div className="mt-2 d-flex gap-3">
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={(e) => {
                          e.preventDefault();
                          // Handle decline logic here
                        }}
                      >
                        Decline
                      </button>
                      <button
                        className="Btn py-2 btn-sm"
                        onClick={(e) => {
                          e.preventDefault();
                          // Handle contact logic here
                        }}
                      >
                        Contact
                      </button>
                    </div>
                  </nav>

                  <p>{applicant.desc}</p>

                  <div className="d-flex justify-content-between mt-4">
                    <div className="d-flex gap-4">
                      <p className="line"></p>
                      <div className="d-flex flex-column">
                        <p>📩 {applicant.email}</p>
                        <p>📞 {applicant.phone}</p>
                        <p className=" d-flex align-items-center gap-2">
                          <img src={calnder} alt="" className="w-5 mb-1" />
                          Applied at:{" "}
                          {new Date(applicant.created_at).toLocaleString()}
                        </p>
                      </div>
                      <p className="line"></p>
                      <div className="left">
                        <p className="i d-flex gap-1">
                          <img src={money} alt="" className="w-5 mb-1" />
                          {String(applicant.expected_salary).substring(0, 3)} $
                          Per Task
                        </p>
                        <p className="i d-flex gap-2 align-items-center">
                          <i className="fa-solid fa-briefcase"></i>
                          {applicant.years_of_experience} Years Of Experience
                        </p>
                        <label>
                          Status:
                          <select
                            className="p-1 rounded ms-2"
                            value={applicant.status || "pending"} // Fallback to 'pending' if undefined
                            onChange={(e) =>
                              handleStatusChange(
                                applicant.id,
                                e.target.value
                              )
                            }
                            disabled={!applicant.id}
                          >
                            <option value="pending">Pending</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </label>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        downloadDeveloperCV(applicant.id)
                      }
                      className="Btn h-50 mt-5"
                    >
                      View CV
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
