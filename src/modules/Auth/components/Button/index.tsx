import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as S from "./styles"
import { AuthStackParamList } from "../../routes";

interface Props extends NativeStackScreenProps<AuthStackParamList, 'SignInScreen' | 'SignUpScreen'> {
    routerName: keyof AuthStackParamList;
    title: string;
    callback: () => void
}

export const Button = ({navigation, routerName, title, callback}: Partial<Props>) => {
    return (
        <S.LinkButton
            style={{
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 4,
                },
                shadowOpacity: 0.30,
                shadowRadius: 4.65,
                elevation: 4,
            }}
            onPress={() => (navigation && routerName) ? navigation.navigate(routerName) : (callback && callback())}
        >
            <S.LinkText>
                {title}
            </S.LinkText>
        </S.LinkButton>
    );
}