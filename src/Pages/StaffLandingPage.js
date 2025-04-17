import { useNavigate } from "react-router-dom";
import "../Styles/StaffLandingPage.css";
import React, { useEffect  , useState} from "react";
import axios from "axios"

const clearSearch = () => {
    document.getElementById("search-input").value = "";
  };  
const StaffLandingPage = () => {
  const navigate = useNavigate();
  const [tempData , setTempData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const allParcels = await axios.get("http://localhost:3001/parcel/getAll" , {withCredentials: true});
      allParcels.data.sort((a, b) => a.serviceName.localeCompare(b.serviceName));
      setTempData(allParcels.data);
    }
    fetchData();
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
          <div className="profile-circle" onClick={() => navigate("/staffprofile")}>A</div>
          <h1 className="title">DELIVERY MANAGEMENT</h1>
          <button id="logOut-btn" onClick={logOut}>Logout</button>
        </div>
        <nav className="nav-bar">
          <ul className="nav-links">
            <li><a href="/staff"><u>HOME</u></a></li>
            <li><a className="cursor-hover" onClick={() => navigate("/staffparcelstatus")}>PARCEL STATUS</a></li>
            <li><a className="cursor-hover" onClick={() => navigate("/staffcomplaints")}>COMPLAINTS</a></li>
            <li><a className="cursor-hover" onClick={() => navigate("/staff-feedbackview")}>FEEDBACK</a></li>
          </ul>
        </nav>
      </header>

      {/* Main Content Section */}
      <main className="content">
      <h3><i>Upcoming parcels</i></h3>
 
        <div className="parcel-section">
          <table>
            <thead>
              <tr className="table-header">
                <th>Parcel number</th>
                <th>Delivery service</th>
                <th>Parcel date</th>
                <th>Student Name</th>
                <th>Email</th>
                
              </tr>
            </thead>
            <tbody>
              {tempData.map((parcel, index) => (
                <tr key={index}>
                  <td className="clickable-parcel"
                  onClick={() => navigate("/staffparceldetails/" + parcel.parcelOrderNumber)}>
                    {parcel.parcelOrderNumber}</td>
                  <td>{parcel.serviceName}</td>
                  <td>{parcel.dateOfDeleivery}</td>
                  <td>{parcel.email}</td>
                  <td>{parcel.email}</td>
           
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default StaffLandingPage;
