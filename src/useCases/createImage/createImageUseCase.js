import cloudinary from "../../config/cloudinary/cloudinary.js";
import { client } from "../../config/prisma/prisma.js";

class CreateImageUseCase {
    async execute(request, response) {
        const file = request.file;

        if (!file) {
            return response.status(400).json({
                message: "File not found",
            });
        }

        const fName = file.orinalname.split(".")[0];

        try {
            const uploadImage = await cloudinary.uploader.upload(file.path, {
                resource_type: "image",
                public_id: `post/${fName}`,
            });

            await client.image.create({
                uploadImage,
            });

            return uploadImage;
        } catch (error) {
            console.log(error);
            return response.status(400).json({ message: error.message });
        }
    }
}

export { CreateImageUseCase };
