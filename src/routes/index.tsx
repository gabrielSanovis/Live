import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChatStack } from '../modules/Chat/routes';
import { AuthStack } from '../modules/Auth/routes';

const Stack = createNativeStackNavigator();

export const MainStack = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='AuthStack'>
            <Stack.Screen name='AuthStack' component={AuthStack} />
            <Stack.Screen name='ChatStack' component={ChatStack} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}