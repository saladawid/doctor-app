import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import {User} from '../models/user.js';
import {ValidationError} from '../middleware/error.middleware.js';
import {generateToken} from '../utils/generateToken.js';

export const registerUser = asyncHandler(async (req, res) => {
    const {name, surname, email, password, isAdmin} = req.body;

    const userExists = await User.findOne({email});

    if (userExists) {
        res.status(409);
        throw new ValidationError('The user already exists in the database');
    }
    if (!email) {
        res.status(422);
        throw new ValidationError('Email is required');
    }
    if (!email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
        throw new ValidationError('Invalid email');
    }
    if (password.length <= 4) {
        res.status(422);
        throw new ValidationError('Password is too short. Five characters required');
    }

    const user = new User({
        name, surname, email, password, isAdmin,
    });

    await user.save();
    res.status(200).json(user);
});


export const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if (!user) {
        res.status(401);
        throw new ValidationError('Invalid email or password');
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (matchPassword) {
        res.json({
            email: user.email, name: user.name, surname: user.surname, token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new ValidationError('Invalid email or password');
    }
});

export const getLoggedUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.status(200).json({
            email: user.email,
            name: user.name,
            surname: user.surname,
            password: '',
            newPassword: '',
        });
    } else {
        res.status(404);
        throw new ValidationError('User not found');
    }
});

export const updateUser = asyncHandler(async (req, res) => {
    const {name, surname, email, password, newPassword} = req.body;

    const user = await User.findById(req.user._id);

    const newUser = await User.findOne({email: email});

    if (!email) {
        res.status(422);
        throw new ValidationError('Email is required');
    }
    if (!email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
        res.status(422);
        throw new ValidationError('Invalid email');
    }
    if (newUser && (email !== user.email)) {
        res.status(409);
        throw new ValidationError('The email already exists in the database');
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (user.isAdmin) {
        res.status(422);
        throw new ValidationError('Admin profile cannot be updated');
    }
    if (!password && newPassword) {
        res.status(422);
        throw new ValidationError('Enter current password');
    }
    if (user) {
        user.name = name;
        user.surname = surname;
        user.email = email;

        if (password) {
            if (comparePassword) {
                if (newPassword && newPassword.length > 4) {
                    user.password = newPassword;
                } else {
                    res.status(422);
                    throw new ValidationError('Invalid new password. Five characters required');
                }
            } else {
                res.status(422);
                throw new ValidationError('Invalid password');
            }
        }

        const updateUser = await user.save();

        res.status(200).json({
            user: updateUser.name, surname: updateUser.surname, email: updateUser.email,
            message: 'User profile has been updated',
        });
    } else {
        res.status(404);
        throw new ValidationError('User not found');
    }
});

export const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404);
        throw new ValidationError('User not found');
    }
});

export const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find();

    if (users) {
        res.status(200).json(users);
    } else {
        res.status(404);
        throw new ValidationError('Users not found');
    }
});

export const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user.isAdmin) {
        res.status(422);
        throw new ValidationError('Admin profile cannot be deleted');
    }
    if (user) {
        await user.remove();
        res.json({
            user,
            message: 'User removed',
        });
    } else {
        res.status(404);
        throw new ValidationError('Users not found');
    }
});