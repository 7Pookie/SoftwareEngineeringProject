import "../Styles/StudentComplaints.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const StudentComplaints = () => {
  const complaints = [
    { number: "1231-1244-24134", comp: "Parcel to be delivered today not received yet", resolved: "Yes"},
    { number: "4747-7874-6874", comp: "Status has not been updated correctly", resolved: "No"},
  ];
    const navigate = useNavigate();
    
    const [form , setForm] = useState({
      orderNumber: "",
      description: "",
      resolved: false
    });

    const [data , setData] = useState([]);

    async function handleForm(){
      const response = await axios.post("http://localhost:3001/complaint/createComplaint" , form , {withCredentials: true});
      navigate("/home")
      console.log(response.data)
    }


    useEffect(() => {
      const dataFetch = async () => {
        const tempData = await axios.get("http://localhost:3001/complaint" , {withCredentials: true});
        setData(tempData.data);
      }
      dataFetch();
    } , [])
    


  return (
    <div className="container">
      {/* Header Section */}
      <header className="header">
        <div className="top-section">
          <div className="profile-circle" onClick={() => navigate("/studentprofile")}>A</div>
          <h1 className="title">DELIVERY MANAGEMENT</h1>
          <div className="Logout-symbol"></div>
        </div>
        <nav className="nav-bar">
          <ul className="nav-links">
            <li><a href="/home">HOME</a></li>
            <li><a className="pointer-hover" onClick={() => navigate("/addparcel")}>ADD PARCEL</a></li>
            <li><a href="#"><u>COMPLAINTS</u></a></li>
          </ul>
        </nav>
      </header>

      {/* Complaint Form */}
      <main className="content">
        <h2 className="complaint-title"><i>Complaint</i></h2>
        <div className="complaint-section">
          <h4>Enter Parcel Order Number</h4>
          <input onChange={(e) => {
            setForm(prev => (
              {...prev , orderNumber: e.target.value}
            ))
          }} type="text" placeholder="Enter order number" />
          <h4>What is your complaint?</h4>
          <input onChange={(e) => {
            setForm(prev => (
              {...prev , description: e.target.value}
            ))
          }} className="complaint-description" placeholder="Describe your complaint"></input><br></br>
          <button onClick={handleForm} className="place-complaint-button">Place Complaint</button>
        </div>

        {/* Complaints List */}
        <h2 className="your-complaints-title"><i>Your Complaints</i></h2>
        <div className="complaints-list">
          <table>
            <thead>
              <tr>
                <th>Parcel Order Number</th>
                <th>Complaint</th>
                <th>Resolved</th>
              </tr>
            </thead>
            <tbody>
            {data.map((complaint, index) => (
                <tr key={index}>
                  <td className="clickable-parcel"
                  onClick={() => navigate("/studentparceldetails/" + complaint.parcelOrderNumber)}>
                  {complaint.parcelOrderNumber}</td>
                  <td className="complaint_info">{complaint.description}</td>
                  <td>{complaint.resolved ? "Resolved" : "Pending"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default StudentComplaints;
