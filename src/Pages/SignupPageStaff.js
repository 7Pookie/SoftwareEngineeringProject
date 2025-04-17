import "../Styles/SignupPage.css";
import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const SignupPageStaff = () => {
    const [userType, setUserType] = useState("Staff");
  
    const handleToggle = () => {
      setUserType(userType === "Staff" ? "Staff" : "Student");
    };

    const navigate = useNavigate();
    const [form , setForm] = useState({
      name: "",
      password: "",
      email: "",
      id: "",
      mobileNumber: ""
    })


    async function handleForm(e){
      e.preventDefault()
      const res = await axios.post("http://localhost:3001/owner/register" , form , {withCredentials: true});
      console.log(res)
      if(res.data === "You already have an account. Please login."){
          navigate("/staffLogin")
      }
    }

  return (
    <div className="container">
      {/* Header Section */}
      <header className="header">
        <div className="top-section">
          <h1 className="title">DELIVERY MANAGEMENT</h1>
        </div>
      </header>

      {/* Main Content Section */}
      <div className="signup-container">

      <div className="signup-card">
        <h2 className="signup-title">Signup</h2>

        {/* Toggle Switch */}
        <div className="toggle-container">

                        <label className={userType === "Staff" ? "active" : ""}>
                            <input
                                type="radio"
                                name="userType"
                                value="Staff"
                                checked={userType === "Staff"}
                                onChange={() => setUserType("Staff")}
                            />
                            Staff
                        </label>
          </div>

        {/* Login Form */}
        <input onChange={(e) => {
          setForm(prev => (
            {...prev , email: e.target.value }
          ))
        }} type="email" placeholder="Enter your email" className="input-box" />
        <input onChange={(e) => {
          setForm(prev => (
            {...prev , password: e.target.value }
          ))
        }} type="password" placeholder="Create a password" className="input-box" />
        <input onChange={(e) => {
          setForm(prev => (
            {...prev , name: e.target.value }
          ))
        }} type="name" placeholder="Name" className="input-box" />

        <input onChange={(e) => {
          setForm(prev => (
            {...prev , id: e.target.value }
          ))
        }} type="text" placeholder="ID" className="input-box" />

        <input onChange={(e) => {
          setForm(prev => (
            {...prev , mobileNumber: e.target.value }
          ))
        }} type="text" placeholder="Mobile Number" className="input-box" />
        
        <button onClick={handleForm} className="signup-button">Signup</button>

        <p className="signup-text">
          Already have an account? <a className="login-link" onClick={() => navigate("/staffLogin")}>Login</a>
        </p>

      </div>
    </div>
    </div>
  );
};

export default SignupPageStaff;
