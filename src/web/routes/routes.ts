// src/web/routes/routes.ts

import { FastifyInstance } from 'fastify';
import { userRoutes } from './userRoutes'; 

export async function routes(fastify: FastifyInstance) {

  fastify.register(userRoutes);
}