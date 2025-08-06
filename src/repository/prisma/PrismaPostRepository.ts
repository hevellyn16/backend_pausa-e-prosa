import { PrismaClient } from "@prisma/client";
import { PostRepository } from "src/repository/ports/PostsRepository";
import { RequestCreatePostSchemaType } from "src/dto/post/RequestCreatePostSchema";


export class PrismaPostRepository implements PostRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }
    
    async create(data: RequestCreatePostSchemaType): Promise<any> {
        const newPost = await this.prisma.post.create({
            data: {
                title: data.title,
                content: data.content,
                published: data.published ?? false,
                authorId: data.authorId,
            },
        });
        return newPost;
    }
    
    async update(id: string, data: any): Promise<any> {
        const updatedPost = await this.prisma.post.update({
            where: { id },
            data,
        });
        return updatedPost;
    }

    async delete(id: string): Promise<any> {
        const deletedPost = await this.prisma.post.delete({
            where: { id },
        });
        return deletedPost;
    }

    async findByAuthorId(authorId: string): Promise<any> {
        const posts = await this.prisma.post.findMany({
            where: { authorId },
        });
        return posts;
    }
}