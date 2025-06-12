import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./CustHome.css";
import { Link } from "react-router-dom";
const tasks = [
  {
    id: 1,
    status: "Active",
    title: "Senior UI/UX Designer Needed",
    description: "Looking for an experienced UI/UX designer to enhance our app’s UX.",
    date: "February 23, 2023",
    time: "10:30 AM",
    applications: 15,
    applicants: [
      {
        id: 1,
        name: "Ali Hassan",
        role: "UI Designer",
        price: "$900",
        duration: "20 Days",
        desc: "Qorem ipsum dolor sit amet, consectetur adipiscing elit...",
        jobsCompleted: 35,
        experienceYears: 5,
        previousJobs: "Redesigned mobile app for XYZ Bank; Worked on SaaS dashboard for Fintech startup"
      },
      {
        id: 2,
        name: "Sara Mohamed",
        role: "UX Expert",
        price: "$1100",
        duration: "25 Days",
        desc: "Qorem ipsum dolor sit amet, consectetur adipiscing elit...",
        jobsCompleted: 42,
        experienceYears: 6,
        previousJobs: "Led UX audit for e-commerce site; UX revamp of healthcare platform"
      }
    ],
    daysToComplete: 25,
    totalMoney: 2000
  },
  {
    id: 2,
    status: "Complete",
    title: "Senior UI/UX Designer",
    description: "Seeking a talented UI/UX designer to create engaging interfaces.",
    date: "February 13, 2023",
    time: "11:30 AM",
    applications: 15,
    applicants: [
      {
        id: 3,
        name: "Kareem Youssef",
        role: "UX Researcher",
        price: "$1000",
        duration: "22 Days",
        desc: "Qorem ipsum dolor sit amet, consectetur adipiscing elit...",
        jobsCompleted: 28,
        experienceYears: 4,
        previousJobs: "Conducted user research for logistics app; Interviews for government portal"
      }
    ],
    daysToComplete: 22,
    totalMoney: 1000
  },
  {
    id: 3,
    status: "Remove",
    title: "Marketing Specialist Needed",
    description: "Looking for a marketing specialist to handle social media campaigns.",
    date: "February 25, 2023",
    time: "10:30 AM",
    applications: 10,
    applicants: [
      {
        id: 4,
        name: "Mona Elsayed",
        role: "Social Media Expert",
        price: "$800",
        duration: "15 Days",
        desc: "Qorem ipsum dolor sit amet, consectetur adipiscing elit...",
        jobsCompleted: 50,
        experienceYears: 7,
        previousJobs: "Managed campaigns for fashion brand; Scaled TikTok presence for startup"
      }
    ],
    daysToComplete: 15,
    totalMoney: 800
  },
  {
    id: 4,
    status: "Active",
    title: "Senior UI/UX Designer Needed",
    description: "Looking for an experienced UI/UX designer to enhance our app’s UX.",
    date: "February 23, 2023",
    time: "10:30 AM",
    applications: 15,
    applicants: [],
    daysToComplete: 0,
    totalMoney: 0
  },
  {
    id: 5,
    status: "Remove",
    title: "Marketing Specialist Needed",
    description: "Looking for a marketing specialist to handle social media campaigns.",
    date: "February 25, 2023",
    time: "10:30 AM",
    applications: 10,
    applicants: [],
    daysToComplete: 0,
    totalMoney: 0
  },
  {
    id: 6,
    status: "Archive",
    title: "Senior UI/UX Designer",
    description: "Seeking a talented UI/UX designer to create engaging interfaces.",
    date: "February 13, 2023",
    time: "11:30 AM",
    applications: 15,
    applicants: [
      {
        id: 5,
        name: "Omar Farouk",
        role: "UI/UX Designer",
        price: "$950",
        duration: "18 Days",
        desc: "Qorem ipsum dolor sit amet, consectetur adipiscing elit...",
        jobsCompleted: 31,
        experienceYears: 5,
        previousJobs: "Built UI system for project management app; Freelance work on Upwork"
      }
    ],
    daysToComplete: 18,
    totalMoney: 650
  }
];




const getStatusClass = (status) => {
  switch (status) {
    case "Active":
      return "badge ms-0  active";
    case "Complete":
      return "badge ms-0 success";
    case "Remove":
      return "badge ms-0 danger";
    case "Archive":
      return "badge ms-0  arch";

    default:
      return "badge  secondary";
  }
};

export default function CustHome() {
  return (
    <>
      <section className="main px-5 mt-5">
        <nav className="px-5 d-flex justify-content-between align-items-center">
          <h3>Tasks</h3>
          <button className="Btn py-1">
            <i className="p-0 bg-transparent text-light fa-solid fa-plus"></i>{" "}
            <Link className="link" to={"/createTask"}>
              New Task
            </Link>
          </button>
        </nav>

        <Container className=" py-5">
          <Row xs={1} md={2} lg={3} className="g-4">
            {tasks.map((task) => (
              <Col key={task.id}>
                <Link
                  to={`/details/${task.id}`} state={{task}}
                  className="text-decoration-none text-dark"
                >
                  <div className="p-3 task shadow-sm rounded border bg-white h-100">
                    <span className={getStatusClass(task.status)}>
                      {task.status}
                    </span>
                    <h6 className="mt-2">{task.title}</h6>
                    <p className="text-muted small">{task.description}</p>
                    <div className="caption d-flex justify-content-between align-items-center text-muted small">                
                        <span className="ms-0">
                        {task.date} - {task.time}
                      </span>
                      <span className="ms-0">
                        {task.applications} Application
                        {task.applications > 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}
