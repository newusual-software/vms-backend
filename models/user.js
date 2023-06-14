const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'please add name'],
        maxlength: 32       
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'please add email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please enter a valid email address'
        ]      
    },

    password: {
        type: String,
        trim: true,
        required: [true, 'please add password'],
        minlength: [6, 'password must have at least six(6) character'],
        match: [
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/,
            'Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least six characters long'
        ]
    },
    role: {
        type:Number,
        default:0,
    }
}, {timestamps: true})

module.exports = mongoose.model("user", userSchema)