import mongoose from 'mongoose';

const PatientModel = mongoose.Schema({
        name: {
            type: String,
        },
        surname: {
            type: String,
        },
        diagnosis: {
            type: String,
        },
        dateOfAdmission: {
            type: String,
        },
        dateOfDischarge: {
            type: String,
        },
        user: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'User',
        }
}, {
    timestamps: true,
});

export const Patient = mongoose.model('Patient', PatientModel);