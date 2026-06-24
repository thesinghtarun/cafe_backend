const mongoose=require('mongoose');


const tableSchema=new mongoose.Schema({

    table_no:{type:Number,required:true,unique:true},
    is_occupued:{type:Boolean,default:false}

},{timestamps:true});

const TABLE=mongoose.model("TABLE",tableSchema);

module.exports={TABLE};