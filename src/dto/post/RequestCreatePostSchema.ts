import z from "zod";

const RequestCreatePostSchema = z.object({
            title: z.string().min(1, "Title is required"),
            content: z.string().min(1, "Content is required"),
            published: z.boolean().optional(),
            authorId: z.string().min(1, "Author ID is required"),
})

export { RequestCreatePostSchema };

export type RequestCreatePostSchemaType = z.infer<typeof RequestCreatePostSchema>;
