const {Schema, default: mongoose} = require('mongoose');

//const Schema = mongoose.Schema;

const postSchema = new Schema({
    title : {
        type : String,
        required : true,

    },

    body : {
        type : String,
        required : true,

    },

    createdAt : {
        type : Date,
        default : Date.now,

    },

    updatedAt : {
        type : Date,
        default : Date.now,

    }
});


const Post = mongoose.model("Post", postSchema)

module.exports = Post;



