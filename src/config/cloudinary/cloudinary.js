import { v2 as cloudinary } from "cloudinary";
import { upload } from "../../middlewares/multer";
import dotenv from "dotenv";
import { client } from "../prisma/prisma";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

function uploadImage(request, response, next) {
    upload.single(
        "image",
        (request,
        response,
        (error) => {
            if (error) {
                return response.status(400).json({
                    error: error.message,
                });
            }

            const imageFile = request.file;

            const { originalName, mimetype, buffer } = imageFile;

            cloudinary.uploader
                .upload_stream((error, result) => {
                    if (error) throw error;

                    const { publicId } = result;

                    const url = cloudinary.url(publicId, {
                        width: 150,
                        height: 100,
                        crop: "fill",
                    });

                    const data = {
                        name: originalName,
                        type: mimetype,
                        url: url,
                        publicId: publicId,
                    };

                    client.image.create({
                        data: data,
                    });
                })
                .end(buffer);
        })
    );
}
