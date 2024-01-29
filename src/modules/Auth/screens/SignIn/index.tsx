import React from "react";
import * as S from './styles'
import { signInAccount } from "../../services/authFirebase/signInAccount";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../routes";
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginUserFormSchema } from "./schema";
import { loginUserFormData } from "../../types";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

type Props = NativeStackScreenProps<AuthStackParamList, 'SignInScreen'>

export const SignIn = ({ navigation, route }: Props) => {
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
            <S.WrapperFields>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            placeholder="E-mail"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            showError={errors.email}
                            ErrorMessage={errors.email?.message}
                        />
                    )}
                    name="email"
                />

                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            placeholder="Senha"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            showError={errors.password}
                            ErrorMessage={errors.password?.message}
                        />
                    )}
                    name="password"
                />
            </S.WrapperFields>
            <S.WrapperButtons>
                <Button
                    title="Entrar"
                    callback={handleSubmit(onSubmit)}
                />
                <Button
                    routerName="SignUpScreen"
                    title="Cadastrar-se"
                    navigation={navigation}
                    route={route}
                />
            </S.WrapperButtons>
        </S.Container>
    );
}