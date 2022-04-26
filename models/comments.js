const mongoose = require("mongoose");
const schema=mongoose.Schema;
const commentschema = new schema({

    marks : {
        type : Number,
       
    },
    sex:{
       type: String,
    },
    class:{
        type: Number
    }
   
})


const comment = new mongoose.model("commentdatas",commentschema);
module.exports = {comment};