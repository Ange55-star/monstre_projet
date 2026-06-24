const express = require('express');
const router = express.Router();

const upload = require('../middlewares/upload.middleware');
const authenticateToken = require('../middlewares/auth.middleware');

const imageController =
  require('../controllers/image.controller');

router.post(
  '/upload',
  authenticateToken,
  upload.single('image'),
  imageController.uploadImage
);

module.exports = router;