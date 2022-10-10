import express from 'express';
import {getData} from '../controllers/homeController.js';
export const homeRoutes = express.Router();


//GET DATA
homeRoutes.get("/", getData);


