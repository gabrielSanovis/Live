import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Chat } from '../screens/Chat';

const Stack = createNativeStackNavigator();

export const ChatStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='ChatScreen' component={Chat} />
        </Stack.Navigator>
    );
}