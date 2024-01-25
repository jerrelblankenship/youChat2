// src/navigation/AppNavigator.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import MainChat from '@/app/screens/MainChat'

const InsideStack = createNativeStackNavigator()

function AppNavigator() {
    return (
        <InsideStack.Navigator initialRouteName="Main">
            <>
                <InsideStack.Screen name="Main" component={MainChat} />
            </>
        </InsideStack.Navigator>
    )
}

export default AppNavigator
