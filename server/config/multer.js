import multer from "multer";

// memoryStorage keeps each uploaded file as a Buffer (available at file.buffer)
// which is what ImageKit's upload() function expects.
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;