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
import Paid from "./components/Paid";
import PaymentCreate from "./components/PaymentCreate";
import CreateMecRecord from "./components/CreateMecRec";
import MedRecord from "./components/MecRec";
import ScreeningCreate from "./components/ScreeningCreate";
import ScreeningList from "./components/ScreeningList";
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

              <Route path="/Patientcreate" element={<PatientCreate />} />

              <Route path="/Patientlist" element={<PatientList />} />

              <Route path="/appointcreate" element={<AppointCreate />} />

              <Route path="/appointlist" element={<AppointtList />} />

			        <Route path="/TreatmentList" element={<TreatmentList/>} />

              <Route path="/paid" element={<Paid />} />

              <Route path="/paymentcreate" element={<PaymentCreate />} />
             
              <Route path="/MedRecord" element={<MedRecord />} />
              
              <Route path="/CreateMecRecord" element={<CreateMecRecord />} />

              <Route path="/ScreeningCreate" element={<ScreeningCreate />} />

              <Route path="/ScreeningList" element={<ScreeningList />} />
            </Routes>

          </div>
          
        </>

    </BrowserRouter>

  );

}

export default App;
