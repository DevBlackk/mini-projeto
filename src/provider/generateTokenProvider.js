import { sign } from "jsonwebtoken";

class GenerateTokenProvider {
    async execute(userId) {
        const token = sign({}, "2ba219ee-f9e2-4c4b-9397-296e0edd5aef", {
            subject: userId,
            expiresIn: "420s",
        });

        return token;
    }
}

export { GenerateTokenProvider };
