const auth = require('../middlewares/auth')
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, validate, validateLogin} = require('../models/user')

router.post('/signup' ,auth, async (req, res) => {
    
    //console.log(req.body)
    
    
    try {

        const { error } = validate(req.body); 
        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('User already registered.');
        const name = req.body.name
        const email = req.body.email
        const password = await bcrypt.hash(req.body.password, 10) 
        user = await User.create({
            name,
            email ,
            password
        })
        console.log('User created: ' ,user)
        res.status(200).send()
    } catch (error) {
        console.log(error)
        return res.status(400).send("Bad req")
        
    }
    
})
   

router.post('/signin' , async (req, res) => {
    
    try {
        const { error } = validateLogin(req.body); 
        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('Invalid email');
  
         
        if (await bcrypt.compare(req.body.password, user.password)) {
            //res.send('Success')

            //jwt//
            const accessToken = jwt.sign({_id: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '600s' })
            res.cookie('jwt', accessToken , { httpOnly:true }).status(200).send('Successfully Signed In')
            //console.log(res.cookie)

        }
        else {
            res.status(403).send('Incorrect Password')
        }
    } catch (error) {
    console.log(error.message)    
    res.status(500).send()
    }

})
 
router.get('/signout' , async (req, res) => {
    
  
        res.cookie('jwt', '', { maxAge: 1}).status(200).send('Signed Out')
        
})


module.exports = router;
