import express from 'express';
import {deleteMessage, getMessages, sendMessage, markMessage} from '../controllers/message.controller.js';

export const messageRoutes = express.Router();

messageRoutes.get("/:id", markMessage);
messageRoutes.post("/:id", sendMessage);
messageRoutes.get("/", getMessages);
messageRoutes.delete("/:id", deleteMessage);


