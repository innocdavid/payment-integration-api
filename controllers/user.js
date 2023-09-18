// import modules
import bcrypt from 'bcrypt';
import { expressValidator } from 'express-validator';
import colors from 'colors';
import User from '../models/user.js';

const createUser = async (req, res) => {
    const errors = expressValidator(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, firstName, lastName } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword, firstName, lastName });
        await user.save();
        res.status(201).json({ data: user, message: 'User created successfully' });
    } catch (err) {
        console.error(err.bgRed);
        res.status(500).json({ error: err.message });
    }
}

export { createUser, } 