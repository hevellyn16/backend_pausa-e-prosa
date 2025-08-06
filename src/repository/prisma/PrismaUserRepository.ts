import { UserRepository } from "../ports/UserRepository";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export class PrismaUserRepository implements UserRepository {
    async create(data: { name: string; email: string; password: string }) {
        const newUser = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
            },
        });
        return newUser;
    }
    
    async findById(id: string) {
        const user = await prisma.user.findUnique({
            where: { id },
        });
        return user;
    }
    
    async findByEmail(email: string) {
        const user = await prisma.user.findFirst({
            where: { email: { contains: email, mode: 'insensitive' } },
        });
        return user;
    }

    async findByName(name: string) {
        const user = await prisma.user.findFirst({
            where: { name: { contains: name, mode: 'insensitive' } },    
        });
        return user;
    }
}