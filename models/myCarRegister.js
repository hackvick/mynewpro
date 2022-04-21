const mongoose=require("mongoose")
const schema=mongoose.Schema
const taxioschema= new schema({
    name:{
        type:String,
       // required:true
    },
    model:{
        type:String,
        //required:true
    },
    chessy_num:{
        type:Number,
       // required:true
    },
    template_no:{
        type:Number,
     //   required:true
    },
    vehicle:{
        type:String,
        //required:true
    },
    rate_hourly:{
        type:Number,
        //required:true
    },
    rate_per_day:{
        type : Number,
     //   required:true
    },
    passenger:{
         type: Number, 
       //  required:true
    },
    driverId:{
        type:schema.Types.ObjectId,ref:"usersigndatas"
    },
    cartype:{
        type:String,
        enum:["Any Type","Hybrid","SUV","Luxury","Vans"]

    }


})

const CarRegistermodel=new mongoose.model("carRegister",taxioschema)
module.exports={CarRegistermodel}