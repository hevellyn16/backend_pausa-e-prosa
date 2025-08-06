export interface PostRepository {
    create(data: any): Promise<any>;
    update(id: string, data: any): Promise<any>;
    delete(id: string): Promise<any>;
    findByAuthorId(authorId: string): Promise<any>;
}