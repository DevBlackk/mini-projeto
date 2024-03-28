import bcrypt from "bcrypt";

import { client } from "../../config/prisma/prisma.js";

class CreateUserUseCase {
    async execute({username, password, email}) {
        const userAlreadyExists = await client.user.findFirst({
            where: {
                email: email,
            },
        });

        if (userAlreadyExists) {
            throw new Error("User already exists");
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await client.user.create({
            data: {
                username,
                email,
                password: passwordHash,
            },
        });

        return user;
    }
}

export { CreateUserUseCase };
