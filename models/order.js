const mongoose = require('mongoose')
const Joi = require('joi');

const { Item, itemSchema } = require('../models/item')
const { User, userSchema } = require('../models/user')

const { Schema } = mongoose
const orderSchema = new Schema({
    userName: {
        type: userSchema
    },
    orders : [{
        orderedItems: [{
            type: itemSchema,
            required: true,
            minlength: 1,
        }],
        totalPrice: {
            type: Number,
            min: 1,
        },
        date: {
            type: Date,
            default: Date.now
        }

    }] ,
    totalOrders: {
        type: Number,
        min: 0,
    },
    totalSpendings: {
        type: Number,
    }

});

const Order = mongoose.model('Order',orderSchema)

function validateOrder(order) {
    const schema = Joi.object({
    
        orderedItems: Joi.required()
        
    });
    return schema.validate(order);
}

exports.Order = Order;
exports.validate = validateOrder;
