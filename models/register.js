const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const schema = mongoose.Schema
 
const employeSchema = new schema({

    image : {
        type : String,
       // required : true
    },
    fname : {
        type : String,
       // required : true
    },
    sname : {
        type: String,
        //required: true
    },
    email : {
        type : String
        // ,
        //required: true,
        // unique : true
    },
     phone: {
        type : Number
        // ,
        // unique : true
    },
    address : {
        type : String,
        //required : true
    },
    password : {
        type : String,
       // required : true
    },
    mytoken:
    {
        type:String
    }
})

employeSchema.methods.genAuthToken =(id) =>{
    
 const token = jwt.sign({_id:id},"mynameisvjickyfpihoifhrfhre");
  console.log(token+"model side jwt ")
 return  token;
 
}
const Register = new mongoose.model ("Employee",employeSchema);
module.exports = {Register};