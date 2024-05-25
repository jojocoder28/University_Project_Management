import express from "express";
import { login, logoutAdmin, logoutUser, userRegister, getUserDetails } from "../controller/userController.js";
import { isAdminAuthenticated, isUserAuthenticated } from "../middlewares/auth.js"

const router = express.Router();

router.post("/register",userRegister);
router.post("/login",login);


router.get("/admin/logout",isAdminAuthenticated, logoutAdmin);
router.get("/logout", isUserAuthenticated, logoutUser);
router.get("/me", isUserAuthenticated, getUserDetails);


export default router;