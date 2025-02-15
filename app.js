//Extarnal Import
require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const databaseConnect = require('./Server/Helpers/database');




//Variables
const PORT = 5000 || process.env.PORT

//internal imports
const mainRouter = require('./Server/Routes/main');

//Database connect with mongoose
    databaseConnect()

//Layouts
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('layout', './layouts/main.ejs');


//Data Parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())


//Others
app.use(express.static('Public'))

//Routes
app.use('/', mainRouter)




//Error Handle
app.use((req,res,next)=>{
    next('No Route found')
})

app.use((err,req,res,next)=>{
    if(res.headersSent){
        res.status(500).json({DefaultErrMsg: 'Header is already sent'})
    }else{
        if(err.message){
            res.status(500).json({DefaultErrMsg2: err.message})
        }
        res.status(500).json({DefaultErrMsg3: "There was an error"})
    }
    
})

app.listen(PORT, ()=>{
    console.log(`Listing on Port ${PORT}`);
    
})
