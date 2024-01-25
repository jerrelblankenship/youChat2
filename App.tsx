import { StatusBar } from 'expo-status-bar';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FIREBASE_AUTH } from './app/services/FirebaseConfig';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './app/navigation/AppNavigation';
import LoginNavigator from './app/navigation/LoginNavigation';

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('User is: ', user);
      setUser(user);
    })
  }, [])

  return (
    <NavigationContainer>
      {user ? (<AppNavigator/>) : ( <LoginNavigator/>)}
    </NavigationContainer>
  );
}
