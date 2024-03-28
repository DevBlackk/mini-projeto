import { sign } from "jsonwebtoken";

class GenerateTokenProvider {
    async execute(userId) {
        const token = sign({}, process.env.TOKEN_KEY, {
            subject: userId,
            expiresIn: "420s",
        });

        return token;
    }
}

export { GenerateTokenProvider };
