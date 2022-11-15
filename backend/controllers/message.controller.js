import asyncHandler from "express-async-handler";
import {User} from '../models/user.js';
import {Message} from '../models/message.js';
import {ValidationError} from '../middleware/error.middleware.js';


export const sendMessage = asyncHandler(async (req, res) => {
    const {message} = req.body;

    if (!message) {
        res.status(422)
        throw new ValidationError('The message cannot be empty')
    }

    const senderId = await User.findById(req.user._id).select('name surname');
    const recipientId = await User.findById(req.params.id).select('name surname');

    const newMessage = new Message({
        message,
        recipientId,
        senderId,
    });

    await newMessage.save();

    res.status(200).json({
        newMessage,
        message: 'Message has been sent'
    });
});

export const getMessages = asyncHandler(async (req, res) => {
    const messages = await Message.find({recipientId: req.user._id}).populate('senderId', 'email').exec();

    if (messages) {
        res.status(200).json(messages);
    } else {
        res.status(404);
        throw new ValidationError('Messages not found');
    }

});

export const deleteMessage = asyncHandler(async (req, res) => {
    const message = await Message.findById(req.params.id);

    if (message) {
        await message.remove();
        res.json({
            message,
        });
    } else {
        res.status(404);
        throw new ValidationError('Message not found');
    }
});

export const markMessage = asyncHandler(async (req, res) => {
    const message = await Message.findById(req.params.id);

    message.complete = !message.complete;

    await message.save();

    res.json(message);
});
