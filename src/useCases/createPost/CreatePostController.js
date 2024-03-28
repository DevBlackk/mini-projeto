import { CreatePostUseCase } from "./CreatePostUseCase.js";

class CreateUserController {
    async handle(request, response) {
        const { content } = request.body;

        const createUserUseCase = new CreatePostUseCase();

        const user = await createUserUseCase.execute({
            content
        });

        return response.json(user);
    }
}

export { CreateUserController }