import "../Styles/FeedbackForm.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
const FeedbackForm = () => {
    const navigate = useNavigate();
    const [form , setForm] = useState({
      description: "",
      parcelOrderNumber: ""
    });

    async function handleForm(){
      const response = await axios.post("http://localhost:3001/feedback/createFeedback" , form , {withCredentials: true});
      const parcelOrderNumber = form.parcelOrderNumber;
      const update = await axios.post("http://localhost:3001/parcel/updateStatus" , {parcelOrderNumber} , {withCredentials: true} );
      navigate("/home");
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
        </header>
         {/* Main Content Section */}
         <main className="content">
        <h2 className="complaint-title"><i>Feedback Form</i></h2>
        <div className="complaint-section">
         
        <br/>
          <h4>Enter your feedback if any</h4>
          <input onChange={(e) => {
            setForm(prev => (
              {...prev , description: e.target.value}
            ))
          }} className="complaint-description" placeholder="Give your feedback"></input><br></br>

          <h4>Parcel Order Number</h4>
          <input onChange={(e) => {
            setForm(prev => (
              {...prev , parcelOrderNumber: e.target.value}
            ))
          }} className="complaint-description" placeholder="Parcel Order Number"></input><br></br>

          <button className="place-complaint-button" onClick={handleForm}>Submit feedback</button>
        </div>
        </main>
        </div>
    );
};

export default FeedbackForm;
