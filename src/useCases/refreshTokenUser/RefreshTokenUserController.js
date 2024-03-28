import { RefreshTokenUserUseCase } from "./RefreshTokenUserUseCase.js";

class RefreshTokenUserController {
    async handle(request, response) {
        const { refresh_token } = request.body;

        const refreshTokenUserUseCase = new RefreshTokenUserUseCase();

        const token = await refreshTokenUserUseCase.execute(refresh_token);

        return response.json(token);
    }
}

export { RefreshTokenUserController };
