import express from "express";
import { isAdminAuthenticated, isUserAuthenticated } from "../middlewares/auth.js"
import { getUniversityDetails, UniversityRegister } from "../controller/universityController.js";

const router = express.Router();

router.post("/register",isAdminAuthenticated, UniversityRegister);

router.get("/getall", getUniversityDetails);


export default router;