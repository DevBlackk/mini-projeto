import { client } from "../../config/prisma/prisma.js";
import { CreateImageUseCase } from "./createImageUseCase.js";

class CreateImageController {
    async execute(request, response) {
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
