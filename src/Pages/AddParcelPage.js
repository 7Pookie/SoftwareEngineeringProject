import "../Styles/AddParcelPage.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const AddParcelPage = () => {
    const navigate = useNavigate();
    const [formData , setFormData] = useState({
      serviceName: "",
      orderNumber: "",
      date: "",
      description: "",
      otp: "",
      receptionUser: false,
      receptionStaff: false,
      receptionUserByStaff: false 
    });

    async function handleForm(e){
      e.preventDefault();
      const response = await axios.post("http://localhost:3001/parcel/createParcel" , formData , {withCredentials: true});
      console.log(response.data);
      navigate("/home")
    }
    
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
            <li><a href="#"><u>ADD PARCEL</u></a></li>
            <li><a className="point-hover" onClick={() => navigate("/studentcomplaints")}>COMPLAINTS</a></li>
          </ul>
        </nav>
      </header>

      {/* Add parcel Form */}
      <main className="content">
        <div className="parcel-title2">
           <h2><i>ADD PARCEL</i></h2>
           <div className="add-symbol"></div>
        </div>

        <div className="add-parcel-section">
          <h4>Enter Delivery service name<span style={{ color: 'red' }}>*</span></h4>
          <input onChange={(e) => {
            setFormData(prev => (
              {...prev , serviceName: e.target.value}
            ))
          }}  className="parcel-input" type="text" placeholder="Enter service name" />
          <h4>Enter Parcel order Number<span style={{ color: 'red' }}>*</span></h4>
          <input onChange={(e) => {
            setFormData(prev => ({
              ...prev, orderNumber: e.target.value
          }))
          }} className="parcel-input" type="text" placeholder="Enter order number" />
          <h4>Enter Date of delivery<span style={{ color: 'red' }}>*</span></h4>
          <input onChange={(e) => {
            setFormData(prev => ({
              ...prev, date: e.target.value
          }))
          }}  className="parcel-input" type="text" placeholder="Enter delivery date" />
          <h4>Description of Parcel, if any</h4>
          <input onChange={(e) => {
            setFormData(prev => ({
              ...prev, description: e.target.value
          }))
          }} className="parcel-description" placeholder="Describe your parcel"></input><br></br>
          <h4>OTP, if provided</h4>
          <input onChange={(e) => {
            setFormData(prev => ({
              ...prev, otp: e.target.value
          }))
          }} className="parcel-input" type="text" placeholder="Enter OTP" />
        </div>
        <button onClick={handleForm} className="submit-button">Submit</button>
      </main>
    </div>
  );
};

export default AddParcelPage;
