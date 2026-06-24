require('dotenv').config();
const cors=require('cors');
const chalk=require('chalk');
const mongoose=require('mongoose');
const express=require('express');
const { addTable, getTables, getItems, addItem } = require('./controller/app_controller');
const app=express();

app.use(express.json());
app.use(cors());


const port=process.env.PORT;
const baseUrl=process.env.BASE;
const mongo=process.env.MONGODB;

mongoose.connect(mongo)
.then(()=>console.log(chalk.blue("MongoDB connected")))
.catch((e)=>console.log(`MongoDB error: ${e}`));


//ROUTES
app.post(`${baseUrl}table`,addTable);
app.get(`${baseUrl}table`,getTables);
app.post(`${baseUrl}item`,addItem);
app.get(`${baseUrl}item`,getItems);


app.listen(port,()=>console.log(chalk.green(`Running on port ${port}`)))