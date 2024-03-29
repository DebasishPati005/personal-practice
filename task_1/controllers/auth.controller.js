const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

exports.signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const hashedPw = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPw });

        const userData = await newUser.save();

        res.json({ result: 'User is created successfully!', user: { ...userData._doc, password: undefined } });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const samePass = await bcrypt.compare(password, user.password);
        if (!samePass) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const accessToken = jwt.sign({ email: user.name, id: user._id }, JSON.stringify(process.env.JWT_SECRET), { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', accessToken });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

