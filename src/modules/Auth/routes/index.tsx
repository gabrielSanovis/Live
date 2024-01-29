import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignUp } from '../screens/SignUp';
import { SignIn } from '../screens/SignIn';

export type AuthStackParamList = {
    SignInScreen: undefined;
    SignUpScreen: undefined;
  };

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack = () => {
    return(
        <Stack.Navigator initialRouteName='SignInScreen'>
            <Stack.Screen name='SignInScreen' component={SignIn} />
            <Stack.Screen name='SignUpScreen' component={SignUp} />
        </Stack.Navigator>
    );
}