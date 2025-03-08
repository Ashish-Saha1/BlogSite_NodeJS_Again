

const session = require('express-session');

const myObj = {}

//Session Handle middleware
const pathFinder = (req,res,next) => {
        
    // Store the previous page before updating
    let previousPage = myObj.lastPage || "No Last page defined";

    // Update session with the current page
    myObj.lastPage = req.route.path;

    //output += `<h2>${title}</h2> Previous page was: ${previousPage}`;
    
    console.log("Previous Page:", previousPage);
    next()
    

};

module.exports = pathFinder