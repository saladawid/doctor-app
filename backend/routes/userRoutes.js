import express from 'express';
import {
    deleteDoctor,
    getDoctor,
    getDoctors, getMessages,
    loginUser,
    profileUser,
    registerUser, sendMessage, taskIsDone,
    updateUser,
} from '../controllers/userController.js';
import {admin, protect} from '../middleware/authMiddleware.js';


export const userRoutes = express.Router();

//SEND MESSAGE
userRoutes.post("/:id/message",protect, sendMessage);
//GET MESSAGES
userRoutes.get("/messages",protect, getMessages);
//
userRoutes.get("/messages/:id", taskIsDone);

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
userRoutes.get("/:id", getDoctor);
//DELETE
userRoutes.delete("/:id", protect, admin, deleteDoctor);

