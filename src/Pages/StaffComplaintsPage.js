import { useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import "../Styles/StaffComplaintsPage.css";
import axios from "axios"
import React from "react";  
const StaffComplaintsPage = () => {
 
  const navigate = useNavigate();
  const [data , setData] = useState([]);
  const [text , setText] = useState(false);

  useEffect(() => {
    const fun = async () => {
      const temp = await axios.get(" http://localhost:3001/complaint/getAll");
      setData(temp.data);
    }
    fun();
  } , [])

  return (
    <div className="container">
      {/* Header Section */}
      <header className="header">
        <div className="top-section">
          <div className="profile-circle" onClick={() => navigate("/staffprofile")}>A</div>
          <h1 className="title">DELIVERY MANAGEMENT</h1>
          <div className="Logout-symbol"></div>
        </div>
        <nav className="nav-bar">
          <ul className="nav-links">
            <li><a href="/staff">HOME</a></li>
            <li><a className="cursor-hover"onClick={() => navigate("/staffparcelstatus")}>PARCEL STATUS</a></li>
            <li><a href="#"><u>COMPLAINTS</u></a></li>
            <li><a className="cursor-hover"onClick={() => navigate("/staff-feedbackview")}>FEEDBACK</a></li>
          </ul>
        </nav>
      </header>

      {/* Main Content Section */}
      <main className="content">
      <h2><u><i>Student Complaints</i></u></h2>
        <div className="parcel-section">
          <table>
            <thead>
              <tr className="table-header">
                <th>Parcel Order Number</th>
                <th>Student Name</th>
          
                <th>Complaint</th>
                <th>Issue Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((comp, index) => (
                <tr key={index}>
                  <td className="">
                    {comp.parcelOrderNumber}</td>
                  <td>{comp.email}</td>
                  <td className="">{comp.description}</td>
                  <td>
                    {!comp.resolved ? <button id="complaint-btn" onClick={
                      async () => {
                        
                        const parcelOrderNumber = comp.parcelOrderNumber;
                        await axios.post("http://localhost:3001/complaint/update" , {parcelOrderNumber} , {withCredentials: true})
                        
                      }
                    }>Resolved</button> : "Resolved" }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
};

export default StaffComplaintsPage;
