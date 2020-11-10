const User = require('../db/models/user');
const { sendWelcomeEmail } = require('../emails');
cloudinary = require('cloudinary').v2,
{ sendWelcomeEmail } = require('../../emails/index'),
jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
    const {name, email, password} = req.body;
    try{
        const user = new User({name, email, password});
        await user.save()
        sendWelcomeEmail(user.email, user.name);
        const token = user.generateAuthToken()
        res.cookie('jwt', token, {
            httpOnly: true,
            sameSite: 'Strict',
            secure: process.env.NODE_ENV !== 'production' ? false : true
        });
        res.status(201).json(user);
    } catch (e) {
        res.status(400).json({ error: e.toString() });
    }
};

exports.loginUser = async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken()
        res.cookie('jwt', token, {
            httpOnly: true,
            sameSite: 'Strict',
            secure: process.env.NODE_ENV !== 'production' ? false : true
        });
        res.json(user);
    } catch (e) {
        res.status(400).json({ error: e.toString() });
    }
};