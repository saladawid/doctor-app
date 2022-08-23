import {Patient} from '../models/PatientModel.js';
import asyncHandler from "express-async-handler";
import {ValidationError} from '../middleware/errorMiddleware.js';
import {date} from '../utils/currentDate.js';



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
        res.json({message: 'Patient removed'});
    } else {
        res.status(404);
        throw new ValidationError('Patient not found');
    }
});

export const getPatients = asyncHandler(async (req, res) => {

    const patients = await Patient.find();

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


