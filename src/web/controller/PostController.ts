import { FastifyRequest, FastifyReply } from "fastify";
import { RequestCreateUserSchemaType } from "src/dto/user/RequestCreateUserSchema";
import { PostRepository } from "src/repository/ports/PostsRepository";
import { PrismaPostRepository } from "src/repository/prisma/PrismaPostRepository";

declare module '@fastify/jwt' {
    interface FastifyJWT {
        user: {
            id: string;
            role: 'USER' | 'ADMIN';
        }
    }
}

export class PostController {
    private postRepository: PostRepository;

    constructor() {
        this.postRepository = new PrismaPostRepository();
    }

    create = async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const data = request.body as RequestCreateUserSchemaType;

            const authorId = request.user.id;

            const newPost = await this.postRepository.create(data);
            reply.status(201).send(newPost);
        } catch (error) {
            reply.status(500).send({ error: 'Failed to create post' });
        }
    }


}