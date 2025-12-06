import express from "express";
const router = express.Router();
import Employee from "../model/empschema.js"

router.get("/dashboard", async(req,res)=>{
    try{
        const response = await Employee.find({});
        res.json(response)
    }catch(err){
        console.log(err);
        res.status(500).json({error: "something went wrong"});
    }
});

router.get("/dashboard/employees", async(req,res)=>{
    try{
        const response = await Employee.find({});
        res.json(response)
    }catch(err){
        console.log(err);
        res.status(500).json({error: "something went wrong"});
    }
});

router.get("/dashboard/:id", async(req,res)=>{
    const {id} = req.params;
    try{
        const response = await Employee.findById(id)
        if(!response){
            return res.status(400).json({error: "employee not found"});
        }
         res.json(response)
    }catch(err){
        console.log(err);
        res.status(500).json({error: "something went wrong"});
    }
})

 //add
 router.post("/dashboard/newemployee", async(req,res)=>{
    const {name, email, role, department, salary, status,contact} = req.body;
    try{
        let newemployee = new Employee({
            name : name,
            email : email,
            role: role,
            department: department,
            salary: salary,
            status: status,
            contact: contact
        });
        await newemployee.save();
        return res.json(newemployee);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "something went wrong"});
    }
 })

 router.put("/dashboard/:id", async(req,res)=>{
    const {id} =req.params
    const {name, email, role, department, salary, status,contact} = req.body;
    try{
        let employee = await Employee.findByIdAndUpdate(id,{
            name : name,
            email : email,
            role: role,
            department: department,
            salary: salary,
            status: status,
            contact: contact
        },
        {new:true})
        
        res.json(employee)
        console.log(employee)
    }catch(err){
        console.log(err);
        res.status(500).json({error: "something went wrong"});
    }
 })

 router.delete("/dashboard/:id", async(req,res)=>{
    const {id} = req.params;
    try{
        const response = await Employee.findByIdAndDelete(id);
        if(!response){
            return res.status(400).json({error: "employee not found"});
        }
         res.json(response)
    }catch(err){
        console.log(err);
        res.status(500).json({error: "something went wrong"});
    }
 });
export default router;