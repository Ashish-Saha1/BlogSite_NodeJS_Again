const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");

const Post = require('../Models/Post');
const User = require('../Models/User');

/**
 * IMportant Note for views will be small letter & not use require
 */
const adminLayout = "../views/Layouts/admin.ejs";

/**
 * Admin Route
 * Get Method
 * Login Page
 */
router.get('/login', async (req,res,next)=>{
    try {
            const locals = {
            title: "Register/LogIn",
            description: "This is Admin pannel Login/register Page",
            logoText : `Admin Pannel`
        }

    res.render('Admin/login', {
        locals,
        layout : adminLayout
    })
    } catch (error) {
        next(error)
    }
})


/**
 * Admin Route
 * Post Method
 * Login Page
 */
router.post('/login', async (req,res,next)=>{
    try {
        const locals = {
            title: "Admin Dashboard",
            description: "This is Admin pannel Dashboard Page",
            logoText : `Admin Pannel`
        }
        
        const user = await User.findOne({username : req.body.username});
        if(user){
        const matchedPassword = await bcrypt.compare(req.body.password ,user.password);
         if(matchedPassword){
            res.render('Admin/dashboard', {
                locals,
                user,
                layout : adminLayout
            })
         } else{
            res.status(404).json({Mess: `Password not matched`})
         }  
        }else{
            res.status(404).json({Mess: `User not matched`})
         }  
        }
        
        
    
     catch (error) {
        next(error)
    }
})

/**
 * Admin Route
 * Get Method
 * Register Page
 */
router.get('/register', async (req,res,next)=>{
    try {
            const locals = {
            title: "Register",
            description: "This is Admin pannel register Page"
        }

    res.render('Admin/register', {
        locals,
        layout : adminLayout
    })
    } catch (error) {
        next(error)
    }
})

/**
 * Admin Route
 * Get Method
 * Register Page
 */
router.post('/register', async (req,res,next)=>{
    try {

    const hashPassword = await bcrypt.hash(req.body.password, 10)

    const inputObj = {
        name : req.body.name,
        username : req.body.username,
        email : req.body.email,
        password : hashPassword
    }  


    const userData = await User.create(inputObj)
        console.log(userData)    
    // res.render('Admin/register', {
        
    //     layout : adminLayout
    // })
    res.redirect('/Admin/login')

    } catch (error) {
        next(error)
    }
})


router.get('/dashboard', async (req,res,next)=>{
    try {
            const locals = {
            title: "Admin Page",
            description: "This is Admin Page"
        }

    res.render('Admin/dashboard', {
        locals,
        layout : adminLayout
    })
    } catch (error) {
        next(error)
    }
})







module.exports = router;