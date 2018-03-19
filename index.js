const express = require('express')
const parser = require('body-parser')
const cors = require('cors')
const jwt = require('jwt-simple')

const auth = require('./config/auth')();
const users = require('./config/users')
const config = require('./config/config')

const dogController = require('./controllers/dogs.js')

const app = express()

app.use(cors())
app.use(parser.json())
app.use(auth.initialize());

app.get("/", (req, res) => {  
    res.json({
        status: "Working!"
    })
})

app.get("/user", auth.authenticate(), (req, res) => {  
    let user = users[req.user.id]
    res.json(user)
})

app.post('/login', (req, res) => {
    if (req.body.email && req.body.password) {
        let email = req.body.email
        let password = req.body.password
        let user = users.find(u => {
            return u.email === email && u.password === password
        });
        if (user) {
            var payload = {
                id: user.id
            }
            var token = jwt.encode(payload, config.jwtSecret)
            res.json({
                token: token
            });
        } else {
            res.sendStatus(401)
        } 
    } else {
        res.sendStatus(401)
    }
})

app.use('/api/dogs', dogController)

app.listen(3001, () => console.log('Listening on port 3001 :)'))