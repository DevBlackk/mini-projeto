import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase.js";

class AuthenticateUserController {
    async handle(request, response) {
        const { username, password } = request.body;

        const authenticateUserUseCase = new AuthenticateUserUseCase();

        const token = await authenticateUserUseCase.execute({
            username,
            password,
        });

        return response.json(token);
    }
}

export { AuthenticateUserController };
