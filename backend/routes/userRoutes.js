import express from 'express';
import {
    deleteDoctor,
    deleteMessage,
    getDoctor,
    getDoctors,
    getMessages,
    loginUser,
    profileUser,
    registerUser,
    sendMessage,
    taskIsDone,
    updateUser,
} from '../controllers/userController.js';

import {admin, protect} from '../middleware/authMiddleware.js';

export const userRoutes = express.Router();

//SEND MESSAGE
userRoutes.post("/:id/message",protect, sendMessage);
//GET MESSAGES
userRoutes.get("/messages",protect, getMessages);
//DELETE MESSAGE
userRoutes.delete("/messages/:id",protect, deleteMessage);

// TASK IS DONE
userRoutes.get("/messages/:id",protect, taskIsDone);

//REGISTER USER
userRoutes.post("/", registerUser);
//LOGIN USER
userRoutes.post("/login", loginUser);

userRoutes.route("/profile")
    //GET USER
    .get(protect, profileUser)
    //UPDATE USER
    .put(protect, updateUser);

//GET DOCTORS
userRoutes.get("/", protect, getDoctors);
//GET DOCTOR
userRoutes.get("/:id", protect, getDoctor);
//DELETE DOCTOR
userRoutes.delete("/:id", protect, admin, deleteDoctor);

