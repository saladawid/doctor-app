import jwt from 'jsonwebtoken';

export const generateToken = (id) => {
    return jwt.sign({id}, 'token', {
        expiresIn: '1d',
    });
};

