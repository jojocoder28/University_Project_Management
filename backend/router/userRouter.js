import express from "express";
import { login, logoutAdmin, logoutUser, userRegister, getUserDetails, addAvatar, adminRegister, getUniversityAdminDetails, universityAdminLogin, getUserbyEmail } from "../controller/userController.js";
import { isAdminAuthenticated, isUserAuthenticated } from "../middlewares/auth.js"

const router = express.Router();

router.post("/register",userRegister);
router.post("/login",login);
router.post('/addavatar',addAvatar);
router.post("/admin/addnew",adminRegister);

router.get("/admin/logout",isAdminAuthenticated, logoutAdmin);
router.get("/admin/me",isAdminAuthenticated, getUserDetails);
router.get("/logout", isUserAuthenticated, logoutUser);
router.get("/me", isUserAuthenticated, getUserDetails);
router.get("/profile", getUserbyEmail);



export default router;