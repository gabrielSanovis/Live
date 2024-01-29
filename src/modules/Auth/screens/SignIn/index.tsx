import React from "react";
import * as S from './styles'
import { signInAccount } from "../../services/authFirebase/signInAccount";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../routes";
import { useForm, Controller } from 'react-hook-form'
import { Text, TextInput } from "react-native";
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

type Props = NativeStackScreenProps<AuthStackParamList, 'SignInScreen'>

const loginUserFormSchema = z.object({
    email: z.string({
        required_error: "O campo email está vazio..."
    })
        .min(1, 'O campo email está vazio.'),
    password: z.string({
        required_error: "O campo senha está vazio..."
    })
        .min(1, 'O campo senha está vazio.')
})

export type loginUserFormData = z.infer<typeof loginUserFormSchema>

export const SignIn = ({ navigation }: Props) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<loginUserFormData>({
        resolver: zodResolver(loginUserFormSchema)
    });

    const onSubmit = (data: loginUserFormData) => signInAccount(data);

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
            <S.LinkButton>
                <S.LinkText onPress={handleSubmit(onSubmit)}>
                    Logar Usuário
                </S.LinkText>
            </S.LinkButton>
            <S.LinkButton onPress={() => navigation.navigate("SignUpScreen")}>
                <S.LinkText>
                    Navegar para o cadastro
                </S.LinkText>
            </S.LinkButton>
        </S.Container>
    );
}