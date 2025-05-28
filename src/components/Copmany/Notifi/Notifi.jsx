import React from 'react'
import { Link } from 'react-router-dom';
import './Notifi.css'
export default function Notifi() {
    const notifications = [
        {
          id: 1,
          message: "Your job posting 'Frontend Developer' has 5 new applicants.",
          time: "2 mins ago",
          type: "job",
        },
        {
          id: 2,
          message: "New message from Lina Morgan regarding 'UX Designer' role.",
          time: "10 mins ago",
          type: "message",
        },
        {
          id: 3,
          message: "System maintenance scheduled for tomorrow at 2 AM.",
          time: "1 hour ago",
          type: "system",
        },
        {
          id: 4,
          message: "Ahmed Khaled has updated their application.",
          time: "2 hours ago",
          type: "update",
        },
        {
          id: 5,
          message: "Reminder: Review applications for 'DevOps Engineer'.",
          time: "Today",
          type: "reminder",
        }
      ];
      
  return (

    <>
    <section className="Cprofile px-5 py-2 pb-5 d-flex bg-light flex-column align-items-center  justify-content-center">
    <div className="head d-flex justify-content-start text-start w-90 mt-2 ">
<h3>All Notifications</h3>
    
                </div>
    <div className="main w-90 mt-4 mb-2 div">
  
     <div className="notification p-3 shadow">
               
                <div className="notis mt-1 py-3">
                 

                  {notifications.map((noti) => (
                         <>
                          <div className="noti d-flex flex-row align-items-center justify-content-between mb-2 ">
                    <div className="noti-img d-flex align-items-center">
                      <i className=" fa-solid fa-user bg-body-tertiary text-muted fa-xl"></i>  
                      <div className="caption">
                      <p className=" p  mt-4"> {noti.message}</p>              </div>
                      </div>
                     
                    <div className="time justify-content-end">
                      <p className=" p mt-5 me-2">{noti.time}</p>
                    </div>
                  </div>
                         
                         </>       
                    ))}
                  
    










{/*  */}
    
                </div>
              </div>
              </div>
              </section>
     
    </>
  )
}
