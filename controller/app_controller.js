import {TABLE} from "../models/tables.models.js";



//ADD TABLE
export const addTable=async (req,res)=>{
    const {tableNo} = req.body;
    try{
        if(!tableNo)
            return res.status(400).json({msg:"Table number required"});
        const table=new TABLE({table_no:tableNo,});
        const data=await table.save();
        console.log(data);
        return res.status(200).json({msg:"Table added successfuly",data});
    }catch(e){
        console.log(e);
        return res.status(500).json({msg:`Server Error: ${e}`});
    }
}

//GET TABLES
export const getTables=async(req,res)=>{
    try{
        const tables=await TABLE.find();
        if(!tables)
            return res.status(400).json({msg:"No table found"});
        console.log(tables);
        
        return res.status(200).json({msg:"Tables found",tables});
    }catch(e){
        console.log(e);
        return res.status(500).json({msg:`Server Error: ${e}`});
        
    }
}




