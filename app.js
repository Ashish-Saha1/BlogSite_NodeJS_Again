//Extarnal Import
require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const methodOverride = require('method-override');








//Variables
const PORT = 5000 || process.env.PORT

//internal imports
const mainRouter = require('./Server/Routes/main');
const adminRouter = require('./Server/Routes/admin');
const databaseConnect = require('./Server/Helpers/database');
const {isactiveRoute} = require('./Server/Helpers/activeRouteHelpers');



//Database connect with mongoose
    databaseConnect()

//Layouts
app.use(expressLayouts);
app.set('view engine', 'ejs');
//app.set('layout', './layouts/main.ejs');
app.set('layout', './layouts/main.ejs')

//Data Parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())


//Local variable setup
app.locals.isactiveRoute = isactiveRoute;

//Method Override
app.use(methodOverride('_method'))

// Session 
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store : MongoStore.create({
        mongoUrl : process.env.MONGODB_URI
    }),
  }))


//Others
app.use(express.static('Public'))

//Routes
app.use('/', mainRouter);
app.use('/admin', adminRouter);




//Error Handle
app.use((req,res,next)=>{
    res.status(500).json({NotFound: 'Route not found'})
    //next('No Route found')
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
