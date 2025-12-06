import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./addemp.css";  
        
export default function EditEmployee() {
  const { id } = useParams(); 

  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    salary: "",
    contact: ""
  });
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await fetch(`http://localhost:4000/dashboard/${id}`);
        const data = await res.json();
        setFormdata({
          name: data.name || "",
          email: data.email || "",
          role: data.role || "",
          department: data.department || "",
          salary: data.salary || "",
          contact: data.contact || ""
        });

      } catch (err) {
        console.error(err);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:4000/dashboard/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata)
      });

      const data = await res.json();
      console.log("Updated:", data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="addemployee">
      <div className="nav"><p>/Edit Employee</p></div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control"
            name="name"
            value={formdata.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Role</label>
          <input type="text" className="form-control"
            name="role"
            value={formdata.role}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Department</label>
          <input type="text" className="form-control"
            name="department"
            value={formdata.department}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
        <label className="form-label">Status</label>
        <select value={formdata.status} name="status" className="form-control" onChange={handleChange}>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="text" className="form-control"
            name="email"
            value={formdata.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contact</label>
          <input type="text" className="form-control"
            name="contact"
            value={formdata.contact}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Salary</label>
          <input type="number" className="form-control"
            name="salary"
            value={formdata.salary}
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-primary" type="submit">
          Update
        </button>
      </form>
    </div>
  );
}
