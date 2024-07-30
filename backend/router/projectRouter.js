import { acceptRequest, addProject, addProjectFiles, approveColab, approveProject, colabNotification, findProjectsbyId, findSupProjectbyID, NotApprovedshowSupProjects, rejectRequest, searchProjects, showProjects, showProjectsbyEmail, showSupProjects, uploadFiles } from "../controller/projectController.js";
import multer, { memoryStorage } from 'multer';
import express from "express";
import { isUniversityAuthenticated, isUserAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

const upload = multer({ storage: memoryStorage() });

router.get('/getall',isUserAuthenticated, showProjects);
router.get('/get/byemail', showProjectsbyEmail);
router.get('/find/:id', findProjectsbyId);
router.get('/supervisor/getall',isUniversityAuthenticated, showSupProjects);
router.get('/supervisor/byid', findSupProjectbyID);
router.get('/supervisor/getall/notapproved',isUniversityAuthenticated, NotApprovedshowSupProjects);
router.get('/search',searchProjects);
router.get('/colab/notification',isUserAuthenticated,colabNotification);


router.post('/approve',isUniversityAuthenticated, approveProject)
router.post('/colab/approve',isUserAuthenticated, approveColab)
router.post('/colab/accept',isUserAuthenticated, acceptRequest)
router.post('/colab/reject',isUserAuthenticated, rejectRequest)
router.post('/create/new',isUserAuthenticated, addProject);
router.post('/files/upload', upload.array('files'), uploadFiles);
router.post('/add/files', addProjectFiles);

export default router;