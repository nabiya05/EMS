import mongoose from "mongoose"

const EmployeeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true
        },
        contact: {
            type: String,
            required: true
        },
        salary: {
            type: Number,
            required: true
        },
        department: {
            type: String,
            required: true
        },
        role:{
            type: String,
            required: true
        },
        status: {
            type: String,
            enum : ["active", "inactive"],
        }
    }
)

export default mongoose.model("Employee",EmployeeSchema);