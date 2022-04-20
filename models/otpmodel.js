const mongoose=require("mongoose")
const schema=mongoose.Schema
const otpModel=new schema({
    otpcode:{
        type:String
    },
    userId:{
        type: schema.ObjectId,ref:"usersigndata"},
        eventType:{
            type:String
        },
        phoneNo:{
            type:String
        },
        countrycode:{
            type:String
        }
    },{ timrstamps:true

});

const otp= new mongoose.model("otp",otpModel);
module.exports = {
    otp};