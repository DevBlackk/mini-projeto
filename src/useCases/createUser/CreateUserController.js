import { CreateUserUseCase } from "./CreateUserUseCase.js";

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