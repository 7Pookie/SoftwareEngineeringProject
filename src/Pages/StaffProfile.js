import "../Styles/StaffProfile.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
const StaffProfile = () => {
  const navigate = useNavigate();
  const [data , setData] = useState([]);

  useEffect(function(){
    try{
      const dataFetch = async () => {
        
        const userData = await axios.get("http://localhost:3001/owner/", {
          withCredentials: true 
      });
        console.log(userData)
        setData(userData.data);
        console.log(userData.data)
      }
      dataFetch();
    }catch(err){
      console.log(err)
    }
  } , [])


  return (
    <div className="container">
      {/* Header Section */}
      <header className="header">
        <div className="top-section">
          <div className="profile-circle">A</div>
          <h1 className="title">DELIVERY MANAGEMENT</h1>
          <button>Logout</button>
        </div>
        <nav className="nav-bar">
          <ul className="nav-links">
            <li><a href="/home">HOME</a></li>
            <li><a className="cursor-hover" onClick={() => navigate("/staffparcelstatus")}>PARCEL STATUS</a></li>
            <li><a className="cursor-hover" onClick={() => navigate("/staffcomplaints")}>COMPLAINTS</a></li>
            <li><a className="cursor-hover" onClick={() => navigate("/staff-feedbackview")}>FEEDBACK</a></li>
          </ul>
        </nav>
      </header>

      {/* Main Content Section */}
      <main className="content">
        <h2 className="profile-title"><i>My Profile</i></h2>
        <div className="profile-section">
          <table>
            <tbody>
              <tr>
                <td><strong>Name</strong></td>
                <td>{data.name}</td>
              </tr>
              <tr>
                <td><strong>NITC Email Address</strong></td>
                <td>{data.email}</td>
              </tr>
              <tr>
                <td><strong>Staff ID</strong></td>
                <td>{data.id}</td>
              </tr>
              <tr>
                <td><strong>Mobile Number</strong></td>
                <td>{data.mobileNumber}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default StaffProfile;
