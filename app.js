//Extarnal Import
require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');




//Variables
const PORT = 5000 || process.env.PORT

//internal imports
const mainRouter = require('./Server/Routes/main');


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

app.use((err,req,res,next)=>{
    if(req.headersSent){
        next(err)
    }
    
})

app.listen(PORT, ()=>{
    console.log(`Listing on Port ${PORT}`);
    
})
