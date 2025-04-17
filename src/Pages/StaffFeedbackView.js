import { useNavigate } from "react-router-dom";
import "../Styles/StaffFeedbackView.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
const clearSearch = () => {
    document.getElementById("search-input").value = ""; // Clears the search input
  };  
const StaffFeedbackView = () => {
  const parcels = [
    { number: "1231-1244-24134", student: "David", rollno: "B22XXXXCS", rating: "5", feedback: "Got the parcel on time" },
    { number: "4747-7874-6874", student: "Mike", rollno: "B23XXXXME", rating: "4", feedback: "-" },
    { number: "9093-1430-0439", student: "Emma", rollno: "B23XXXXPE", rating: "4.5", feedback: "-" },
    { number: "1653-4637-9325", student: "Jacob", rollno: "M24XXXXCS", rating: "3", feedback: "Notification not sent on time" },
    { number: "1788-9037-6735", student: "Helen", rollno: "B21XXXXEE", rating: "5", feedback: "-" },
    { number: "1788-9037-6735", student: "Lucy", rollno: "B24XXXXEC", rating: "4.5", feedback: "-" },
    { number: "1788-9037-6735", student: "Charles", rollno: "B23XXXXCS", rating: "3.5", feedback: "-" },
  ];

  const [data , setData] = useState([]);

  useEffect(() => {
    try{
      const dataFetch = async () => {
        const userData = await axios.get("http://localhost:3001/feedback/", {
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

  const navigate = useNavigate();
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
            <li><a className="cursor-hover" onClick={() => navigate("/staffparcelstatus")}>PARCEL STATUS</a></li>
            <li><a className="cursor-hover" onClick={() => navigate("/staffcomplaints")}>COMPLAINTS</a></li>
            <li><a href="#"><u>FEEDBACK</u></a></li>
          </ul>
        </nav>
      </header>

      {/* Main Content Section */}
      <main className="content">
      <h2><u><i>Student Feedbacks</i></u></h2>
        <div className="parcel-section">
          <table>
            <thead>
              <tr className="table-header">
                <th>Parcel Order Number</th>
                <th>Feedback</th>
              </tr>
            </thead>
            <tbody>
              {data.map((parcel, index) => (
                <tr key={index}>
                  <td>
                    {parcel.parcelOrderNumber}</td>
                  <td>{parcel.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default StaffFeedbackView;
