import { client } from "../../config/prisma/prisma.js";
import { CreateImageUseCase } from "./CreateImageUseCase.js";

class CreateImageController {
    async handel(request, response) {
        const createImageUseCase = new CreateImageUseCase();

        if (request.fileValidationError) {
            return response.status(400).json({
                message: `File validation error: ${request.fileValidationError}`,
            });
        }

        const imageResponse = await createImageUseCase.execute(
            request,
            response
        );

        const image = await client.image.create({
            data: {
                type: imageResponse.type,
                url: imageResponse.secure_url,
                publicId: imageResponse.public_id,
            },
        });

        console.log(image);

        return response.status(200).json({
            imageResponse: imageResponse.secure_url,
            data: image,
        });
    }
}

export { CreateImageController };

import cloudinary from "../../config/cloudinary/cloudinary.js";

class CreateImageUseCase {
    async execute(request, response) {
        const file = request.file;

        if (!file) {
            return response.status(400).json({
                message: "File not found",
            });
        }

        const fName = file.originalname;

        try {
            const uploadImage = await cloudinary.uploader.upload(file.path, {
                resource_type: 'image',
                public_id: `post/${fName}`,
            });

            return uploadImage;
        } catch (error) {
            console.log(error);
            return response.status(400).json({ message: error.message });
        }
    }
}

export { CreateImageUseCase };
