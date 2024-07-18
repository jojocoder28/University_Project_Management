import express from "express";
import { isAdminAuthenticated, isUniversityAuthenticated, isUserAuthenticated } from "../middlewares/auth.js"
import { getStudentDetails, getUniversityDetails, universityAdminRegister, UniversityRegister } from "../controller/universityController.js";
import { getUniversityAdminDetails, logoutUniversityAdmin, universityAdminLogin } from "../controller/userController.js";

const router = express.Router();

router.post("/register",isAdminAuthenticated, UniversityRegister);
router.post("/admin/adduniversityadmin",isAdminAuthenticated,universityAdminRegister);
router.post("/admin/login",universityAdminLogin);

router.get("/getall", getUniversityDetails);
router.get("/admin/universityadmin/getall",isUniversityAuthenticated, getUniversityAdminDetails);
router.get("/admin/logout",isUniversityAuthenticated, logoutUniversityAdmin);
router.get("/student/getall",isUniversityAuthenticated, getStudentDetails);

export default router;