import { useNavigate } from "react-router-dom";
import "../Styles/StaffParcelStatus.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
const clearSearch = () => {
    document.getElementById("search-input").value = ""; // Clears the search input
  };  
const StaffParcelStatus = () => {

  const navigate = useNavigate();

  const [data , setData] = useState([]);
  useEffect(() => {
    const func = async() => {
      const res = await axios.get("http://localhost:3001/parcel/getAll" , {withCredentials: true});
      setData(res.data);
    }
    func();
  } , []);

 

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
            <li><a href="#"><u>PARCEL STATUS</u></a></li>
            <li><a className="cursor-hover" onClick={() => navigate("/staffcomplaints")}>COMPLAINTS</a></li>
            <li><a className="cursor-hover" onClick={() => navigate("/staff-feedbackview")}>FEEDBACK</a></li>
          </ul>
        </nav>
      </header>

      {/* Main Content Section */}
      <main className="content">
      <h3><i>Received parcels</i></h3>

        <div className="parcel-section">
          <table>
            <thead>
              <tr className="table-header">
                <th>Parcel number</th>
                <th>Email</th>
                <th>Received by Staff</th>
                <th>Received by Student</th>
              </tr>
            </thead>
            <tbody>
              {data.map((parcel, index) => (
                <tr key={index}>
                  <td className="clickable-parcel"
                  onClick={() => navigate("/staffparceldetails/" + parcel.parcelOrderNumber)}>
                    {parcel.parcelOrderNumber}</td>
                  <td>{parcel.email}</td>
                 
                  <td className="text-center">
                    {!parcel.receptionStaff ? <button id="staff-btn" onClick={
                      async() => {
                        const parcelOrderNumber = parcel.parcelOrderNumber;
                        const update = await axios.post("http://localhost:3001/parcel/updateStatusStaff", {parcelOrderNumber} , {withCredentials: true})
                      }
                    }>Received</button> : "Received"}
                  </td>
                  <td className="text-center">
                  {!parcel.receptionUserByStaff ? <button id="std-btn" onClick={
                      async() => {
                        const parcelOrderNumber = parcel.parcelOrderNumber;
                        const update = await axios.post("http://localhost:3001/parcel/updateStatusStaffUser", {parcelOrderNumber} , {withCredentials: true})
                      }
                    }>Received</button> : "Received"}
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

export default StaffParcelStatus;
