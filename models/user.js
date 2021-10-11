const mongoose = require('mongoose')
const Joi = require('joi')

const { Schema } = mongoose
const userSchema = new Schema({
    name: String,//{
    //     type: String,
    //     required: true,
    //     minlength: 5,
    //     maxlength: 20
    // }

});

const User = mongoose.model('User',userSchema)

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(20).required()
    });
    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
