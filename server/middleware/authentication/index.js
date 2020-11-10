const { date } = require('faker');

const passport = require('passport'),
JwtStrategy = require('passport-jwt').Strategy,
User = require('../../db/models/user'),
ExtractJwt = require('passport-jwt').ExtractJwt;

let jwtOptions = {
    jwtFromRequest: (req) => {
        return req?.sookies?.jwt || ExtractJwt.fromAuthHeaderWitchScheme('jwt')(req);
    },
    secretOrKey: process.env.JWT_SECRET
};

passport.use('jwt', new JwtStrategy(jwtOptions, async(jwtPayload, done) => {
    if (Date.now() > jwtPayload.expires) {
        return done(null, false, {message: 'jwt expired'})
    }
    let {iat, exp, ...userData} = jwtPayload;
    userData = await User.findById(userData._id);
    return done(null, userData);
}));

module.exports = passport;