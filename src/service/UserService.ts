import { UserRepository } from "src/repository/ports/UserRepository";
import { RequestCreateUserSchemaType } from "src/dto/user/RequestCreateUserSchema";
import bcrypt from "bcrypt";

const saltRounds = 10;

export class UserService{
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async findById(id: string) {
        const user = await this.userRepository.findById(id);
        return user;
    }
    async findByEmail(email: string) {
        const user = await this.userRepository.findByEmail(email);
        return user;
    }

    async findByName(name: string) {
        const user = await this.userRepository.findByName(name);
        return user;
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