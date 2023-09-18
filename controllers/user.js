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

    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user id format' });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ data: user });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}

const updateUser = async (req, res) => {
    const errors = validationResult(req);

    if (errors) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { email, password, firstName, lastName } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user id format' });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.stats(404).json({ message: 'User not found' });
        }

        if (email) user.email = email;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;

        await user.save();
        res.status(200).json({ data: user, message: 'User updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}

const deleteUser = async (req, res) => {
    const errors = validationResult(req);

    if (errors) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user id format' });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.remove();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).jsons({ message: err.message });
    }
}

export { createUser, getUser, updateUser, deleteUser };