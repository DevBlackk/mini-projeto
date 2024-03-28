import { client } from "../../config/prisma/prisma.js";
import { CreateImageUseCase } from "./CreateImageUseCase.js";

class CreateImageController {
    async handle(request, response) {
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

        const postId = request.params.postId;

        const post = await client.post.update({
            where: {
                id: postId,
            },

            data: {
                urlImage: imageResponse.secure_url,
            },
        });

        return response.status(201).json({
            url: imageResponse.secure_url,
            post: post,
        });
    }
}

export { CreateImageController };
