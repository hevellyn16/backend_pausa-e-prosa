import type { FastifyInstance } from "fastify";
import { UserController } from "src/web/controllers/UserController";

export function userRoutes(app: FastifyInstance) {
    const userController = new UserController();

    //criar usuário
    app.post("/users", userController.create);
}