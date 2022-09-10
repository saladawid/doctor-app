import mongoose from 'mongoose';

const MessageModel = mongoose.Schema({
    message: {
        type: String,
    },
    senderId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    recipientId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    complete: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

export const Message = mongoose.model('Message', MessageModel);