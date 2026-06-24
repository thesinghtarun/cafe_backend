const mongoose=require('mongoose');

const itemSchema=new mongoose.Schema({
    item_name:{type:String,required:true},
    item_price:{type:Number,required:true},
    item_image:{type:String,default:null},
    item_category:{type:String,required:true},
    chef_special:{type:Boolean,default:false},
},{timestamps:true});

const ITEM=mongoose.model("ITEM",itemSchema);

module.exports={ITEM};