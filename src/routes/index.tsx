import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChatStack } from '../modules/Chat/routes';
import { AuthStack } from '../modules/Auth/routes';
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

export const MainStack = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='AuthStack'>
        {
          user ? (
            <Stack.Screen name='ChatStack' component={ChatStack} />
          ) : (
            <Stack.Screen name='AuthStack' component={AuthStack} />
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}