import express from "express";
import { getStudentDetails, studentLogin, studentRegister } from "../controller/studentController.js";
import { isAdminAuthenticated, isStudentAuthenticated, isUserAuthenticated } from "../middlewares/auth.js"

const router = express.Router();

router.post("/register",studentRegister);
router.post("/login",studentLogin);


router.get("/me",isStudentAuthenticated,getStudentDetails);

export default router;
