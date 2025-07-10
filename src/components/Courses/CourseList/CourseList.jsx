import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import "./CourseList.css";

export default function CourseList() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await axios.get(
          `${API}/tracks-page/tracks/${id}/courses`,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCourses(response.data.courses);
        console.log(response.data.courses)
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getCourses();
    }
  }, [id, API, token]);

  if (loading) {
    return (
      <Container className="px-3">
        <Row className="mt-3 g-3">
          {[...Array(6)].map((_, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3}>
              <Card className="h-100">
                <div className="ratio ratio-16x9 bg-light"></div>
                <Card.Body>
                  <div className="placeholder-glow">
                    <span className="placeholder col-8 mb-2"></span>
                    <span className="placeholder col-6"></span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }

  return (
    <section className="main px-5 px-md-4 mt-5">
      {/* <div className="search-bar mb-4">
        <div className="input-group">
          <span className="input-group-text bg-white border-end-0">
            <i className="fas fa-search text-muted"></i>
          </span>
          <input
            type="search"
            className="form-control border-start-0 ps-0"
            placeholder="Search courses..."
          />
        </div>
      </div> */}

      <Container fluid className=" px-5">
        <Row className="g-3">
          {courses.map((course) => (
            <Col key={course.id} xs={12} sm={6} md={4} lg={3}>
              <Card className="h-100 shadow-sm hover-shadow transition-all">
                <div className="ratio ratio-16x9 ">
                  <Card.Img
                    variant="top"
                    src={course.image_url}
                    alt={course.name}
                    className=" "
                  />
                </div>
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex align-items-center mb-2">
                    <div className="text-warning me-1">
                      <ReactStars
                        count={5}
                        value={course.average_rating}
                        size={20}
                        edit={false}
                        isHalf={true}
                        activeColor="#ffd700"
                      />
                    </div>
                    <small className="text-muted ms-1">
                      ({course.average_rating})
                    </small>
                  </div>

                  <Card.Title className="h6 mb-2 flex-grow-1">
                    {course.name}
                  </Card.Title>

                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <small className="text-muted">
                      {course.total_lessons} lessons
                    </small>
                    <button className="btnn  p-1 px-3"><Link
  className="text-decoration-none i"
  to={`/course/${course.course_id}?trackId=${id}`}
>
  View
</Link></button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
