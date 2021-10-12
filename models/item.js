const mongoose = require('mongoose')
const Joi = require('joi');

const { Schema } = mongoose
const itemSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    type: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
    } ,
    price: {
        type: Number,
        min: 3,
        max : 1000,
        required: true
    }

});

const Item = mongoose.model('Item',itemSchema)

function validateItem(item) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(20).required(),
        
    });
    return schema.validate(item);
}

exports.Item = Item;
exports.itemSchema = itemSchema;
exports.validate = validateItem;
