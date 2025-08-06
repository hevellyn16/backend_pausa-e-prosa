export interface UserRepository {
    findByName(name: string): unknown;
    findByEmail(email: string): unknown;
    findById(id: string): unknown;
    create(userToCreate: { name: string; email: string; password: string; }): unknown;
}