import { env } from 'env';
import { app } from './app';
import { PrismaUserRepository } from './repository/prisma/prismaUserRepository';
import { UserService } from './service/UserService';

const prismaUserRepository = new PrismaUserRepository();

const userService = new UserService(prismaUserRepository);

app.listen({ port: env.PORT, host: '0.0.0.0' }, () => {
  console.log(`Server is running at http://localhost:${env.PORT}`);
});
