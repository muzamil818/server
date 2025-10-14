const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true
    },
    title: {
        required: true,
        type: String,
   
    },
    content:{
        type: String,
        required: true,
        default: ""
    },
    
})

module.exports = mongoose.model("Note", noteSchema);