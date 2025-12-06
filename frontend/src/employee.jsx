import { Mycontext } from "./mycontext"
import { useContext, useEffect, useState } from "react"
import "./employee.css"
import { Link } from "react-router-dom";

export default function Employee(){
    const {allemployee, setAllemployee} = useContext(Mycontext);
    const [query, setQuery] = useState("");

    const getallemployees = async(req,res)=>{
        try{
           const response = await fetch("https://ems-jq46.onrender.com/dashboard/employees");
           const result= await response.json();
           setAllemployee(result);
        }catch(err){
            console.log(err);
            res.status(500).json({error: "something went wrong"});
        }
    }

    useEffect(()=>{
        getallemployees();
    },[]);

    const handledelete =async(deletedemployee)=>{
        try{
           const response = await fetch(`https://ems-jq46.onrender.com/dashboard/${deletedemployee}`,{method:"DELETE"});
           const result= await response.json();
           console.log(result);
           setAllemployee(prev => prev.filter(employee => employee._id !== deletedemployee ));
        }catch(err){
            console.log("something went wrong")
        }
    }

    const displayedEmployees = query
        ? allemployee.filter(emp => {
            if (!emp) return false; 

    const lowerQuery = query.toLowerCase();

    const nameMatch = emp.name?.toLowerCase().includes(lowerQuery) || false;
    const roleMatch = emp.role?.toLowerCase().includes(lowerQuery) || false;
    const statusMatch = emp.status?.toLowerCase().includes(lowerQuery) || false;

    return nameMatch || roleMatch || statusMatch;
     })
        : allemployee;

    return(
        <div className="employee">
        <div className="nav">
            <h6>/Employee</h6>
        </div>
        <div className="search">
            <input type="text" className="form-control" placeholder=" Search by name, role, or status" value={query} onChange={(e) => setQuery(e.target.value)}/>
        </div>
        <div className="empcards">
                {displayedEmployees?.map((employee, idx)=>(
                        <div key={idx} className="card">
                        <div className="card-body ">
                        <h5 className="card-title"><i class="fa-solid fa-user"></i> {employee.name}</h5>
                        <p className="status" style={{background: employee.status === "active" ? "green" : "red",}}>{employee.status}</p>
                        <h6 className="card-subtitle mb-2 text-body-secondary">Role : {employee.role}</h6>
                        <h6 className="card-subtitle mb-2 text-body-secondary">Department : {employee.department}</h6>
                        <h6 className="card-subtitle mb-2 text-body-secondary">Team : {employee.teamName}</h6>
                        <h6 className="card-subtitle mb-2 text-body-secondary">Salary : {employee.salary}</h6>
                        <h6 className="card-subtitle mb-2 text-body-secondary">Email : {employee.email}</h6>
                        <h6 className="card-subtitle mb-2 text-body-secondary">Contact : {employee.contact}</h6>
                        <button className="btn edit"><Link to={`/edit/${employee._id}`}>Edit</Link></button><br></br>
                        <button className="btn btn-primary" onClick={(e)=>{e.stopPropagation();handledelete(employee._id)}}>delete</button>
                        </div>
                         </div>
                )
                )}
            </div>
        </div>
   )
}
