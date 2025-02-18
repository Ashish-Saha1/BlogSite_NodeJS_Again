const express = require('express');
const router = express.Router();
const Post = require('../Models/Post');

/**
 * IMportant Note for views will be small letter & not use require
 */
const adminLayout = "../views/Layouts/admin.ejs"

router.get('/admin', async (req,res,next)=>{
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