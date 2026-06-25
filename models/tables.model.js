const mongoose=require('mongoose');


const tableSchema=new mongoose.Schema({

    table_no:{
        type:Number,
        required:true,
        unique:true
    },

    status: {
        type: String,
        enum: ["available", "reserved", "occupied"],
        default: "available",
  },

    reserved_by: {
        type: String,
        default: null,
    },

    reserved_until: {
        type: Date,
        default: null,
    }

},{timestamps:true});

const TABLE=mongoose.model("TABLE",tableSchema);

module.exports={TABLE};


// QR DESIGN
// https://your-backend.com/cafe/table/1
// https://your-backend.com/cafe/table/2