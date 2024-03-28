import { client } from "../../config/prisma/prisma.js";

class CreatePostUseCase {
    async execute({content, userId}) {
        const post = await client.post.create({
            data: {
                content,
                userId,
            },
        });

        return post;
    }
}

export { CreatePostUseCase }
