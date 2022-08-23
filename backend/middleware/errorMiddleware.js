export const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

export class ValidationError extends Error {
}

export const handleError = (err, req, res, next) => {

    console.error(`${err} --- Status Code: ${res.statusCode}`);

    res.status(err instanceof ValidationError ? res.statusCode : 500);

    res.json({
        message: err instanceof ValidationError ? err.message : 'Sorry, please try again later.',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });

};


