var jwt = require('jsonwebtoken');
var _=require('lodash');
function verifyJWTToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err || !decodedToken) {
                return reject(err)
            }

            resolve(decodedToken)
        })
    })
}

function createJWToken(details) {


    if (!details.maxAge || typeof details.maxAge !== 'number') {
        details.maxAge = 3600
    }

    let token = jwt.sign({
        id: details.id
    }, process.env.JWT_SECRET, {
        expiresIn: details.maxAge,
        algorithm: 'HS256'
    })

    return token
}

module.exports={createJWToken,verifyJWTToken}