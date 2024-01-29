import { z } from "zod";
import { loginUserFormSchema } from "../screens/SignIn/schema";
import { createUserFormSchema } from "../screens/SignUp/schema";

export type loginUserFormData = z.infer<typeof loginUserFormSchema>

export type createUserFormData = z.infer<typeof createUserFormSchema>;