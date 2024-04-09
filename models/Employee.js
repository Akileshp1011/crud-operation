const mongoose=require("mongoose");
const Employee=new mongoose.Schema({
    Name:{type:String, required:true},
    EmpId:{type:String,required:true},
    Email:{type:String,required:true}

});

const Name=mongoose.model("Employee", Employee)
module.exports=Name;