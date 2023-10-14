const fs = require('fs');

const directoryPath = './uploads'; // Specify the directory path

// Check if the directory already exists
if (!fs.existsSync(directoryPath)) {
  // If it doesn't exist, create it
  fs.mkdirSync(directoryPath);
  console.log(`Directory "${directoryPath}" created successfully.`);
} else {
  console.log(`Directory "${directoryPath}" already exists.`);
}

// Continue with your Multer configuration and file upload handling

