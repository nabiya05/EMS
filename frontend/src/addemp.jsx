import { useState } from "react";
import "./addemp.css";

export default function Addemployee() {
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    salary: "",
    contact: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/dashboard/newemployee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formdata)
      });

      const result = await response.json();
      console.log("added");

      setFormdata({
        name: "",
        email: "",
        role: "",
        department: "",
        salary: "",
        contact: ""
      });

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register">
      <div className="addemployee">
      <div className="nav"><p>/Add Employee</p></div>
        <form onSubmit={handlesubmit}>
        <div className="mb-3 ">
          <label className="form-label">Name</label>
          <input type="text" className="form-control"
            name="name"
            onChange={handleChange}
            value={formdata.name}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Role</label>
          <input type="text" className="form-control"
            name="role"
            onChange={handleChange}
            value={formdata.role}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Department</label>
          <input type="text" className="form-control"
            name="department"
            onChange={handleChange}
            value={formdata.department}
          />
        </div>

        <div className="mb-3">
        <label className="form-label">Status</label>
        <select value={formdata.status} name="status" className="form-control" onChange={(e) => setStatus(e.target.value)}>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="text" className="form-control"
            name="email"
            onChange={handleChange}
            value={formdata.email}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contact</label>
          <input type="text" className="form-control"
            name="contact"
            onChange={handleChange}
            value={formdata.contact}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Salary</label>
          <input type="text" className="form-control"
            name="salary"
            onChange={handleChange}
            value={formdata.salary}
          />
        </div>

        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
      </div>
    </div>
  );
}
