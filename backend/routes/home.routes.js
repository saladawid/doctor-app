import express from 'express';
import {getData} from '../controllers/home.controller.js';
export const homeRoutes = express.Router();

homeRoutes.get("/", getData);


