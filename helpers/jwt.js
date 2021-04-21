const jwt = require('jsonwebtoken')

let JWT_SECRET = process.env.JWT_SECRET

const generateToken = (payload) => jwt.sign(payload, JWT_SECRET)
const verifyToken = (token) => jwt.verify(token, JWT_SECRET)

module.exports = { generateToken, verifyToken }