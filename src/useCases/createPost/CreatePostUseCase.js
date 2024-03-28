import { client } from "../../config/prisma/prisma.js";

class CreatePostUseCase {

    async execute({content, userId, urlImage}) {

        const post = await client.post.create({
            data: {
                content,
                userId,
                urlImage,
            },
        });

        return post;
    }
}

export { CreatePostUseCase }
