import "./dashboard.css"
import { Mycontext } from "./mycontext"
import { useContext, useEffect } from "react";

export default function Dashboard(){
    const {allemployee, setAllemployee} = useContext(Mycontext);

    const activeCount = allemployee.filter(emp => emp.status === "active").length;
    const inactiveCount = allemployee.filter(emp => emp.status === "inactive").length;

    const getallemployees = async(req,res)=>{
        try{
           const response = await fetch("http://localhost:4000/dashboard");
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

    return(
        <div className="dashboard">
            <div className="nav"><p>/Home</p></div>
            <div className="part1">
                <div className="card box text-center mb-3">
                <div className="card-body ">
                <i class="fa-solid fa-users"></i>
                <h5 className="card-title">Total Employee</h5>
                <h2 className="card-text">{allemployee.length}</h2>
                </div>
                </div>
                <div className="card box text-center mb-3">
                <div className="card-body">
                <i class="fa-solid fa-child-reaching" style={{color: "green",}}></i>
                <h5 className="card-title">Active Employee</h5>
                <h2 className="card-text">{activeCount}</h2>
                </div>
                </div>
                <div className="card box text-center mb-3">
                <div className="card-body">
                <i class="fa-solid fa-child" style={{color: "red",}}></i>
                <h5 className="card-title">InActive Employee</h5>
                <h2 className="card-text" >{inactiveCount}</h2>
                </div>
                </div>
            </div>
            <div className="ec"><h5>Employee Contact</h5></div>
            <div className="part2 boxes">
                {allemployee.map((employee, idx) => (
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
                        </div>
                    </div>
                )).slice(0,4)

                }
            </div>
        </div>
    )
}