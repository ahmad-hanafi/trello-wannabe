const { User } = require('../models')
const bcrypt = require('bcrypt')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');

class UserController {
    static register(req, res, next) {
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        User.create(newUser)
            .then((user) => {
                res.status(201).json({ name: user.name, email: user.email })
            })
            .catch((err) => {
                console.log(err)
                next(err)
            })
    }

    static login(req, res, next) {
        const { email, password } = req.body
        if (req.body.email === '') {
            next({
                code: 400,
                message: "Email cannot be empty"
            })
        } else if (req.body.password === '') {
            next({
                code: 400,
                message: "Password cannot be empty"
            })
        } else {
            User.findOne({ where: { email } })
                .then((user) => {
                    if (user) {
                        const isValidPassword = bcrypt.compareSync(password, user.password)
                        if (isValidPassword) {
                            let payload = { id: user.id, name: user.name, email: user.email }
                            res.status(200).json({ name:payload.name, access_token: generateToken(payload) })

                        } else {
                            next({
                                code: 400,
                                message: "invalid email or password"
                            })
                        }
                    } else {
                        // console.log("masuk else user")
                        next({
                            code: 400,
                            message: "invalid email or password"
                        })
                    }
                })
                .catch(err => {
                    // console.log(err, "masuk catch")
                    next({
                        code: 500,
                        msg: err
                    })
                })
        }
    }

    static google(req, res, next) {
        const googleclientID = process.env.GOOGLE_CLIENT
        const client = new OAuth2Client(googleclientID)
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: req.body.token,
                audience: googleclientID
            });

            const googleUserParams = ticket.getPayload();
            User.findOrCreate({
                where: {
                    email: googleUserParams.email
                },
                defaults: {
                    name: googleUserParams.name,
                    email: googleUserParams.email,
                    password: (new Date()).toDateString()
                }
            })
                .then(user => {
                    let payload = { id: user[0].id, email: user[0].email, name: user[0].name }
                    const access_token = generateToken(payload)
                    res.status(200).json({ name:payload.name,access_token })
                })
        }
        verify().catch(console.error);
    }
}

module.exports = UserController