import "./sidebar.css"
import { Link } from "react-router-dom";

export default function Sidebar(){
    
    return(
        <>
        <div className="sidebar">
            <div className="logo"><i className="fa-solid fa-dungeon"></i><p>Employee Management System</p></div>
            <button><Link className="btnlink" to="/"><i class="fa-solid fa-house"></i> - Dashboard</Link></button>
            <button><Link className="btnlink" to="/employees"><i class="fa-solid fa-people-line"></i> - All Employees</Link></button>
            <button><Link className="btnlink" to="/addemployee"><i class="fa-solid fa-id-card"></i> - Register</Link></button>
            
        </div>
        </>
    )
}