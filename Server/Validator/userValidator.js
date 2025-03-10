
const {check, validationResult} = require('express-validator');
const User = require("../Models/User");


const registerUserValidator = [
    check("name")
    .isLength({min: 1})
    .withMessage("Name is Required")
    .isAlpha('en-US', { ignore: " _" })
    .withMessage("Name must not contain anything other then alphabet")
    .trim(),

    check("username")
    .isLength({min: 1})
    .withMessage("username is Required")
    .isAlpha('en-US', { ignore: " _" })
    .withMessage("username must not contain anything other then alphabet")
    .trim(),

    check("email")
    .isEmail()
    .withMessage("Enter Valid Email")
    .trim()
    .custom(async(value)=>{
        try {
            const user = await User.findOne({email : value})
            if(user){
                throw new Error("Email is already exit");
                
                
            }
        } catch (error) {
                
            throw new Error(error.message);
            
        }
    })
]



const registerValidationResult =  function(req,res,next){
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();

    if(Object.keys(mappedErrors).length === 0 ){
        next()
    }else{
        
        res.status(500).json(
            {
                errors : mappedErrors
            }
        )
    }
}



module.exports = {
    registerUserValidator,
    registerValidationResult
}