import { CreateUserUseCase } from "./CreateUserUseCase.js";

// Terminar o useCase do refreshTokem e testar as rotas

class CreateUserController {
    async handle(request, response) {
        const { username, email, password } = request.body;

        const createUserUseCase = new CreateUserUseCase();

        const user = await createUserUseCase.execute({
            username,
            email,
            password,
        });

        return response.json(user);
    }
}

export { CreateUserController }