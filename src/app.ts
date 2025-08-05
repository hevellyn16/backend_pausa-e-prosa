import { fastify } from "fastify";
import { routes } from "./web/routes/routes";
import formbody from "@fastify/formbody";

const app = fastify();

app.register(formbody);
app.register(routes);
export { app };
// This file is the entry point for the Fastify server, which listens on port 300