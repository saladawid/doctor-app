import {Patient} from '../models/PatientModel.js';
import {Test} from '../models/TestModel.js';
import asyncHandler from "express-async-handler";
import {ValidationError} from '../middleware/errorMiddleware.js';
import {date, dateAndHour} from '../utils/currentDate.js';
import {scoreTest} from '../utils/scoreTest.js';


export const createPatient = asyncHandler(async (req, res) => {
    const {name, surname, dateOfAdmission} = req.body;

    if (!name) {
        res.status(422);
        throw new ValidationError('Name is required');
    }
    if (!surname) {
        res.status(422);
        throw new ValidationError('Surname is required');
    }

    const newPatient = new Patient({
        ...req.body,
        dateOfAdmission: date(dateOfAdmission),
        user: req.user,
    });

    await newPatient.save();

    res.status(200).json(newPatient);
});

export const updatePatient = asyncHandler(async (req, res) => {
    const {name, surname, diagnosis, dateOfAdmission, dateOfDischarge} = req.body;

    if (!name) {
        res.status(422);
        throw new ValidationError('Name is required');
    }
    if (!surname) {
        res.status(422);
        throw new ValidationError('Surname is required');
    }

    const patient = await Patient.findById(req.params.id);

    if (patient) {
        patient.name = name;
        patient.surname = surname;
        patient.diagnosis = diagnosis;
        patient.dateOfAdmission = dateOfAdmission;
        patient.dateOfDischarge = dateOfDischarge;

        const updatedPatient = await patient.save();

        res.status(200).json(updatedPatient);
    } else {
        res.status(404);
        throw new ValidationError('Patients not found');
    }
});

export const deletePatient = asyncHandler(async (req, res) => {
    const patient = await Patient.findById(req.params.id);

    if (patient) {
        await patient.remove();

        res.json({
            patient,
            message: 'Patient removed',
        });
    } else {
        res.status(404);
        throw new ValidationError('Patient not found');
    }
});

export const getPatients = asyncHandler(async (req, res) => {
    const patients = await Patient.find().populate('user', 'email').exec();

    res.status(200).json(patients);
});

export const getPatient = asyncHandler(async (req, res) => {
    const patient = await Patient.findById({_id: req.params.id});

    if (patient) {
        res.status(200).json(patient);
    } else {
        res.status(404);
        throw new ValidationError('Patient not found');
    }
});


export const saveTestPatient = asyncHandler(async (req, res) => {
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

export const getTestPatient = asyncHandler(async (req, res) => {
    const {id} = req.params;

    const test = await Test.find({patientId: id}).populate('patientId').exec();

    res.json(test);
});

export const deleteTestPatient = asyncHandler(async (req, res) => {

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
