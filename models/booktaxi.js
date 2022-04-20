const mongoose=require("mongoose")
const { stringify } = require("nodemon/lib/utils")
const taxischema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    passenger:{
        type:Number,
        required:true
    },
    pickupaddres:{
       type:{
        type:String,default:"point",
        // required:true
       }, 
       pickup_cordinate:[Number]    
    },
    dropoffaddres:{
     type:{
        type:String,default:"point",
        // required:true
     },
        drop_cordinate:[Number],
    },
    // selectdate:{
    //     type :String,
    //     //  Date, default: Date.now,
    //     required:true
    // },
    // selecttime:{
    //      type: String,
    //     //  Number, default: (new Date()).getTime(), 
    //      required:true
    // }


})

const Booktaxi=new mongoose.model("booktaxi",taxischema)
module.exports={Booktaxi}