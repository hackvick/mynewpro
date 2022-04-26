var {otp} =require("../models/otpmodel")
const config=require("config")
const mongoose=require("mongoose")
const { taxicust, taxiowner } = require("../v1/controller/usercontroller/usercontroller")
 


const sendOtp=async(payload)=>{
    const eventType=payload.eventType
    const otpcode=Math.floor(100000  +  Math.random() * 900000);

    await new model.otp({
        otpcode:otpcode,
        phoneNo:payload.phoneNo,
        countrycode:payload.countrycode,
        eventType:eventType
    }).save();
    await sendsms(payload.countrycode.payload.phoneNo,payload.message)
    return payload;

}
const verify=async(payload)=>{
    if (payload.otpcode === "462271") {
        const eventType=payload.eventType
        const otpdata= await otp.findOne({otpcode:payload.otpcode,eventType:eventType,
        phoneNo:payload.phoneNo,
        countrycode:payload.countrycode}); 
        if (!otpdata) return false ;
        await otp.deleteMany({_id:mongoose.Types.ObjectId(otpdata._id)});
        return otpdata;
            
        
    } else {    
        console.log("not");
        
    }
}
module.exports={
    sendOtp:sendOtp,
    verify:verify
}