const mongoose= require("mongoose")
const schema=mongoose.Schema
const userschema = new schema({
    FirstName:{
        type: String,
        // required:true
    },
    LastName:{
        type:String,
        // required:true
    },
    Email:{
        type:String,
        // required:true
    },
    Phone:{
        type:Number,
        // required:true
    },
    Password:{
        type:String,
        // required:true
    },
    IsVerify:{
        type:String,
        // required:true
    },
    otp:{
        type:String

    },
    IsVerified:{
        type:String,
        default:false
    },
    UserType:{
        type:String,enum:['user','driver']
    },
    Profile_Pic:{
        type:String

    },
    // country_code:{
    //     type:Number

    // }
    
},
{timestamps:true})

const Userdetails=new mongoose.model("usersigndata",userschema)
module.exports= {Userdetails}