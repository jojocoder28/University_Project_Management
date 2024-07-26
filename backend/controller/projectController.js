import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { University } from "../models/universitySchema.js";
import ErrorHandler from "../middlewares/error.js";
import cloudinary from "cloudinary";
import { User } from "../models/userSchema.js";
import { Project } from "../models/projectSchema.js";
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import multer from "multer";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// const createDirectoryStructure = (node, currentPath, id) => {
//     if (node.children && node.children.length > 0) {
//       node.children.forEach((child) => {
//         const childPath = path.join(currentPath, child.name);
  
//         if (child.isDirectory) {
//           if (!fs.existsSync(childPath)) {
//             fs.mkdirSync(childPath);
//           }
//           createDirectoryStructure(child, childPath);
//         } else {
//           const oldPath = path.join(__dirname, 'uploads',id, child.name);
//           const newPath = path.join(currentPath, child.name);
  
//           if (fs.existsSync(oldPath)) {
//             fs.renameSync(oldPath, newPath);
//           } else {
//             console.error(`File not found: ${oldPath}`);
//           }
//         }
//       });
//     }
//   };

export const uploadFiles = catchAsyncErrors(async (req, res, next) => {
    console.log(req.files);
    try {
        // console.log(req.files)
        // console.log(req.body.files)
        const tree = JSON.parse(req.body.tree);
        const files = req.files;
        const projectId = "0";
        // Save tree structure to a file
        
        // Ensure the uploads directory exists
        const uploadDir = join(__dirname, 'uploads',projectId);
        if (!existsSync(uploadDir)) {
          mkdirSync(uploadDir);
        }
        const treepath = join(uploadDir,'tree.json')
        writeFileSync(treepath, JSON.stringify(tree, null, 2));
    
        // Save files to local storage
        files.forEach((file) => {
          const filePath = join(uploadDir, file.originalname);
          writeFileSync(filePath, file.buffer);
        });
    
        // After saving, recreate the directory structure
        createDirectoryStructure(tree, uploadDir);
    
        res.status(200).send('Files and tree structure saved successfully');
      } catch (error) {
        console.error('Error saving files:', error);
        res.status(500).send('Internal server error');
      }

});



export const addProject = catchAsyncErrors(async (req, res, next) => {
  const { projectId, projectName, description, supervisor, email, university, date } =
    req.body;
    // console.log(req.body);
  if (
    !projectId || !projectName || !description || !supervisor
  ) {
    return next(new ErrorHandler("Please Give All Details!", 400));
  }

  const isRegistered = await Project.findOne({ projectId });
  if (isRegistered) {
    return next(new ErrorHandler("Project with this ID has already been created!", 400));
  }
  const isSupervisor = await User.findOne({ email:supervisor, role:'UniversityAdmin' });
  if (!isSupervisor) {
    return next(new ErrorHandler("Supervisor not found with this email!", 400));
  }

  const project = await Project.create({
    projectId: projectId,
    projectName: projectName,
    description: description,
    creatorEmail: email,
    supervisor: supervisor,
    university: university,
    creationDate: date,
    isApproved: false,
  });

  const user = await User.findOneAndUpdate(
    { email: email },
    { $push: { projects: projectId } },
    { new: true, useFindAndModify: false }
);

  res.status(200).json({
      success: true,
      project,
      message: "Project has been created successfully"
    });
});


export const showProjects = catchAsyncErrors(async (req,res,next)=>{
  const project = await Project.find({creatorEmail:req.user.email});
  res.status(200).json({
    success: true,
    project,
  })
})

export const showSupProjects = catchAsyncErrors(async (req,res,next)=>{
  const project = await Project.find({supervisor:req.user.email});
  res.status(200).json({
    success: true,
    project,
  })
})