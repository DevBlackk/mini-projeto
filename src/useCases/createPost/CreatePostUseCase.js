import { client } from '../../config/prisma/prisma.js'

class CreatePostUseCase {
    async execute(content, publicId, url) {
        const post = await client.post.create({
            data: {
                content,
                publicId,
                url,
            }
        })

        return post;
    }
}