import {
    ActivityIndicator,
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

const Login = ({ navigation }: NavigatingProperties) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const loginAccount = async () => {
        setLoading(true);
        const fbService = new FirebaseService();
        const response: boolean = await fbService.loginUser(email, password);

        if (!response) {
            alert('There was an issue logging into your account. Please try again.');
        }

        setLoading(false);
    };

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
                <Heading content="Welcome Back" />
            </View>
            <View style={{ marginTop: 10, marginHorizontal: 10, width: '80%' }}>
                <TextInput
                    onChangeText={setEmail}
                    placeholder="Email"
                    placeholderTextColor={colors.textDark}
                    value={email}
                    style={styles.input}
                />
                <TextInput
                    secureTextEntry
                    autoCapitalize="none"
                    onChangeText={setPassword}
                    placeholder="Password"
                    placeholderTextColor={colors.textDark}
                    value={password}
                    style={styles.input}
                />
            </View>
            <View style={{ marginTop: 15, paddingTop: 20 }}>
                {loading ? (
                    <ActivityIndicator size={'large'} color={'#0000ff'} />
                ) : (
                    <CustomButton
                        navigation={navigation}
                        bgColor={colors.primary}
                        textColor={colors.textWhite}
                        content="Login"
                        onPress={loginAccount}
                    />
                )}
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
                    <Text>Don't have a accout?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                        <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Login;

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#b8c5ca',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginTop: 10,
    },
});
