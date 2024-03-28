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

        return response.status(200).json({
            imageResponse: imageResponse.secure_url,
        });
    }
}

export { CreateImageController };
