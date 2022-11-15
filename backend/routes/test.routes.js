import express from 'express';
import {saveTest, deleteTest, getTests} from '../controllers/test.controller.js';


export const testRoutes = express.Router();

testRoutes.get("/:id", getTests);
testRoutes.post("/:test/:id", saveTest);
testRoutes.delete("/:test", deleteTest);

