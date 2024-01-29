import { z } from "zod";

export const loginUserFormSchema = z.object({
    email: z.string({
        required_error: "O campo email está vazio..."
    })
        .min(1, 'O campo email está vazio.'),
    password: z.string({
        required_error: "O campo senha está vazio..."
    })
        .min(1, 'O campo senha está vazio.')
})