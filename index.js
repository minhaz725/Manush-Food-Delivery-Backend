const express = require('express')
const Joi = require('joi')
const app = express()

app.use(express.json()) 

const users = [
    {id:1, name: 'hg'},
    {id:2, name: 'bc'},
];

app.get('/' , (req, res) => {
    res.send('Hello Food');
})

app.get('/api/users' , (req, res) => {
    res.send(users);
})

app.get('/api/users/:id' , (req, res) => {
   const user = users.find(u => u.id === parseInt(req.params.id));
   if(!user) return res.status(404).send('User not found')
   else res.send(user);
})

app.post('/api/users', (req, res) => {
        
     const {error} = validateUser(req.body)
     if(error) return res.status(400).send(error.details[0].message);

    const user = {
        id: users.length + 1,
        name: req.body.name
    };
    users.push(user);
    res.send(user);
});

app.put('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if(!user) res.status(404).send('User not found')

    const {error} = validateUser(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    user.name = req.body.name;
    res.send(user)
})


app.delete('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if(!user) return res.status(404).send('User not found')

    const index = users.indexOf(user)
    users.splice(index,1)
    res.send(user)

})

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(user);
}
app.listen(3000)