import { useNavigate } from "react-router-dom";
import "../Styles/StudentLandingPage.css";
import axios from "axios"
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const StudentLandingPage = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [parcels , setParcels] = useState([]);

   const [data , setData] = useState([]);
    const [character , setCharacter] = useState("A");

  useEffect(function(){
    const tempData = async () => {
      const parcelData = await axios.get("http://localhost:3001/parcel" , {withCredentials: true});
      const hello = parcelData.data;
      hello.sort((a, b) => {
        return a.serviceName.localeCompare(b.serviceName);
      });
      setParcels(hello);
    }
    tempData();



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


  } , [])


  async function logOut(){
    await axios.get("http://localhost:3001/student/logout" , {withCredentials: true});
    navigate("/")
  }

  return (
    <div className="container">
      {/* Header Section */}
      <header className="header">
        <div className="top-section">
          <div className="profile-circle" onClick={() => navigate("/studentprofile")}>{character}</div>
          <h1 className="title">DELIVERY MANAGEMENT</h1>
          <button id="logOut-btn" onClick={logOut}>Logout</button>
        </div>
        <nav className="nav-bar">
          <ul className="nav-links">
            <li><a href="/home"><u>HOME</u></a></li>
            <li><a className="pointer-hover" onClick={() => navigate("/addparcel")}>ADD PARCEL</a></li>
            <li><a className="pointer-hover" onClick={() => navigate("/studentcomplaints")}>COMPLAINTS</a></li>
          </ul>
        </nav>
      </header>

      {/* Main Content Section */}
      <main className="content">
        <h2>Welcome {data.name}</h2>
        <h3>Your parcels</h3>
        <div className="parcel-section">
          <table>
            <thead>
              <tr className="table-header">
                <th>Parcel number</th>
                <th>Delivery service</th>
                <th>Parcel date</th>
                <th>Staff Status</th>
                <th>Your Status</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, index) => (
                <tr key={index}>
                  <td className="clickable-parcel"
                  onClick={() => {
                    navigate("/studentparceldetails/" + parcel.parcelOrderNumber)
                  }}>
                  {parcel.parcelOrderNumber}</td>
                  <td>{parcel.serviceName}</td>
                  <td>{parcel.dateOfDeleivery}</td>
                  <td>{parcel.receptionStaff ? "Received" : "Pending"}</td>
                  <td className="text-center" onClick={() => navigate("/feedbackform")}>
                   {!parcel.receptionUser ? <button id="parcel-btn">Received</button> : "Received"}
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


export default StudentLandingPage
