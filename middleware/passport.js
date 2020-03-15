const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const keys = require('../config/keys')
const mongoose = require('mongoose')
const User = mongoose.model('users')

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, async (payload, done) => {
            try {
                const user = await User.findById(payload.userId).select('email id')
                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                    // or you could create a new account
                }
            } catch (e) {
                console.log(e)
            }
        })
    )
}