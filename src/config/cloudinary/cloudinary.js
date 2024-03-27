import { v2 as cloudinary } from "cloudinary";
import { upload } from "../../middlewares/multer.js";
import dotenv from "dotenv";
import { client } from "../prisma/prisma.js";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export function uploadImage(request, response, next) {
    upload(request, response, (error) => {
        console.log(error);
        if (error) {
            return response.status(400).json({
                error: error.message,
            });
        }
        console.log("texto");

        const imageFile = request.file;

        const { originalName, mimetype, buffer } = imageFile;
        console.log(buffer);

        new Promise((resolve) => {
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
                    console.log(data);
                    client.image.create({
                        data: data,
                    });

                    return;
                })
                .end(buffer);
        }).then(response => response.status(201).json({
            message: "Imagem enviada com sucesso!",
            response: response
        }))
    });
}
