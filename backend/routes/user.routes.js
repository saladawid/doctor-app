import express from 'express';
import {
    deleteUser,
    getUsers,
    loginUser,
    getLoggedUser,
    registerUser,
    updateUser, getUser,
} from '../controllers/user.controller.js';
import {admin, protect} from '../middleware/auth.middleware.js';

export const userRoutes = express.Router();

userRoutes.get("/profile", protect, getLoggedUser);
userRoutes.get("/:id", protect, getUser);
userRoutes.post("/", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/", protect, getUsers);
userRoutes.delete("/:id", protect, admin, deleteUser);
userRoutes.put("/profile", protect, updateUser);
