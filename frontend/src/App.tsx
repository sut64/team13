import React, { useEffect } from "react";
import { BrowserRouter as 
        BrowserRouter,
        Route, 
        Routes, 
} from "react-router-dom";

import './App.css';
import Navbar from "./components/Navbar";
import PatientCreate from "./components/PatientCreate";
import PatientList from "./components/PatientList";
import SignIn from "./components/SignIns";
import Home from "./components/Home";
import AppointtList from "./components/AppointList";
import AppointCreate from "./components/AppointCreate";
import TreatmentList from "./components/TreatmentList";

function App() {
  const [token, setToken] = React.useState<String>("");

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken) {
      setToken(getToken);
    }
  }, []);
  console.log("Token", token)

  if (!token) {
    return <SignIn />
  }

  return (

    <BrowserRouter>
      
        <>
          <div>

            <Navbar />

            <Routes>

              <Route path="/" element={<Home />} />

              <Route path="/create" element={<PatientCreate />} />

              <Route path="/list" element={<PatientList />} />

              <Route path="/appointcreate" element={<AppointCreate />} />

              <Route path="/appointlist" element={<AppointtList />} />

			  <Route path="/TreatmentList" element={<TreatmentList/>} />

            </Routes>

          </div>
          
        </>

    </BrowserRouter>

  );

}

export default App;
