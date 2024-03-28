import { client } from "../../config/prisma/prisma.js";

class CreatePostUseCase {
    async execute({content}) {
        const post = await client.post.create({
            data: {
                content,
            },
        });

        return post;
    }
}

export { CreatePostUseCase }
