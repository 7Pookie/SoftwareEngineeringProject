import "../Styles/StudentParcelDetails.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"

const StudentParcelDetails = () => {
    const navigate = useNavigate();
    const [data , setData] = useState("");
    const {parcelOrderNumber} = useParams();

    useEffect(() => {
      console.log(parcelOrderNumber)
      const dataFetch = async () => {
        const res = await axios.get(`http://localhost:3001/parcel/getById/${parcelOrderNumber}`, {
            withCredentials: true
        });
        console.log(res.data);
        setData(res.data[0]); // Extract the first (and only) object
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
        {/* <nav className="nav-bar">
          <ul className="nav-links">
            <li><a href="/">HOME</a></li>
            <li><a className="pointer-hover" onClick={() => navigate("/addparcel")}>ADD PARCEL</a></li>
            <li><a className="pointer-hover" onClick={() => navigate("/studentcomplaints")}>COMPLAINTS</a></li>
          </ul>
        </nav> */}
        </header>
         {/* Main Content Section */}
      <main className="content">
        <h2 className="parcel-detail-title"><i>Parcel Details</i></h2>
        <div className="detail-section">
          <table>
            <tbody>
              <tr>
                <td><strong>Delivery Service Name</strong></td>
                <td>{data.serviceName}</td>
              </tr>
              <tr>
                <td><strong>Parcel order Number</strong></td>
                <td>{parcelOrderNumber}</td>
              </tr>
              <tr>
                <td><strong>Date of delivery</strong></td>
                <td>{data.dateOfDeleivery}</td>
              </tr>
              <tr>
                <td><strong>Description of parcel</strong></td>
                <td className="parcel_info">{data.description}</td>
              </tr>
              <tr>
                <td><strong>OTP</strong></td>
                <td>{data.otp}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="button-section">
        <button className="button back-btn" onClick={() => navigate(-1)}><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABCElEQVR4nO2WvYrCQBRGY+1PIRi02M5iS+3tfCiL1ecQxRfY3cbKchcVEcVtFExr5w9speXCkWGvEEVMouYKktOEKeY7c+/MJLGsiEcC2MAP0NWWzvhnpCXNAFOROkD2OaUGYMLt7GTRTaBsKYpP+QbyXmL3oTJP29eKjzPiQAF4A1aS9QuUQpe7spLAu0ueDyIfXyuWrBjwIVlffibYsufDW8Suytci93fg7gVQFXFDW1wQsaMtToh4qy1OHS72o1rd1hbXRFzRbvMG+ANetKTmBfIp1bY0Kz1IF0A67GtTlD017TUsgddLkwZAP8C4jzcdIOe1WhPUCzg+9yMwB+qen8KICCsk9pWmbwXtUJ6RAAAAAElFTkSuQmCC"
                            alt="back-logo" className="back-img" /><span className="back">Back</span></button>
     
        </div>
      </main>
        </div>
    );
};

export default StudentParcelDetails;
