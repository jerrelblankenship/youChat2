// src/navigation/LoginNavigator.tsx
import Greeting from '@/app/screens/Greeting';
import Login from '@/app/screens/Login';
import Signup from '@/app/screens/Signup';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

const Stack = createNativeStackNavigator();

function LoginNavigator() {
    return (
        <Stack.Navigator initialRouteName="Greeting">
            <>
                <Stack.Screen
                    name="Greeting"
                    component={Greeting}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Signup"
                    component={Signup}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
            </>
        </Stack.Navigator>
    );
}

export default LoginNavigator;
