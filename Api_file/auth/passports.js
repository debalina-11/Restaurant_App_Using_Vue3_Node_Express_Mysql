var JwtStrategy = require("passport-jwt").Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt

const db = require('../Models')
const Users = db.users

const getUser = async obj => {
    return await Users.findOne({
        where: obj,
    });
};

module.exports = function (passport) {
    console.log("yes")
    // console.log(email)
    let params = {}
    params.secretOrKey = "dola123",
    params.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
    passport.use(
    new JwtStrategy(params, function (jwt_payload, next) {
            console.log(jwt_payload)
          let user = getUser({ email: jwt_payload.email })
            if (user) {
                next(null, user)
            } else {
                next(null, false)
            }
        })

    )
}