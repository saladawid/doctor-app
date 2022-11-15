import {User} from '../models/user.js';
import {Message} from '../models/message.js';
import {Test} from '../models/test.js';
import {Patient} from '../models/patient.js';
import asyncHandler from "express-async-handler";

export const getData = asyncHandler(async (req, res) => {

    const userLength = await User.countDocuments();
    const patientLength = await Patient.countDocuments();
    const testLength = await Test.countDocuments();
    const messageLength = await Message.countDocuments();

    res.status(200).json({
        userLength,
        patientLength,
        testLength,
        messageLength,
    });
});





