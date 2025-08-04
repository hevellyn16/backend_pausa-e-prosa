import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUserRepository } from "src/repository/prisma/prismaUserRepository";
import { UserService } from "src/service/UserService";
import { RequestCreateUserSchema } from "src/dto/user/RequestCreateUserSchema";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService(new PrismaUserRepository());
    }

    create = async(request: FastifyRequest, reply: FastifyReply) => {
        //criar schema para criar usuário

        const data = RequestCreateUserSchema.parse(request.body);

        await this.userService.create(data);

        return reply.status(201).send({ message: 'User created successfully' });

    }

    findbyId = async(request: FastifyRequest, reply: FastifyReply) => {
         const { id } = request.params as { id: string };

        // Chama o serviço para buscar o usuário
        const user = await this.userService.findById(id);

        // Se o usuário não for encontrado, retorna 404 Not Found
        if (user == null) {
            return reply.status(404).send({ message: 'User not found' });
        }

        // Se o usuário for encontrado, retorna 200 OK com os dados do usuário
        return reply.status(200).send(user);
    }

    findbyEmail = async(request: FastifyRequest, reply: FastifyReply) => {
        // Pega o email dos parâmetros da requisição e faz o type cast
        const { email } = request.params as { email: string };

        // Chama o serviço para buscar o usuário
        const user = await this.userService.findByEmail(email);

        // Se o usuário não for encontrado, retorna 404 Not Found
        if (user == null) {
            return reply.status(404).send({ message: 'User not found' });
        }

        // Se o usuário for encontrado, retorna 200 OK com os dados do usuário
        return reply.status(200).send(user);
    }
}