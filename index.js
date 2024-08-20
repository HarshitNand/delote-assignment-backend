const express = require ('express');

const  app = express();
const bodyparser =require('body-parser')
const cors =require('cors');


const AuthRouter = require('./Routes/AuthRouter')


require('dotenv').config();
require('./Models/db');

const PORT = process.env.PORT || 8000;

app.use(bodyparser.json());

//use get req for any others ports
app.use(cors());
//routes
app.use('/auth',AuthRouter)

app.listen(PORT,()=>{
   console.log(`server is start ${PORT} `)
})