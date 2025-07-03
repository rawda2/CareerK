// import { useLocation } from "react-router-dom";

// export default function Applicant() {
//   const location = useLocation();
//   const applicant = location.state?.applicant;

//   if (!applicant) return <p>⚠️ No applicant found. Did you refresh the page?</p>;

//   return (
//     <section className="container py-4">
//       <h2>{applicant.name}</h2>
//       <h5 className="text-muted">{applicant.role}</h5>
//       <p>{applicant.desc}</p>
//       <div className="d-flex gap-4 mt-3">
//         <p><strong>🕒</strong> {applicant.duration} Days</p>
//         <p><strong>💰</strong> {applicant.price}$</p>
//       </div>
//       {/* Add more detailed fields if available */}
//     </section>
//   );
// }
