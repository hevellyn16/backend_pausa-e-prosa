import { fastify } from "fastify";
import { routes } from "./web/routes/routes";
const app = fastify();

app.register(routes);
export { app };
// This file is the entry point for the Fastify server, which listens on port 300