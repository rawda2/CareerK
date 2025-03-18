import React from 'react'
import './RoadMaps.css'
export default function RoadMaps() {
    const roadmaps = [
        {
          id: 1,
          category: "Front End",
          title: "HTML & CSS Basics",
          duration: "15 Hours",
          startPoint: "Learn HTML structure and CSS styling.",
          endPoint: "Build a simple webpage with responsive design."
        },
        {
          id: 2,
          category: "Front End",
          title: "JavaScript Fundamentals",
          duration: "20 Hours",
          startPoint: "Understand JavaScript syntax and data types.",
          endPoint: "Develop interactive UI elements using JavaScript."
        },
        {
          id: 3,
          category: "Front End",
          title: "React.js Basics",
          duration: "25 Hours",
          startPoint: "Learn about components, props, and state.",
          endPoint: "Create a simple React app with routing."
        },
        {
          id: 4,
          category: "Back End",
          title: "Node.js & Express",
          duration: "30 Hours",
          startPoint: "Set up a Node.js server and understand APIs.",
          endPoint: "Create a RESTful API using Express."
        },
        {
          id: 5,
          category: "Back End",
          title: "Databases & SQL",
          duration: "35 Hours",
          startPoint: "Understand relational databases and SQL queries.",
          endPoint: "Design a database schema for a web application."
        },
        {
          id: 6,
          category: "Full Stack",
          title: "MERN Stack Development",
          duration: "50 Hours",
          startPoint: "Learn MongoDB, Express.js, React, and Node.js.",
          endPoint: "Build a full-stack web application."
        },
        {
          id: 7,
          category: "DevOps",
          title: "Deployment & Hosting",
          duration: "20 Hours",
          startPoint: "Understand CI/CD and version control.",
          endPoint: "Deploy a full-stack application using cloud services."
        },
        {
          id: 8,
          category: "UI/UX",
          title: "Designing User Interfaces",
          duration: "18 Hours",
          startPoint: "Learn UI/UX design principles.",
          endPoint: "Create wireframes and design prototypes."
        }
      ];
      
  return (
    <>

   <div className=" d-flex flex-column justify-content-center align-items-center mt-0 py-4">
    <h4 className=' hBold'>Role-based Roadmaps</h4>
   <div className="maps w-100 d-flex flex-wrap p-5 gap-3 justify-content-center align-items-center">
     {roadmaps.map((map)=>(
      <div className="roadmap d-flex w-48 " key={map.id}>
        <div className="h p-2 w-20">
        <h4 className=' d-flex  align-items-center justify-content-center'>{map.category}</h4>

        </div>
        <div className="details ms-2 pt-2 d-flex flex-column justify-content-center">
            <h5>{map.title}</h5>
            <p>{map.duration}</p>
            <span className=' text-success'><i className=' fa-solid fa-forward-step'></i> Start Point </span>
            <p>{map.startPoint}</p>
            <span className=' text-danger'><i className=' fa-solid fa-backward-step'></i> End Point </span>
            <p>{map.endPoint}</p>

        </div>

      </div>


      ))}
     </div>
   </div>
   <hr />
   <div className=" d-flex flex-column justify-content-center align-items-center mt-0 py-4">
    <h4 className=' hBold'>Role-based Roadmaps</h4>
   <div className="maps w-100 d-flex flex-wrap p-5 gap-3 justify-content-center align-items-center">
     {roadmaps.map((map)=>(
      <div className="roadmap d-flex w-48 " key={map.id}>
        <div className="h p-2 w-20">
        <h4 className=' d-flex  align-items-center justify-content-center'>{map.category}</h4>

        </div>
        <div className="details ms-2 pt-2 d-flex flex-column justify-content-center">
            <h5>{map.title}</h5>
            <p>{map.duration}</p>
            <span className=' text-success'><i className=' fa-solid fa-forward-step'></i> Start Point </span>
            <p>{map.startPoint}</p>
            <span className=' text-danger'><i className=' fa-solid fa-backward-step'></i> End Point </span>
            <p>{map.endPoint}</p>

        </div>

      </div>


      ))}
     </div>
   </div>
    
     
    </>
  )
}
