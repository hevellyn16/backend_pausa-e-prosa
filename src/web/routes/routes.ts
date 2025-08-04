import type { FastifyInstance } from "fastify";

export async function routes(app: FastifyInstance) {
  app.get("/", async (request, reply) => {
    return { message: "Welcome to the Fastify server!" };
  });

  // Add more routes here as needed
}