import "../Styles/StudentProfile.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const StudentProfile = () => {
  const navigate = useNavigate();
  const [data , setData] = useState([]);
  const [character , setCharacter] = useState("A");

  useEffect(function(){
    try{
      const dataFetch = async () => {
        const userData = await axios.get("http://localhost:3001/student/", {
          withCredentials: true 
      });
        console.log(userData)
        setData(userData.data[0]);
        setCharacter(userData.data[0].name.charAt(0))
        console.log(userData.data)
      }
      dataFetch();
    }catch(err){
      console.log(err)
    }
  } , [])

  function logOut() {
    const func = async () => {
      await axios.get("http://localhost:3001/student/logout",{
        withCredentials: true,
      });
      navigate("/");
    };
    func();
  }
  

  return (
    <div className="container">
      {/* Header Section */}
      <header className="header">
        <div className="top-section">
          <div className="profile-circle">{character}</div>
          <h1 className="title">DELIVERY MANAGEMENT</h1>
          <div className="Logout-symbol"></div>
        </div>
        <nav className="nav-bar">
          <ul className="nav-links">
            <li><a href="/home">HOME</a></li>
            <li><a className="pointer-hover"onClick={() => navigate("/addparcel")}>ADD PARCEL</a></li>
            <li><a className="pointer-hover"onClick={() => navigate("/studentcomplaints")}>COMPLAINTS</a></li>
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
                <td><strong>Roll Number</strong></td>
                <td>{data.rollNumber}</td>
              </tr>
              <tr>
                <td><strong>Course</strong></td>
                <td>{data.course}</td>
              </tr>
              <tr>
                <td><strong>Hostel</strong></td>
                <td>{data.hostel}</td>
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

export default StudentProfile;
