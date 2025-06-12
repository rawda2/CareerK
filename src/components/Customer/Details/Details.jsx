import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Details.css";
import calnder from "./../../../assets/Group.png";
import money from "./../../../assets/tdesign_money-filled.png";
export default function Details() {
  const location = useLocation();
  const task = location.state?.task;
  if (!task) {
    return <p>⚠️ No task found. Did you refresh the page?</p>;
  }

  return (
    <section className=" px-5 py-3">
      <nav className="px-5 d-flex justify-content-between align-items-center">
        <h3>Task Applicants</h3>
        <button className="Btn py-1">
          <i className="p-0 bg-transparent text-light fa-solid fa-plus"></i>{" "}
          <Link className="link" to={"/createTask"}>
            Edit Task
          </Link>
        </button>
      </nav>
      <div className="container mt-5">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <div className=" d-flex gap-4">
          <p className="line"></p>

          <p>
            <strong>
              <img src={calnder} alt="" className="w-5 mb-1" />
            </strong>{" "}
            {task.daysToComplete} Days To complete Task
          </p>
          <p className="line"></p>
          <p className="i">
            <strong>
              <img src={money} alt="" className="w-5 mb-1" />
            </strong>{" "}
            {task.totalMoney}$ Per Task
          </p>
        </div>

        <hr />

        {task.applicants.length === 0 ? (
          <p className="text-muted">No applicants yet.</p>
        ) : (
          <div className="row">
            {task.applicants.map((applicant) => (
              <>
                <Link  to="/applicant"
  state={{ applicant }}
  className="text-decoration-none text-dark">
                  {" "}
                  <div key={applicant.id} className="col-md-12 mb-4">
                    <div className="p-3 border rounded bg-light">
                      <h5>{applicant.name}</h5>
                      <h6 className="text-muted mb-1 ">{applicant.role}</h6>
                      <p>{applicant.desc}</p>
                      <div className=" d-flex justify-content-between mt-4">
                        <div className=" d-flex gap-4">
                          <p className="line"></p>

                          <p>
                            <strong>
                              <img src={calnder} alt="" className="w-5 mb-1" />
                            </strong>{" "}
                            {applicant.duration} Days To complete Task
                          </p>
                          <p className="line"></p>
                          <p className="i">
                            <strong>
                              <img src={money} alt="" className="w-5 mb-1" />
                            </strong>{" "}
                            {applicant.price}$ Per Task
                          </p>
                        </div>
                        <div className="mt-2 d-flex gap-3 ">
                          <button className="btn btn-outline-danger btn-sm">
                            Decline
                          </button>
                          <button className="Btn  py-2 btn-sm">Contact</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
