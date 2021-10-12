const express = require('express');
const router = express.Router();
const { Order, validate} = require('../models/order')
const auth = require('../middlewares/auth')
const { User } = require('../models/user');
const { exist } = require('joi');
const { Item } = require('../models/item');

router.get('/' ,auth, async (req, res) => {
    const orders = await Order.find().sort('name');
    res.send(orders);
})

router.get('/:id' ,auth, async (req, res) => {
   const order = await Order.findById(req.params.id);
   if(!order) return res.status(404).send('Order not found')
   else res.send(order);
})

router.post('/', auth, async (req, res) => {
        
     
    ///order validity check///
     let validItems = [];
     for( var i=0; i < req.body.orders.orderedItems.length; i++)
     {
        let item = await Item.findOne({ "name" : req.body.orders.orderedItems[i].name });
        if(item) validItems.push(item)
     }
     if(validItems.length === 0) return res.status(400).send("Invalid order, please try again")
    
     req.body.orders.orderedItems = validItems
    
    
    let existingOrder = await Order.findOne({ "userName._id" : req.user });
    
    ///for old user
    if (existingOrder) {
        
        const orderedItems = req.body.orders.orderedItems
        newTotalPrice = calculatePrice(orderedItems)
        req.body.orders.totalPrice = newTotalPrice

        existingOrder.orders = existingOrder.orders.concat(req.body.orders)
        existingOrder.totalSpendings = existingOrder.totalSpendings + newTotalPrice 
        existingOrder.totalOrders = existingOrder.totalOrders  + 1
        await existingOrder.save()
        //console.log(summary( existingOrder , req.body.orders ))
        receipt = summary( existingOrder)
        return res.status(200).send(receipt);
      
    }
   

    ///for new user
    let user = await User.findById(req.user);
    const orderedItems = req.body.orders.orderedItems
    var totalPrice = calculatePrice(orderedItems)
    let order = await new Order ({
        userName: user,
        orders: {
                    orderedItems : orderedItems,
                    totalPrice : totalPrice
                },
        totalOrders: 1,
        totalSpendings: totalPrice
    });
    order = await order.save()
    receipt = summary( order)
    return res.status(200).send(receipt);
});

router.put('/:id',auth, async (req, res) => {

    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    const order = await Order.findByIdAndUpdate(req.params.id, { name: req.body.name}, {
        new: true
    });
    
    if(!order) res.status(404).send('Order not found')
    res.send(order)
})


router.delete('/:id',auth, async (req, res) => {

    const order = await Order.findByIdAndRemove(req.params.id);
    
    if(!order) return res.status(404).send('Order not found')

    res.send(order)

})

function calculatePrice(orderedItems)
{
    var totalPrice = 0 
    for( var i=0; i < orderedItems.length; i++)
    {
        totalPrice = orderedItems[i].price + totalPrice
    }
    return totalPrice

}

function summary(order)
{
    index = order.__v
    return receipt =  
    { 
        OrderID: order.orders[index]._id,
        CustomerName : order.userName.name ,
        CustomerEmail : order.userName.email,
        ItemList : order.orders[index].orderedItems,
        GrossTotal : order.orders[index].totalPrice,
        OrderTime: order.orders[index].date,
        LifeTimeSpends : order.totalSpendings,
        LifeTimeOrders : order.totalOrders

    }
}

module.exports = router;
