const mongoose = require('mongoose');

function databaseConnect(){
    mongoose.connect(`mongodb://localhost/BlogSiteAgain`)
    .then(()=>{
        console.log('Database connect');
        
    })
    .catch((err)=>{
        console.log({DatabaseErrorMSG: err});
        
    })
}


module.exports = databaseConnect