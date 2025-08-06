import { fastify } from "fastify";
import { routes } from "./web/routes/routes";
import formbody from "@fastify/formbody";
import jwt from "@fastify/jwt";

const app = fastify();

app.register(formbody);
app.register(routes);
app.register(jwt, {
    secret: process.env.JWT_SECRET as string,
});
export { app };
// This file is the entry point for the Fastify server, which listens on port 300