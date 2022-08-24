import express from 'express';
import {
    createPatient,
    updatePatient,
    deletePatient,
    getPatient,
    getPatients, saveTestPatient, deleteTestPatient, getTestPatient,
} from '../controllers/patientController.js';

export const patientRoutes = express.Router();

//GET PATIENTS
patientRoutes.get("/", getPatients);
//GET PATIENT
patientRoutes.get("/:id", getPatient);
//CREATE PATIENT
patientRoutes.post("/", createPatient);
//UPDATE PATIENT
patientRoutes.put("/:id", updatePatient);
//DELETE PATIENT
patientRoutes.delete("/:id", deletePatient);

//SAVE TEST PATIENT
patientRoutes.post("/:id/:test", saveTestPatient);
//DELETE TEST PATIENT
patientRoutes.delete("/:id/tests/:test", deleteTestPatient);
//GET PATIENT'S TESTS
patientRoutes.get("/:id/tests", getTestPatient);