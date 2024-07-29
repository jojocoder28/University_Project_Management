import { addProject, addProjectFiles, approveProject, findProjectsbyId, NotApprovedshowSupProjects, searchProjects, showProjects, showSupProjects, uploadFiles } from "../controller/projectController.js";
import multer, { memoryStorage } from 'multer';
import express from "express";
import { isUniversityAuthenticated, isUserAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

const upload = multer({ storage: memoryStorage() });

router.get('/getall',isUserAuthenticated, showProjects);
router.get('/find/:id', findProjectsbyId);
router.get('/supervisor/getall',isUniversityAuthenticated, showSupProjects);
router.get('/supervisor/getall/notapproved',isUniversityAuthenticated, NotApprovedshowSupProjects);
router.get('/search',searchProjects);

router.post('/approve',isUniversityAuthenticated, approveProject)
router.post('/create/new',isUserAuthenticated, addProject);
router.post('/files/upload', upload.array('files'), uploadFiles);
router.post('/add/files', addProjectFiles);

export default router;