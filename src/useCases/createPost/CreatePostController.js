import { CreatePostUseCase } from "./CreatePostUseCase.js";

class CreatePostController {
    async handle(request, response) {
        const { content, userId } = request.body;

        const createUserUseCase = new CreatePostUseCase();

        const post = await createUserUseCase.execute({
            content,
            userId,
        });

        return response.json(post);
    }
}

export { CreatePostController }