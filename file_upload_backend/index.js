const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  dbName: "university_project_management"
})
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(`Some error occured while connecting to database : ${err}`);
  });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'project-management',
    resource_type: 'raw',
    public_id: (req, file) => {
      const fileNameWithoutExtension = file.originalname.split('.').slice(0, -1).join('.');
      const fileExtension = file.originalname.split('.').pop();
      return `files/${fileNameWithoutExtension}.${fileExtension}`;
    },
  },
});

const fileStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'project-management/files',
    resource_type: 'raw',
    public_id: (req, file) => `files/${file.originalname.split('.')[0]}`,
  },
});

const imageUpload = multer({ storage: imageStorage });
const fileUpload = multer({ storage: fileStorage });

const jobRequestSchema = new mongoose.Schema({
  projectid: String,
  title: String,
  description: String,
  deadline: Date,
  submissions: [
    {
      email: String,
      files: [
        {
          url: String,
          public_id: String
        }
      ],
      caption: String,
      createdAt: { type: Date, default: Date.now }
    }
  ]
});

const JobRequest = mongoose.model('JobRequest', jobRequestSchema);

app.post('/job-requests', async (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const description = req.body.description;
  const deadline = req.body.deadline;

  const jobRequest = new JobRequest({
    projectid: id,
    title: title,
    description: description,
    deadline: deadline
  });
  await jobRequest.save();
  res.status(200).json({
    success: true,
    jobRequest,
    message: "Job Request has been Created"
  });
});

app.get('/job-requests', async (req, res) => {
  const jobRequests = await JobRequest.find({ projectid: req.query.id });
  res.status(200).json({
    success: true,
    jobRequests
  });
});

app.post('/job-requests/:id/submissions', imageUpload.array('images', 5), async (req, res) => {
  const jobRequest = await JobRequest.findById(req.params.id);

  const currentDate = new Date();
  if (currentDate > jobRequest.deadline) {
    return res.status(400).json({
      success: false,
      message: 'Submission is closed. The deadline has passed.'
    });
  }

  const images = req.files.filter(file => file.fieldname === 'images').map(file => ({ url: file.path, public_id: file.filename }));

  const submission = {
    email: req.body.email,
    files: images,
    caption: req.body.caption
  };

  jobRequest.submissions.push(submission);
  await jobRequest.save();
  res.status(200).json({
    success: true,
    jobRequest,
    message: "Submitted Successfully"
  });
});

// New endpoint for fetching submissions by job request ID
app.get('/job-requests/:id/submissions', async (req, res) => {
  try {
    const jobRequest = await JobRequest.findById(req.params.id);
    if (!jobRequest) {
      return res.status(404).json({
        success: false,
        message: 'Job Request not found'
      });
    }

    res.status(200).json({
      success: true,
      submissions: jobRequest.submissions
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `An error occurred: ${err.message}`
    });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));
