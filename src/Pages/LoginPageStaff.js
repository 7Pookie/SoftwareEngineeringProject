import "../Styles/LoginPage.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"


const LoginPageStaff = () => {
    const [userType, setUserType] = useState("Staff");
    const navigate = useNavigate();
    const [form , setForm] = useState({
        email: "",
        password: ""
    });

    async function handleForm(){
        const res = await axios.post("http://localhost:3001/owner/login" , form , {withCredentials: true});
        console.log(res)
        if(res.data === "User is not registered. Please register yourself"){
            alert("Register Yourself first");
            navigate("/signup")
        }
        if(res.data === "Logged in"){
            navigate("/staff")
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
            <div className="login-container">
                <div className="login-card">
                    <h2 className="login-title">Login</h2>

                    {/* Toggle Radio Buttons */}
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
                            {...prev , email: e.target.value}
                        ))
                    }} type="email" placeholder="Enter your email" className="input-box" />
                    <input onChange={(e) => {
                        setForm(prev => (
                            {...prev , password: e.target.value}
                        ))
                    }} type="password" placeholder="Enter your password" className="input-box" />

                    <button onClick={handleForm} className="login-button">Login</button>

                    <p className="signup-text1">
                        Don't have an account? <a className="signup-link" onClick={() => navigate("/signupStaff")}>Signup</a>
                    </p>


                    <Link to={"/login"}><div id="text-btn">Student ?</div></Link>

        
                </div>
            </div>
        </div>
    );
};

export default LoginPageStaff;
