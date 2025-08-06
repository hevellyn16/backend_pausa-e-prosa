import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUserRepository } from "src/repository/prisma/PrismaUserRepository";
import { UserService } from "src/service/UserService";
import { RequestCreateUserSchema } from "src/dto/user/RequestCreateUserSchema";
import bcrypt from 'bcrypt';

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

    findByName = async(request: FastifyRequest, reply: FastifyReply) => {
        // Pega o nome dos parâmetros da requisição e faz o type cast
        const { name } = request.params as { name: string };

        // Chama o serviço para buscar o usuário
        const user = await this.userService.findByName(name);

        // Se o usuário não for encontrado, retorna 404 Not Found
        if (user == null) {
            return reply.status(404).send({ message: 'User not found' });
        }

        // Se o usuário for encontrado, retorna 200 OK com os dados do usuário
        return reply.status(200).send(user);
    }

    login = async (request: FastifyRequest, reply: FastifyReply) => {
        // 1. Extrai o email e a senha do corpo da requisição e valida
        const { email, password } = request.body as any; // Valide com Zod!

        // 2. Encontra o usuário pelo email
        const user = await this.userService.findByEmail(email) as { password: string, id: string, role: string } | null;

        // 3. Verifica se o usuário existe e se a senha está correta
        if (!user || !await bcrypt.compare(password, user.password)) {
            return reply.status(401).send({ message: "Invalid email or password" });
        }

        // 4. Se a autenticação for bem-sucedida, gera um token JWT
        // Use request.jwtSign if reply.jwtSign is not available
        const token = await (request as any).jwtSign({
            id: user.id,
            role: user.role
        });

        // 5. Retorna o token na resposta
        return reply.status(200).send({ token });
    };
}