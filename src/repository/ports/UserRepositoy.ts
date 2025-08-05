export interface UserRepository {
    create(userToCreate: { name: string; email: string; password: string; }): unknown;
}