import  {userRepository} from "src/repository/ports/userRepository";
import { RequestCreateUserSchema } from "src/dto/user/RequestCreateUserSchema";

export class UserService{
    findById(id: string) {
        throw new Error("Method not implemented.");
    }
    findByEmail(email: string) {
        throw new Error("Method not implemented.");
    }
    private userRepository: userRepository;

    constructor(userRepository: userRepository) {
        this.userRepository = userRepository;
    }

    async create(data: RequestCreateUserSchema): Promise<void> {
        //Implementar   
        
    }
}