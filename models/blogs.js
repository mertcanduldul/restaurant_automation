const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
    title: {
        type: String,
        
    },
    short: {
        type: String,
        
    },
    long: {
        type: String,
        
    },
    photo:String

}, {
    timestamps: true
})
const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog