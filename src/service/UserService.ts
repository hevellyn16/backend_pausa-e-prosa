import { UserRepository } from "src/repository/ports/UserRepositoy";
import { RequestCreateUserSchemaType } from "src/dto/user/RequestCreateUserSchema";

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

    async create(data: RequestCreateUserSchemaType): Promise<void> {
        //Implementar   
        
    }
}