import { verify } from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config()

export function ensureAuthenticated(request, response, next) {
    const authToken = request.headers.authorization;

    if (!authToken) {
        return response.status(401).json({
            message: "Token is missing",
        });
    }

    const [, token] = authToken.split(" ");

    try {
        verify(token, process.env.TOKEN_KEY);

        return next();
    } catch (error) {
        return response.status(401).json({
            message: "Token invalid",
        });
    }
}
