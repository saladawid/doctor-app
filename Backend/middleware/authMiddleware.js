import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import {User} from '../models/UserModel.js';
import {ValidationError} from './errorMiddleware.js';

export const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')

    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, 'token');
            req.user = await User.findById(decodedToken.id).select('-password');
            next();
        } catch (error) {
            res.status(401);
            throw new ValidationError('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new ValidationError('Not authorized, no token');
    }
});


export const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new ValidationError('Not authorized as an admin')
    }
}