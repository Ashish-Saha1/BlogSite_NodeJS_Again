const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const Post = require('../Models/Post');





/**
 * Documentation command is type Slash & double star
 * Get 
 * Home Route or index page
 */

router.get('/', async (req,res)=>{
    try {
        const locals = {
            title: `Index Page`,
            description: "This is a Home page of this site",
            logoText : `Node JS`
        }

        const perPage = 6;
        const page = req.query.page || 1;
        /**aggregate is used for data sort. filter, transform or complex data handling
         * here we can use find method instead of aggregate
         */
        const data = await Post.aggregate( [ { $sort: {createdAt: -1} }] )
                                .skip(perPage * page - perPage)
                                .limit(perPage)
                                //.exec() You can skip exec method as use await exec is for callback pattern for handling err
        const count = await Post.countDocuments();
        const nextPage = parseInt(page) + 1;
        /**Here nextPage = 2, count = 12, perPage = 10, Math.ceil(12 / 10) 
         * Result = 2 as Math.celi is rounded up
         * 2 is equal to nextPage means hasNextPage is True
         */
        const hasNextPage = nextPage <= Math.ceil(count / perPage)
 
        
        res.render('index', {
            locals,
            data,
            current : page,
            nextPage : hasNextPage ? nextPage : null,
            currentRoute : "/",
        })
        
        
    } catch (error) {
        console.log(error);
        
    }
})


/**
 * Get 
 * Click on latest post show its body
 */
router.get('/post/:id', async (req,res,next)=>{
    try {
                const slug = req.params.id;
        const postData = await Post.findOne({_id : slug})

        const locals = {
            title: postData.title,
            description: "This is a Post page of this site"
        }

    res.render('post', {
        locals,
        postData
    })
    } catch (error) {
        next(error)
    }
})





/**
 * Get 
 * About Route or About page
 */
router.get('/about', async (req,res,next)=>{
    try {
        const locals = {
            title: 'About',
            description: "This is a About page of this site"
        }
    res.render('about', {locals})
    } catch (error) {
        next(error)
    }
})


/**
 * Get 
 * Contact Route or About page
 */
router.get('/contact', async (req,res,next)=>{
    try {
        const locals = {
            title: 'Contact',
            description: "This is a Contact page of this site"
        }
    res.render('contact', {locals})
    } catch (error) {
        next(error)
    }
})



/**
 * Get method
 * Search bar
 */
router.post('/search', async (req,res,next)=>{
    try {
                
        const postData = await Post.find()

        const locals = {
            title: 'Search',
            description: "This is a Post page of this site"
        }

    res.render('searchView', {
        locals,
        postData,
        
    })
    } catch (error) {
        next(error)
    }

   

})






// function insertPostData () {
//   Post.insertMany([
//     {
//       title: "Building APIs with Node.js",
//       body: "Learn how to use Node.js to build RESTful APIs using frameworks like Express.js"
//     },
//     {
//       title: "Deployment of Node.js applications",
//       body: "Understand the different ways to deploy your Node.js applications, including on-premises, cloud, and container environments..."
//     },
//     {
//       title: "Authentication and Authorization in Node.js",
//       body: "Learn how to add authentication and authorization to your Node.js web applications using Passport.js or other authentication libraries."
//     },
//     {
//       title: "Understand how to work with MongoDB and Mongoose",
//       body: "Understand how to work with MongoDB and Mongoose, an Object Data Modeling (ODM) library, in Node.js applications."
//     },
//     {
//       title: "build real-time, event-driven applications in Node.js",
//       body: "Socket.io: Learn how to use Socket.io to build real-time, event-driven applications in Node.js."
//     },
//     {
//       title: "Discover how to use Express.js",
//       body: "Discover how to use Express.js, a popular Node.js web framework, to build web applications."
//     },
//     {
//       title: "Asynchronous Programming with Node.js",
//       body: "Asynchronous Programming with Node.js: Explore the asynchronous nature of Node.js and how it allows for non-blocking I/O operations."
//     },
//     {
//       title: "Learn the basics of Node.js and its architecture",
//       body: "Learn the basics of Node.js and its architecture, how it works, and why it is popular among developers."
//     },
//     {
//       title: "NodeJs Limiting Network Traffic",
//       body: "Learn how to limit netowrk traffic."
//     },
//     {
//       title: "Learn Morgan - HTTP Request logger for NodeJs",
//       body: "Learn Morgan."
//     },
//   ])
// }

// insertPostData();





module.exports = router;