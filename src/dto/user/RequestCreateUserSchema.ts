import z from "zod";

const RequestCreateUserSchema = z.object({
            name: z.string().min(1, "Name is required"),
            email: z.string().email("Invalid email format"),
            password: z.string().min(6, "Password must be at least 6 characters"),
})

export { RequestCreateUserSchema };

export type RequestCreateUserSchemaType = z.infer<typeof RequestCreateUserSchema>;
    