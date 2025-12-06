import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './dashboard'
import Employee from './employee';
import Sidebar from './sidebar';
import Editemployee from './editemp';
import Addemployee from './addemp';
import { Mycontext } from './mycontext'
import { useState } from 'react'
import {v1 as uuidv1} from "uuid"

function App() {
  const [allemployee, setAllemployee] = useState([]);
  const [formdata, setFormdata] = useState({
            name : "",
            email : "",
            role: "",
            department: "",
            salary: "",
            status: "",
            contact: ""
  });
   const [editdata, setEditdata] = useState(null);
  const providervalues = {
    allemployee, setAllemployee,formdata, setFormdata,editdata, setEditdata,
  }

  return (
    <>
  <div className="app">
  <Mycontext.Provider value={providervalues}>
    <Sidebar />
     <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<Employee />} />
        <Route path="/addemployee" element={<Addemployee />} />
        <Route path="/edit/:id" element={<Editemployee />} />
      </Routes>
  </Mycontext.Provider>
</div>
    </>
  )
}

export default App
