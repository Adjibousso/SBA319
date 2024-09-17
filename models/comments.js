const mongoose= require("mongoose")
    const commentSchema = new mongoose.Schema({
        name : String,
        age: Number,
        email: String,
        movie_id: String,
    })

    
module.exports = mongoose.model("Comment", commentSchema)