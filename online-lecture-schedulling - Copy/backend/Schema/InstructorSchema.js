const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    salary:{
        type: Number,
        required : true
    },
    designation:{
        type: String,
        required : true
    },
    phone:{
        type: Number,
        required : true
    },
    email:{
        type: String,
        required : true
    },
})

module.exports = mongoose.model('instructor' , instructorSchema);