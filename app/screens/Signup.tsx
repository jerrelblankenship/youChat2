import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useState } from 'react';
import colors from '@/assets/colors';
import CustomButton from '@/app/components/CustomButton';
import Heading from '@/app/components/Heading';
import { NavigatingProperties } from '@/app/navigation/NavigatingProperties';
import FirebaseService from '@/app/services/FirebaseService';
import { ChatUser } from '@/app/types/ChatUser';

const Signup = ({ navigation }: NavigatingProperties) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const setupAccount = async() => {
      const fbService = new FirebaseService();
      const user: ChatUser = {email, firstName, lastName}

      const accountCreated: boolean = await fbService.createUserAccount(user, password);
      console.log(accountCreated)

      if (accountCreated) {
        alert('Your User Account has been created.');
      } else {
        alert('The Registration Attempt Failed: ' + email);
      }
    }

    return (
        <SafeAreaView style={{ backgroundColor: 'white', paddingHorizontal: 7 }}>
            <View
                style={{
                    marginTop: 24,
                    width: '80%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Heading content="Create Account" />
            </View>
            <View style={{ marginTop: 10, marginHorizontal: 10, width: '80%' }}>
                <TextInput
                    onChangeText={setFirstName}
                    placeholder="First Name"
                    placeholderTextColor={colors.textDark}
                    value={firstName}
                    style={styles.input}
                />
                <TextInput
                    onChangeText={setLastName}
                    placeholder="Last Name"
                    placeholderTextColor={colors.textDark}
                    value={lastName}
                    style={styles.input}
                />
                <TextInput
                    onChangeText={setEmail}
                    placeholder="Email"
                    placeholderTextColor={colors.textDark}
                    value={email}
                    style={styles.input}
                />
                <TextInput
                    secureTextEntry
                    onChangeText={setPassword}
                    placeholder="Password"
                    placeholderTextColor={colors.textDark}
                    value={password}
                    style={styles.input}
                />
            </View>
            <View style={{ marginTop: 15, paddingTop: 20 }}>
                <CustomButton
                    navigation={navigation}
                    bgColor={colors.primary}
                    textColor={colors.textWhite}
                    content="Sign Up"
                    onPress={setupAccount}
                />
            </View>
            <View style={{ marginTop: 5, alignItems: 'center' }}>
                <></>
                <View
                    style={{
                        marginTop: 24,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                    }}
                >
                    <Text>Already have a accout?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Signup;

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#b8c5ca',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginTop: 10,
    },
});
