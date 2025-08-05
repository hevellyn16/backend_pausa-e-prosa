// src/web/routes/userRoutes.ts

import { FastifyInstance } from "fastify";
import { UserController } from "../controller/UserController";

export async function userRoutes(app: FastifyInstance) {
    const userController = new UserController();

    // Rota para criar usuário
    app.post('/users', async (request, reply) => {
      await userController.create(request, reply);
    });

    // Adicione outras rotas de usuário aqui
    app.get('/users/:id', async (request, reply) => {
        await userController.findbyId(request, reply);
    });
}