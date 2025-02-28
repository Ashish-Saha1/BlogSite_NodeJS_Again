const mongoose = require('mongoose');

function databaseConnect(){
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log('Database connect');
        
    })
    .catch((err)=>{
        console.log({DatabaseErrorMSG: err});
        
    })
}


module.exports = databaseConnect