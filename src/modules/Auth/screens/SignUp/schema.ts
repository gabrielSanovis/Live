import { z } from "zod";

export const createUserFormSchema = z
    .object({
        email: z.string({
            required_error: "O campo email está vazio..."
        })
            .min(1, 'O campo email está vazio.'),
        password: z.string({
            required_error: "O campo senha está vazio..."
        })
            .min(1, 'O campo senha está vazio.'),
        confirm_password: z.string({
            required_error: "O campo de confirmação de senha está vazio..."
        })
            .min(1, 'O campo de confirmação de senha está vazio.')
    })
    .refine(({ password, confirm_password }) => password === confirm_password, {
        message: "As senhas não são iguais.",
        path: ["confirm_password"]
    })