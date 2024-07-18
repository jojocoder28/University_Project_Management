import express from "express";
import { isAdminAuthenticated, isUserAuthenticated } from "../middlewares/auth.js"
import { getUniversityDetails, universityAdminRegister, UniversityRegister } from "../controller/universityController.js";
import { getUniversityAdminDetails, universityAdminLogin } from "../controller/userController.js";

const router = express.Router();

router.post("/register",isAdminAuthenticated, UniversityRegister);
router.post("/admin/adduniversityadmin",isAdminAuthenticated,universityAdminRegister);
router.post("/admin/login",universityAdminLogin);

router.get("/getall", getUniversityDetails);
router.get("/admin/universityadmin/getall",isAdminAuthenticated, getUniversityAdminDetails);


export default router;