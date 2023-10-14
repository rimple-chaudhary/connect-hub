const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/") 
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`) 
  }
});

const upload = multer({ storage: storage }); //Middleware

app.post('/uploads', upload.single('uploaded_file'), (req, res) => {
   
    const uploadedFile = req.file;
    if (uploadedFile) {
      console.log(`File uploaded successfully: ${uploadedFile.originalname}`);
    } else {
      console.log('No file uploaded');
    }
    

//   res.send('Files uploaded successfully');
res.redirect("/");
});
 
app.get('/', (req, res) => {
    return res.render("homepage ")
 })

app.use(express.urlencoded({extended: false}))

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});


