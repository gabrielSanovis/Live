import React from "react";
import * as S from './styles'
import { createAccount } from "../../services/authFirebase/createAccount";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../routes";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Text, TextInput } from "react-native";

type Props = NativeStackScreenProps<AuthStackParamList, 'SignUpScreen'>

const createUserFormSchema = z
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

export type createUserFormData = z.infer<typeof createUserFormSchema>;

export const SignUp = ({ navigation }: Props) => {

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<createUserFormData>({
        resolver: zodResolver(createUserFormSchema)
    });

    const onSubmit = (data: createUserFormData) => createAccount(data)

    return (
        <S.Container>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="E-mail"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="email"
            />
            {errors.email ? (<Text style={{ color: "red" }}>{errors.email.message}</Text>) : null}

            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="Senha"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="password"
            />
            {errors.password ? (<Text style={{ color: "red" }}>{errors.password.message}</Text>) : null}

            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="Confirmar senha"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="confirm_password"
            />
            {errors.confirm_password ? (<Text style={{ color: "red" }}>{errors.confirm_password.message}</Text>) : null}
            <S.LinkButton onPress={handleSubmit(onSubmit)}>
                <S.LinkText>
                    Cadastrar Usuário
                </S.LinkText>
            </S.LinkButton>
            <S.LinkButton onPress={() => navigation.navigate("SignInScreen")}>
                <S.LinkText>
                    Navegar para o login
                </S.LinkText>
            </S.LinkButton>
        </S.Container>
    );
}