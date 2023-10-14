const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 5000;

// Enable CORS for all routes
app.use(cors());

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/uploads/'); 
  },
  filename: (req, file, cb) => {
    const uniqueFileName = `${Date.now()}.${file.originalname.split('.').pop()}`;
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage }).array('files', 8);

app.options('*', cors()); // Enable CORS for all OPTIONS requests

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error('Error uploading files:', err);
      return res.status(500).json({ error: 'Upload failed' });
    }

    const uploadedFiles = req.files.map((file) => ({
      path: file.path, 
    }));
    res.json({ message: 'Files uploaded successfully', uploadedFiles });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
