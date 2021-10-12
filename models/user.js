const mongoose = require('mongoose')
const Joi = require('joi')

const { Schema } = mongoose
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    } ,
    password: {
        type: String,
        minlength: 5,
        maxlength: 256,
        required: true
    }

});

const User = mongoose.model('User',userSchema)

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(20).required(),
        email: Joi.string().min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required(),
        
    });
    return schema.validate(user);
}

function validateUserLogin(user) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required(),
        
    });
    return schema.validate(user);
}

exports.User = User;
exports.userSchema = userSchema;
exports.validate = validateUser;
exports.validateLogin = validateUserLogin;
