import express from 'express';
import {
    savePatient,
    updatePatient,
    deletePatient,
    getPatient,
    getPatients,
    getSummary
} from '../controllers/patient.controller.js';

export const patientRoutes = express.Router();

patientRoutes.get("/", getPatients);
patientRoutes.get("/:id", getPatient);
patientRoutes.post("/", savePatient);
patientRoutes.put("/:id", updatePatient);
patientRoutes.delete("/:id", deletePatient);
patientRoutes.get("/:id/summary", getSummary);


