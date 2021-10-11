const express = require('express');
const router = express.Router();
const { User, validate} = require('../models/user')

router.get('/' , async (req, res) => {
    const users = await User.find().sort('name');
    res.send(users);
})

router.get('/:id' , async (req, res) => {
   const user = await User.findById(req.params.id);
   if(!user) return res.status(404).send('User not found')
   else res.send(user);
})

router.post('/', async (req, res) => {
        
     const {error} = validate(req.body)
     if(error) return res.status(400).send(error.details[0].message);

    let user = new User ({
        name: req.body.name 
    });
    user = await user.save()
    res.send(user);
});

router.put('/:id', async (req, res) => {

    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findByIdAndUpdate(req.params.id, { name: req.body.name}, {
        new: true
    });
    
    if(!user) res.status(404).send('User not found')
    res.send(user)
})


router.delete('/:id', async (req, res) => {

    const user = await User.findByIdAndRemove(req.params.id);
    
    if(!user) return res.status(404).send('User not found')

    res.send(user)

})

module.exports = router;
