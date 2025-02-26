const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

const Post = require('../Models/Post');
const User = require('../Models/User');
const authGurd = require('../Helpers/authGurd')
/**
 * IMportant Note for views will be small letter & not use require
 */
const adminLayout = "../views/Layouts/admin.ejs";



/**
 * Admin Route
 * Get Method
 * Login Page
 */
// router.get('/login', async (req,res,next)=>{
//     try {
//             const locals = {
//             title: "Register/LogIn",
//             description: "This is Admin pannel Login/register Page",
//             logoText : `Admin Pannel`,
//             currentRoute: '/login'
//         }

//     res.render('Admin/login', {
//         locals,
//         layout : adminLayout
//     })
//     } catch (error) {
//         next(error)
//     }
// })

router.get('/login', async (req,res,next)=>{
    try {
            const locals = {
            title: "Register/LogIn",
            description: "This is Admin pannel Login/register Page",
            logoText : `Admin Pannel`,
            currentRoute: '/login'
        }

    if(req.cookies.Token){
        res.redirect('/admin/dashboard')
    }else{
        res.render('Admin/login', {
            locals,
            layout : adminLayout
        })
    }
    
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
        
        const user = await User.findOne({ $or: [ { email:  req.body.username}, {  username:  req.body.username} ] });
        if(user){
        const matchedPassword = await bcrypt.compare(req.body.password ,user.password);
        if(matchedPassword){
            const token = await jwt.sign({username: user.username, userId : user._id, name: user.name}, process.env.JWT_SECRET,);
            res.cookie('Token', token, {httpOnly: true})
            res.redirect('/admin/dashboard')

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


router.get('/dashboard', authGurd, async (req,res,next)=>{
    try {
            const locals = {
            title: "Admin Page",
            description: "This is Admin Page"
        }
    const name = req.name;  
    const username = req.username;  
    const data = await Post.find();

    res.render('Admin/dashboard', {
        name,
        username,
        data,
        locals,
        currentRoute : "/dashboard",
        layout : adminLayout
    })
    } catch (error) {
        next(error)
    }
})



router.get('/post/:id', async (req,res,next)=>{
    try {
        const locals = {
            title: "Register/LogIn",
            description: "This is Admin pannel Login/register Page",
            logoText : `Admin Pannel`
        }
    const paramsId = req.params.id;
    const data = await Post.findOne({_id : paramsId});

    res.render('Admin/post', {
        data,
        locals,
        layout : adminLayout
    })
    } catch (error) {
        next(error)
    }
})


router.get('/logout', async (req,res,next)=>{
        try {
            const token = req.cookies.Token;
            if(!token){
                res.status(404).json({Mess: `Cookie not Found`})
            }        
            res.clearCookie("Token")
            res.redirect('/admin/login')
            
        } catch (error) {
            next(error)
        }
})



/**Admin
 * Post method
 * Search bar
 */
// router.post('/search', async (req,res,next)=>{
//     try {
                
//         const adminPostData = await Post.find()

//         const locals = {
//             title: adminPostData.title,
//             description: "This is a admin search page of this site"
//         }

//     res.render('searchView', {
//         locals,
//         adminPostData
//     })
//     } catch (error) {
//         next(error)
//     }

   

// })



module.exports = router;