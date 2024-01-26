import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FIREBASE_AUTH } from '../services/FirebaseConfig'
import { signOut } from 'firebase/auth'

const handleSignOut = async() => {
  await signOut(FIREBASE_AUTH);
}

const MainChat = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button onPress={handleSignOut} title='Logout'/>
    </View>
  )
}

export default MainChat

const styles = StyleSheet.create({})
