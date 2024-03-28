import multer from "multer";

const storage = multer.diskStorage({
    filename: (request, file, callback) => {
        let fileExt = file.originalname.split(".").pop();

        const fileName = `${new Date().getTime}.${fileExt}`;

        callback(null, fileName);
    },
});

const fileFilter = (request, file, callback) => {
        callback(null, true);
};

const upload = multer({
    storage,
    fileFilter,
}).single("image");

export default upload;
