import dayjs from "dayjs";

import { client } from "../config/prisma/prisma.js";

class GenerateRefreshToken {
    async execute(userId) {
        const expiresIn = dayjs().add(15, "second").unix();

        const generateRefreshToken = await client.refreshToken.create({
            data: {
                userId: userId,
                expiresIn: expiresIn,
            },
        });

        return generateRefreshToken;
    }
}

export { GenerateRefreshToken };
