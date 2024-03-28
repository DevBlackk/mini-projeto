import { compare } from "bcrypt";
import { client } from "../../config/prisma/prisma.js";
import { GenerateRefreshToken } from "../../provider/generateRefreshToken.js";
import { GenerateTokenProvider } from "../../provider/generateRefreshToken.js";

class AuthenticateUserUseCase {
    async execute(email, password) {
        const userAlreadyExist = await client.user.findFirst({
            where: {
                email: email,
            },
        });

        if (!userAlreadyExist) {
            throw new Error("User or password incorrect.");
        }

        const passwordMatch = await compare(
            password,
            userAlreadyExist.password
        );
        if (!passwordMatch) {
            throw new Error("User or password incorrect.");
        }

        const generateTokenProvider = new GenerateTokenProvider();
        const token = await generateTokenProvider.execute(userAlreadyExist.id);

        await client.refreshToken.deleteMany({
            where: {
                userId: userAlreadyExist.id,
            },
        });

        const generateRefreshToken = new GenerateRefreshToken();
        const refreshToken = await generateRefreshToken.execute(
            userAlreadyExist.id
        );

        return {
            token: token,
            refreshToken: refreshToken,
        };
    }
}

export { AuthenticateUserUseCase };
