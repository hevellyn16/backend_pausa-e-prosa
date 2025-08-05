import { UserRepository } from "src/repository/ports/UserRepositoy";
import { RequestCreateUserSchemaType } from "src/dto/user/RequestCreateUserSchema";
import bcrypt from "bcrypt";

const saltRounds = 10;

export class UserService{
    findById(id: string) {
        throw new Error("Method not implemented.");
    }
    findByEmail(email: string) {
        throw new Error("Method not implemented.");
    }
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async create(data: RequestCreateUserSchemaType){
        try {
            const hashedPassword = await bcrypt.hash(data.password, saltRounds);
            const userToCreate = {
                name: data.name,
                email: data.email,
                password: hashedPassword,
            };
            await this.userRepository.create(userToCreate);
        } catch (error) {
            console.error("Error creating user:", error);
            throw new Error("User creation failed");
        }
    }
}