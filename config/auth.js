var passport = require('passport')

var passportJWT = require('passport-jwt')
var ExtractJwt = passportJWT.ExtractJwt
var Strategy = passportJWT.Strategy 

var users = require('./users')
var config = require('./config')

var params = {  
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

module.exports = function() {  
    var strategy = new Strategy(params, (payload, callback) => {
        var user = users[payload.id] || null
        // ^^ change to User.findById
        if (user) {
            return callback(null, {
                id: user.id
            })
        } else {
            return callback(new Error("User not found"), null)
        }
    })
    passport.use(strategy)
    return {
        initialize: function() {
            return passport.initialize()
        },
        authenticate: function() {
            return passport.authenticate("jwt", {session: false})
        }
    }
}