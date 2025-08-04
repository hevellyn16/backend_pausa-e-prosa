import type { FastifyInstance } from "fastify";

export async function routes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    return { message: 'Hello, Fastify!' };
  });

  // Add more routes here as needed
}
