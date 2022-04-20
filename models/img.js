const mongoose = require("mongoose");
const schema=mongoose.Schema
const imgschema = new schema({

    image : {
        type : String,
       // required : true
    },
    empid:{
        type: schema.ObjectId,ref:"employees"
    }
   
})


const Storeimg = new mongoose.model ("ssmpimages",imgschema);
module.exports = {Storeimg};