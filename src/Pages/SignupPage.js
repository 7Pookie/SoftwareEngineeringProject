import "../Styles/SignupPage.css";
import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
const SignupPage = () => {
    const [userType, setUserType] = useState("Student");
  
    const handleToggle = () => {
      setUserType(userType === "Student" ? "Staff" : "Student");
    };

    const navigate = useNavigate();
    const [form , setForm] = useState({
      name: "",
      password: "",
      email: "",
      rollNumber: "",
      course: "",
      hostel: "",
      mobileNumber: ""
    })


    async function handleForm(e){
      e.preventDefault()
      const res = await axios.post("http://localhost:3001/student/register" , form);
      console.log(res)
      if(res.data === "You already have an account. Please login."){
          navigate("/login")
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
                        <label className={userType === "Student" ? "active" : ""} style={{ marginRight: "10px"}}>
                            <input
                                type="radio"
                                name="userType"
                                value="Student"
                                checked={userType === "Student"}
                                onChange={() => setUserType("Student")}
                            />
                            Student             
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
            {...prev , rollNumber: e.target.value }
          ))
        }} type="text" placeholder="Roll Number" className="input-box" />

        <input onChange={(e) => {
          setForm(prev => (
            {...prev , course: e.target.value }
          ))
        }} type="text" placeholder="Course" className="input-box" />

         <input onChange={(e) => {
          setForm(prev => (
            {...prev , hostel: e.target.value }
          ))
        }} type="text" placeholder="Hostel" className="input-box" />

        <input onChange={(e) => {
          setForm(prev => (
            {...prev , mobileNumber: e.target.value }
          ))
        }} type="text" placeholder="Mobile Number" className="input-box" />
        
        <button onClick={handleForm} className="signup-button">Signup</button>

        <p className="signup-text">
          Already have an account? <a className="login-link" onClick={() => navigate("/login")}>Login</a>
        </p>

      </div>
    </div>
    </div>
  );
};

export default SignupPage;
