import React from "react";
import * as S from './styles'
import { createAccount } from "../../services/authFirebase/createAccount";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../routes";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserFormSchema } from "./schema";
import { createUserFormData } from "../../types";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

type Props = NativeStackScreenProps<AuthStackParamList, 'SignUpScreen'>

export const SignUp = ({ navigation, route }: Props) => {

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

                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            placeholder="Confirmar senha"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            showError={errors.confirm_password}
                            ErrorMessage={errors.confirm_password?.message}
                        />
                    )}
                    name="confirm_password"
                />
            </S.WrapperFields>
            <S.WrapperButtons>
                <Button
                    title="Cadastrar Usuário"
                    callback={handleSubmit(onSubmit)}
                />
                <Button
                    title="Voltar"
                    routerName="SignInScreen"
                    navigation={navigation}
                    route={route}
                />
            </S.WrapperButtons>
        </S.Container>
    );
}