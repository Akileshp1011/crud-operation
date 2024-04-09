const express=require('express');
const Crud=express();
const mongoose=require('mongoose');
const cors=require('cors');
Crud.use(express.json());
Crud.use(cors());

const EmpModel=require("./models/Employee");



mongoose.connect("mongodb://127.0.0.1:27017/Employee");

Crud.post("/insert",async(req,res)=>{

    const Name=req.body.Name
    const EmpId=req.body.EmpId
    const Email=req.body.Email

    const name=new EmpModel({
        Name:Name,
        EmpId:EmpId,
        Email:Email
    });
    try{
        await(name.save());
    }catch(err){
        console.log(err);
    }
});

Crud.get("/reads",async(req,res)=>{
    EmpModel.find({},(err,result)=>{
       if(err){
           res.send(err)
           
       }
       res.send(result);
    });
      
   });

    Crud.put("/update",async(req,res)=>{

    const newEmpName=req.body.newEmpName;
    const id=req.body.id;

 
    try{
      await EmpModel.findById(id,(err,updatedName) => {
            updatedName.Name=newEmpName;
            updatedName.save();
            res.send("update");
        });
    }catch(err){
        console.log(err);
    }
});
Crud.delete("/delete/:id", async(req,res) => {
    const id=req.params.id;
    await EmpModel.findByIdAndRemove(id).exec();
    res.send("deleted");
});
Crud.listen(3005, () =>{
    console.log("server is running");
});