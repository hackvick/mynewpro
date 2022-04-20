const mongoose=require("mongoose")
const schema=mongoose.Schema
const { stringify } = require("nodemon/lib/utils")
const taxioschema= new mongoose.Schema({
    vehicle_id:{
        type: schema.ObjectId,ref:"carregisters",
        required:true 
    },
    imgpath :{
        type:String
        // ,enum:['first','second','third']
    }





})
const Taxiimage=new mongoose.model("taximages",taxioschema)
module.exports= {Taxiimage}