// import modules
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import colors from 'colors';
import User from '../models/user.js';
import mongoose from 'mongoose';

const createUser = async (req, res) => {
    const errors = validationResult(req);

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

const getUser = async (req, res) => {
    const errors = validationResult(req);

    if (errors) {
        return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.params.id;

    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user id format' });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ data: user });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}

export { createUser, getUser, };