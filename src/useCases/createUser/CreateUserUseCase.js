import { hash } from "bcrypt";

import { client } from "../../config/prisma/prisma.js";

class CreateUserUseCase {
    async execute(username, password, email) {
        const userAlreadyExists = await client.user.findFirst({
            where: {
                email: email,
            },
        });

        if (userAlreadyExists) {
            throw new Error("User already exists");
        }

        const passwordHash = await hash(password, 8);

        const user = await client.user.create({
            data: {
                username: username,
                email: email,
                password: passwordHash,
            },
        });

        return user;
    }
}

export { CreateUserUseCase };
