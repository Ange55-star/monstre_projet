exports.uploadImage = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        message: 'Aucune image envoyée'
      });
    }

    res.status(200).json({
      message: 'Image uploadée',
      filename: req.file.filename,
      path: req.file.path
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};