import { addProject, showProjects, showSupProjects, uploadFiles } from "../controller/projectController.js";
import multer, { memoryStorage } from 'multer';
import express from "express";
import { isUniversityAuthenticated, isUserAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

const upload = multer({ storage: memoryStorage() });

router.get('/getall',isUserAuthenticated, showProjects);
router.get('/supervisor/getall',isUniversityAuthenticated, showSupProjects);

router.post('/create/new',isUserAuthenticated, addProject);
router.post('/files/upload', upload.array('files'), uploadFiles);


export default router;