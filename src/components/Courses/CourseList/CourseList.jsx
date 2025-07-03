import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card, Button } from "react-bootstrap";
import image1 from "./../../../assets/1.png";
import "./CourseList.css";
import image2 from "./../../../assets/2.png";
import image3 from "./../../../assets/3.png";
import image4 from "./../../../assets/5.png";
import image5 from "./../../../assets/6.png";
import image6 from "./../../../assets/7.png";
import avat from "./../../../assets/avat.jpg";
const courses = [
  {
    id: 1,
    title: "BackEnd Code Behind",
    description:
      "Unlock the back-end magic — Node.js, databases, and server logic in one place.",
    instructor: "Mahmoud Ali",
    price: "$678",
    rating: 4.5,
    image: image1,
    instructorAvatar: avat,
  },
  {
    id: 2,
    title: "BackEnd Code Behind",
    description:
      "Unlock the back-end magic — Node.js, databases, and server logic in one place.",
    instructor: "Mahmoud Ali",
    price: "$678",
    rating: 4.5,
    image: image2,
    instructorAvatar: avat,
  },
  {
    id: 3,
    title: "BackEnd Code Behind",
    description:
      "Unlock the back-end magic — Node.js, databases, and server logic in one place.",
    instructor: "Mahmoud Ali",
    price: "$678",
    rating: 4.5,
    image: image3,
    instructorAvatar: avat,
  },
  {
    id: 4,
    title: "BackEnd Code Behind",
    description:
      "Unlock the back-end magic — Node.js, databases, and server logic in one place.",
    instructor: "Mahmoud Ali",
    price: "$678",
    rating: 1,
    image: image4,
    instructorAvatar: avat,
  },
  {
    id: 5,
    title: "BackEnd Code Behind",
    description:
      "Unlock the back-end magic — Node.js, databases, and server logic in one place.",
    instructor: "Mahmoud Ali",
    price: "$678",
    rating: 4.5,
    image: image2,
    instructorAvatar: avat,
  },
  {
    id: 6,
    title: "BackEnd Code Behind",
    description:
      "Unlock the back-end magic — Node.js, databases, and server logic in one place.",
    instructor: "Mahmoud Ali",
    price: "$678",
    rating: 3,
    image: image1,
    instructorAvatar: avat,
  },
  {
    id: 7,
    title: "BackEnd Code Behind",
    description:
      "Unlock the back-end magic — Node.js, databases, and server logic in one place.",
    instructor: "Mahmoud Ali",
    price: "$678",
    rating: 4,
    image: image5,
    instructorAvatar: avat,
  },
  {
    id: 8,
    title: "BackEnd Code Behind",
    description:
      "Unlock the back-end magic — Node.js, databases, and server logic in one place.",
    instructor: "Mahmoud Ali",
    price: "$678",
    rating: 4.5,
    image: image6,
    instructorAvatar: avat,
  },
  {
    id: 9,
    title: "BackEnd Code Behind",
    description:
      "Unlock the back-end magic — Node.js, databases, and server logic in one place.",
    instructor: "Mahmoud Ali",
    price: "$678",
    rating: 4.5,
    image: image2,
    instructorAvatar: avat,
  },
];

export default function CourseList() {
  return (
    <section className="main px-5">
      <div className="search py-1 px-2 rounded-2 mt-1 d-flex ms-5  align-items-center">
        <i className="fa-solid fa-magnifying-glass fa-xl i"></i>
        <input
          type="search"
          className="fa-search  border-0 py-2 px-3"
          placeholder="Job title, Keyword..."
        />
      </div>
      <Container className=" px-3 ms-auto  ">
        <Row className=" mt-5">
          {courses.map((course) => (
            <Col key={course.id} md={4} className="mb-4 ">
              <Card style={{ width: "100%" }}>
                <Card.Img
                  variant="top"
                  src={course.image}
                  alt={course.title}
                  style={{ height: "250px" }}
                />
                <Card.Body>
                  <p className="mb-2 ms-0 px-0 d-flex">
                    {Array.from({ length: 5 }, (_, index) => {
                      const rating = course.rating;
                      if (index + 1 <= Math.floor(rating)) {
                        return (
                          <i
                            key={index}
                            className="fa-solid bg-transparent fa-star text-warning mx-0 px-0 pe-1"
                          ></i>
                        ); // full star
                      } else if (index < rating) {
                        return (
                          <i
                            key={index}
                            className="fa-solid bg-transparent fa-star-half-stroke text-warning mx-0 px-0 pe-1"
                          ></i>
                        ); // half star
                      } else {
                        return (
                          <i
                            key={index}
                            className="fa-regular bg-transparent fa-star text-warning mx-0 px-0 pe-1"
                          ></i>
                        ); // empty star
                      }
                    })}
                    <p className="ms-1 text-muted mt-3">({course.rating})</p>
                  </p>

                  <Card.Title>{course.title}</Card.Title>
                  <Card.Text>{course.description}</Card.Text>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="img d-flex">
                      <img
                        src={course.instructorAvatar}
                        alt={course.instructor}
                        className="rounded-circle me-2"
                        style={{ width: "45px", height: "40px" }}
                      />
                      <small className=" mt-2">{course.instructor}</small>
                    </div>

                    <span className="fw-bold i">{course.price}</span>
                  </div>
                  <div className="d-flex  align-items-center gap-3 mt-3">
                    <button className="btnn">View Course</button>
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
