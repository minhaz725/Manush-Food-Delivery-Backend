const express = require('express');
const router = express.Router();
const { Item, validate} = require('../models/item')
const auth = require('../middlewares/auth')

router.get('/' ,auth, async (req, res) => {
    const items = await Item.find().sort('name');
    res.send(items);
})

router.get('/:id' ,auth, async (req, res) => {
   const item = await Item.findById(req.params.id);
   if(!item) return res.status(404).send('Item not found')
   else res.send(item);
})

router.post('/', auth, async (req, res) => {
        
     const {error} = validate(req.body)
     if(error) return res.status(400).send(error.details[0].message);

    let item = new Item ({
        name: req.body.name,
        type: req.body.type,
        price: req.body.price
    });
    item = await item.save()
    res.send(item);
});

router.put('/:id',auth, async (req, res) => {

    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    const item = await Item.findByIdAndUpdate(req.params.id, { name: req.body.name}, {
        new: true
    });
    
    if(!item) res.status(404).send('Item not found')
    res.send(item)
})


router.delete('/:id',auth, async (req, res) => {

    const item = await Item.findByIdAndRemove(req.params.id);
    
    if(!item) return res.status(404).send('Item not found')

    res.send(item)

})

module.exports = router;
