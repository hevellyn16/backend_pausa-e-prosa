import type { FastifyInstance } from "fastify";
import { UserController } from "../controller/UserController";

export function userRoutes(app: FastifyInstance) {
    const userController = new UserController();

    //criar usuário
    app.post('/', userController.create);


    
}