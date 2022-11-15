import {Test} from '../models/test.js';
import asyncHandler from "express-async-handler";
import {ValidationError} from '../middleware/error.middleware.js';
import {dateAndHour} from '../utils/currentDate.js';
import {scoreTest} from '../utils/scoreTest.js';

export const saveTest = asyncHandler(async (req, res) => {
    const {id, test} = req.params;
    const {eye, verbal, motor} = req.body;

    if ((test === 'glasgow-test') && (eye === 0 || verbal === 0 || motor === 0)) {
        res.status(422);
        throw new ValidationError('Check the appropriate boxes');
    }

    const newTest = new Test({
        ...req.body,
        patientId: id,
        date: dateAndHour(),
        score: scoreTest(req.body),
    });

    await newTest.save();

    res.status(200).json(newTest);
});

export const getTests = asyncHandler(async (req, res) => {
    const {id} = req.params;

    const test = await Test.find({patientId: id}).populate('patientId').exec();

    if (test) {
        res.status(200).json(test);
    } else {
        res.status(404);
        throw new ValidationError('Tests not found');
    }
});

export const deleteTest = asyncHandler(async (req, res) => {
    const test = await Test.findById(req.params.test);

    if (test) {
        await test.remove();
        res.json({
            test,
            message: 'Test removed',
        });
    } else {
        res.status(404);
        throw new ValidationError('Test not found');
    }
    res.json(test);
});
