const mongoose=require("mongoose")
const { stringify } = require("nodemon/lib/utils")
const schema=mongoose.Schema
const taxischema= new schema({
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
    pickupaddress:{
       type:{
        type:String,default:"Point",
        required:true
       }, 
       pickup_cordinate:[Number]    
    },
    dropoffaddress:{
     type:{
        type:String,default:"Point",
        required:true
     },
        drop_cordinates:[Number],
    },
    latitude:{type: Number,default:0},
    longitude:{type:Number,default:0},
    date:{
        type:Date
    },
    time:{
        type:String,
        enum:["10:15","12:15","2:15"]
    },
    Selectcartype:{
        type:String,
        enum:["Any type","Hybrid","SUV","Luxury","Van"]
    },booking_status:{
        type:String,
        enum:["Booked","Pending","Rejected"],
        default:"Pending"

    },
    accepted_by:{
        type:String,
        default: "Pending"
    },
    userid:{
        type:schema.Types.ObjectId,ref:"usersigndatas"
    }
    
        
    
},
{
    timestamps:true
}
);

const Booktaxi=new mongoose.model("booktaxi",taxischema)
module.exports={Booktaxi}