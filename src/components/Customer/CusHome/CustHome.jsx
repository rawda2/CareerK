import { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import "./CustHome.css";
import Loader from "../../Loader/Loader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getStatusClass = (status) => {
  const map = {
    Active: "badge ms-0 active",
    Complete: "badge ms-0 success",
    Remove: "badge ms-0 danger",
    Archive: "badge ms-0 arch",
  };
  return map[status] || "badge ms-0 secondary";
};

export default function CustHome() {
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/customer/service-posts-with-applicant-details`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true",
            },
            withCredentials: false,
            validateStatus: function (status) {
              return status === 200;
            },
          }
        );

        // Check if response is HTML (ngrok intercept)
        if (
          typeof response.data === "string" &&
          response.data.includes("<!DOCTYPE html>")
        ) {
          throw new Error(
            "API request was intercepted. Check your backend URL and configuration."
          );
        }

        if (response.data) {
          setServices(response.data);
          console.log(response.data)
        } else {
          throw new Error("Unexpected API response format");
        }
      } catch (err) {
        console.error("API Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/customer/service-posts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      setServices((prev) => prev.filter((service) => service.id !== id));
      setMenuOpenId(null);
      toast.success("Task Deleted successfully!");
    } catch (err) {
      console.error("Failed to delete service:", err);
      toast.error("Task Deletion Fail !");
      
    }
  };

  const toggleMenu = (id) => {
    setMenuOpenId((prevId) => (prevId === id ? null : id));
  };

  if (error) {
    return <div className="px-5 mt-5 text-danger">Error: {error}</div>;
  }

  return (
    <>
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
         <section className="main px-5 mt-5">
      
      <nav className="px-5 d-flex justify-content-between align-items-center">
        <h3>Services</h3>
        <button className="Btn py-1 ">
          <Link className="link text-light" to={"/createTask"}>
            New Service
          </Link>
        </button>
      </nav>

      {loading ? (
        <div className="px-5 mt-5">
          <Loader />
        </div>
      ) : (
        <Container className="py-5">
          {services.length > 0 ? (
            <Row xs={1} md={2} lg={3} className="g-4">
              {services.map((svc) => (
                <Col key={svc.id} className="position-relative">
                  <Link
                    to={`/details/${svc.id}`}
                    state={{ svc }}
                    className="text-decoration-none text-dark "
                  >
                    <div className="p-3 task shadow-sm rounded border bg-white h-100 d-flex flex-column justify-content-between">
                      <nav className=" d-flex justify-content-between align-items-center">
                        <span className={getStatusClass("Active")}>Active</span>
                        <i
                          className="fa-solid fa-ellipsis-h bg-transparent"
                          onClick={(e) => {
                            e.preventDefault();
                            toggleMenu(svc.id);
                          }}
                          style={{ cursor: "pointer" }}
                        ></i>{" "}
                      </nav>
                      <h6 className="mt-2">{svc.title}</h6>
                      <p className="text-muted small">{svc.description}</p>
                      <p className="text-muted small">
                        {" "}
                        {svc.required_skills?.join(", ") ||
                          "No skills specified"}
                      </p>
                      <div className="caption d-flex justify-content-between ms-0 ps-0  text-muted small">
                        <span className=" ms-0">
                          {" "}
                          Created At :{" "}
                          {new Date(svc.postedDate).toLocaleDateString()}
                        </span>
                        <span>
                          {svc.serviceType}
                          {/* DeadLine:{" "}
                          {new Date(svc.deadline).toLocaleDateString()} */}
                        </span>
                      </div>
                    </div>
                  </Link>

                    {menuOpenId === svc.id && (
                      <div
                        className="dropdown-menu show position-absolute top-10 end-10 mt-2 p-2 border bg-white shadow rounded"
                        style={{ zIndex: 10 }}
                      >
                        <button
                          className="dropdown-item text-warning"
                        >
                          Edit Post
                        </button>
                        <button
                          className="dropdown-item text-danger"
                          onClick={() => handleDelete(svc.id)}
                        >
                          Delete
                        </button>
                        
                      </div>
                    )}
                </Col>
              ))}
            </Row>
          ) : (
            !loading && !error && <p className="px-5">No services available</p>
          )}
        </Container>
      )}
    </section>
    </>
 
  );
}
