import express from "express";
import { generateSignature } from "../controllers/generateSignature.js";

export const signRouter = express.Router();

signRouter.post("/", generateSignature);
