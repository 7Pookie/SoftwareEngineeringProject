import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentLandingPage from "./Pages/StudentLandingPage";
import StaffLandingPage from "./Pages/StaffLandingPage";
import StudentProfile from "./Pages/StudentProfile";
import StaffProfile from "./Pages/StaffProfile";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import StudentComplaints from "./Pages/StudentComplaints";
import AddParcelPage from "./Pages/AddParcelPage";
import StaffParcelStatus from "./Pages/StaffParcelStatus";
import StudentParcelDetails from "./Pages/StudentParcelDetails";
import FeedbackForm from "./Pages/FeedbackForm";
import StaffParcelDetails from "./Pages/StaffParcelDetails";
import StaffFeedbackView from "./Pages/StaffFeedbackView";
import StaffComplaintsPage from "./Pages/StaffComplaintsPage";
import LoginPageStaff from "./Pages/LoginPageStaff";
import SignupPageStaff from "./Pages/SignupPageStaff";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} /> {/*Done*/}
        <Route path="/staffLogin" element={<LoginPageStaff />} /> {/*Done*/}
        <Route path="/home" element={<StudentLandingPage />} /> {/*Done*/}
        <Route path="/studentprofile" element={<StudentProfile />} /> {/*Done*/}
        <Route path="/staffprofile" element={<StaffProfile />} />
        <Route path="/login" element={<LoginPage />} />  {/*Done*/}
        <Route path="/signup" element={<SignupPage />} /> 
        <Route path="/signupStaff" element={<SignupPageStaff />} /> 
        <Route path="/studentcomplaints" element={<StudentComplaints />} /> {/*Done*/}
        <Route path="/addparcel" element={<AddParcelPage />} /> {/*Done*/}
        <Route path="/staffparcelstatus" element={<StaffParcelStatus />} />
        <Route path="/studentparceldetails/:parcelOrderNumber" element={<StudentParcelDetails />} />
        <Route path="/staffparceldetails/:parcelOrderNumber" element={<StaffParcelDetails />} />
        <Route path="/staff-feedbackview" element={<StaffFeedbackView />} /> {/*Done*/}
        <Route path="/staffcomplaints" element={<StaffComplaintsPage />} /> {/*Done*/}
        <Route path="/feedbackform" element={<FeedbackForm />} /> {/*Done*/}
        <Route path="/staff" element={<StaffLandingPage />} /> {/*Done*/}
      </Routes>
    </Router>
  );
}

export default App;
