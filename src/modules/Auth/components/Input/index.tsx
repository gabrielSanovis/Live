import { TextInputProps } from "react-native";
import * as S from './styles'
import { FieldError } from "react-hook-form";

interface Props extends TextInputProps {
    showError: FieldError | undefined;
    ErrorMessage: string | undefined;
    label?: string;
}

export const Input = ({ label, ErrorMessage, showError, ...rest }: Props) => {
    return (
        <>
            <S.TextLabel>{label || rest.placeholder}</S.TextLabel>
            <S.Input
                style={{
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.20,
                    shadowRadius: 1.41,
                    elevation: 2,
                }}
                {...rest}
            />
            {showError ? (<S.TextError style={{ color: "red" }}>{ErrorMessage}</S.TextError>) : null}
        </>
    );
}