const mongoose=require("mongoose")
const schema= mongoose.Schema;

const userotpverificationschema =   new schema({
    // userId : String,
    otp:String,
    createdAt: Date,
    expiresAt:Date
})

const otpverification= mongoose.model("User_otp_verification",userotpverificationschema);

module.exports= {otpverification};
