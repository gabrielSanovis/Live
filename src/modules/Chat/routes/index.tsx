import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Chat } from '../screens/Chat';
import { Text, TouchableOpacity } from 'react-native';
import { signOutFirebase } from '../services/authFirebase/signOutFirebase';
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

export const ChatStack = () => {
    const user = auth().currentUser?.email
    return (
        <Stack.Navigator>
            <Stack.Screen name='ChatScreen' component={Chat} options={{
                headerTitle: user || "",
                headerRight: () => (
                    <TouchableOpacity onPress={() => signOutFirebase()}>
                        <Text>Sair</Text>
                    </TouchableOpacity>
                )
            }} />
        </Stack.Navigator>
    );
}