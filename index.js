const express=require('express');
const app=express();
require('dotenv').config();
const port = process.env.PORT || 1000;
const flightRoutes=require('./api/routes/FlightsRoutes')
let db=require("./api/db config/db")
app.use(express.json());
var cors = require('cors')

app.use(cors({
    origin:'http://localhost:5173'
}));

db();
const rout=require('./api/routes/routes');
app.use('/uploads', express.static('uploads'));
 app.use('/api',rout,flightRoutes);
app.listen(port,()=>{
    console.log('port is working on 1000');
})