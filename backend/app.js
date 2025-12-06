import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import 'dotenv/config';
import Employee from "./model/empschema.js";
import routes from "./routes/routes.js"
import employeedata from "./init/data.js";

const app = express();
const port= process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use("/", routes)

app.listen(port, ()=>{
    console.log("app is listening");
    connectdb();
})


const connectdb = async()=>{
    try{
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connected to database");
    return 
    }catch(err){
        console.log(err);
    }
}