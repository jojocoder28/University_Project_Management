import express, { json, urlencoded } from 'express';
import multer, { memoryStorage } from 'multer';
import fs, { writeFileSync, existsSync, mkdirSync, renameSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname, join } from 'path';
import cors from "cors";
import { config } from "dotenv";
import archiver from 'archiver';

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

const createDirectoryStructure = (node, currentPath, projectId) => {
  if (node.children && node.children.length > 0) {
    node.children.forEach((child) => {
      const childPath = path.join(currentPath, child.name);

      if (child.isDirectory) {
        if (!fs.existsSync(childPath)) {
          fs.mkdirSync(childPath);
        }
        createDirectoryStructure(child, childPath);
      } else {
        const oldPath = path.join(__dirname, 'uploads', child.name);
        const newPath = path.join(currentPath, child.name);

        if (fs.existsSync(oldPath)) {
          fs.renameSync(oldPath, newPath);
        } else {
          console.error(`File not found: ${oldPath}`);
        }
      }
    });
  }
};

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/api/upload', upload.any(), (req, res) => {
  try {
    const tree = JSON.parse(req.body.tree);
    const files = req.files;
    const projectId = req.body.projectId;

    const uploadDir = path.join(__dirname, 'uploads', projectId);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const treePath = path.join(uploadDir, 'tree.json');
    fs.writeFileSync(treePath, JSON.stringify(tree, null, 2));

    const fileUrls = files.map((file) => {
      const filePath = path.join(uploadDir, file.originalname);
      const dirPath = path.dirname(filePath);

      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      fs.writeFileSync(filePath, file.buffer);
      return {
        public_id: file.originalname,
        url: `${req.protocol}://${req.get('host')}/uploads/${projectId}/${file.originalname}`
      };
    });

    res.status(200).send({
      message: 'Files and tree structure saved successfully',
      files: fileUrls
    });
  } catch (error) {
    console.error('Error saving files:', error);
    res.status(500).send({message:'Internal server error'});
  }
});

app.get('/api/download/:projectId', (req, res) => {
  const projectId = req.params.projectId;
  const uploadDir = path.join(__dirname, 'uploads', projectId);

  if (!fs.existsSync(uploadDir)) {
    return res.status(404).send({ message: 'Project not found' });
  }

  const zipPath = path.join(__dirname,'uploads' , `${projectId}.zip`);
  const output = fs.createWriteStream(zipPath);
  const archive = archiver('zip', { zlib: { level: 9 } });

  output.on('close', () => {
    console.log(`Archive created: ${zipPath} (${archive.pointer()} total bytes)`);
    res.download(zipPath, `${projectId}.zip`, (err) => {
      if (err) {
        console.error('Error downloading zip:', err);
      }
      fs.unlink(zipPath, (unlinkErr) => {
        if (unlinkErr) {
          console.error('Error removing zip file:', unlinkErr);
        }
      });
    });
  });

  archive.on('error', (err) => {
    console.error('Archive error:', err);
    res.status(500).send({ message: 'Internal server error' });
  });

  archive.pipe(output);

  // Check if directory exists and has files
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return res.status(500).send({ message: 'Internal server error' });
    }

    if (files.length === 0) {
      return res.status(404).send({ message: 'No files to archive' });
    }

    archive.directory(uploadDir, false);
    archive.finalize();
  });
});


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
