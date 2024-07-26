import express, { json, urlencoded } from 'express';
import multer, { memoryStorage } from 'multer';
import { writeFileSync, existsSync, mkdirSync, renameSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cors from "cors";
import { config } from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
config({ path: "./config.env" });
const upload = multer({ storage: memoryStorage() });

app.use(json());
app.use(urlencoded({ extended: true }));

const allowedOrigins = [process.env.FRONTEND_URL, process.env.ADMIN_URL, process.env.UNIVERSITY_ADMIN_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true,
};

app.use(cors(corsOptions));


app.post('/api/upload', upload.array('files'), (req, res) => {
  try {
    const tree = JSON.parse(req.body.tree);
    // const files = req.files;
    const projectId = req.body.projectId;
    
    const uploadDir = join(__dirname, 'uploads',projectId);
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir);
    }
    const treepath = join(uploadDir,'tree.json')
    writeFileSync(treepath, JSON.stringify(tree, null, 2));

    const fileData = req.files.map(file => {
      const filePath = join(uploadDir, file.originalname);
      writeFileSync(filePath, file.buffer);
      return {
          public_id: file.originalname,
          url: filePath,
      };
  });

    // After saving, recreate the directory structure
    // createDirectoryStructure(tree, uploadDir);

    res.status(200).json({ success: true, files: fileData });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// const createDirectoryStructure = (node, currentPath) => {
//   if (node.children && node.children.length > 0) {
//     node.children.forEach((child) => {
//       const childPath = join(currentPath, child.name);

//       if (child.isDirectory) {
//         // Create directory
//         if (!existsSync(childPath)) {
//           mkdirSync(childPath);
//         }
//         // Recurse into the directory
//         createDirectoryStructure(child, childPath);
//       } else {
//         // Move file to the correct location
//         const oldPath = join(__dirname, 'uploads', child.name);
//         const newPath = join(currentPath, child.name);

//         if (existsSync(oldPath)) {
//           renameSync(oldPath, newPath);
//         } else {
//           console.error(`File not found: ${oldPath}`);
//         }
//       }
//     });
//   }
// };

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
})

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
