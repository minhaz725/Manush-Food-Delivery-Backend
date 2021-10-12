const express = require('express');
const router = express.Router();
const { Order, validate} = require('../models/order')
const auth = require('../middlewares/auth')
const { User } = require('../models/user')

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
        
     //const {error} = validate(req.body)
     //if(error) return res.status(400).send(error.details[0].message);
     
    let od = await Order.findOne({ "userName._id" : req.user });
    
    if (od) {
        
        od.orderedItems = od.orderedItems.concat(req.body.orderedItems)
        od.totalPrice = calculatePrice(od.orderedItems)
        await od.save()
        return res.status(200).send(od);
      
    }
   


    let user = await User.findById(req.user);
    var totalPrice = calculatePrice(req.body.orderedItems)
    let order = new Order ({
        userName: user,
        orderedItems: req.body.orderedItems,
        totalPrice: totalPrice
    });
    order = await order.save()
    res.status(200).send(order);
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

module.exports = router;
