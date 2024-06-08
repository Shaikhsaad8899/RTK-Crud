// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs'); // Import the fs module
 const path = require('path');
const routes = require('./routes/routes');

const app = express();
const port = 4001;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = '../public/assets/images/products';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage });

app.use(cors());
app.use(bodyParser.json());
app.use(upload.single('image'));
app.use(routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
