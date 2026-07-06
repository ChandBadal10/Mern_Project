import multer from "multer";

// memoryStorage keeps the file as a Buffer (req.file.buffer / req.files.xxx[0].buffer)
// which is exactly what ImageKit's upload() expects.
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;