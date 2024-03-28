import multer from "multer";

const storage = multer.diskStorage({
    filename: (request, file, callback) => {
        let fileExt = file.originalname.split(".").pop();

        const fileName = `${new Date().getTime}.${fileExt}`;

        callback(null, fileName);
    },
});

const fileFilter = (request, file, callback) => {
    if (file.mimetype !== "image/jpeg" || file.mimetype !== "image/png") {
        request.fileValidationError = "File type must be image/jpeg or image/png";

        return callback(null, false, request.fileValidationError);
    } else {
        callback(null, true);
    }
};

const upload = multer({
    storage,
    fileFilter,
}).single("image");

export default upload;
