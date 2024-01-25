import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import React from 'react';
import { NavigatingProperties } from '@/app/navigation/NavigatingProperties';
import Heading from '@/app/components/Heading';
import colors from '@/assets/colors';
import CustomButton from '@/app/components/CustomButton';

const Greeting = ({ navigation }: NavigatingProperties) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../../assets/GreetingsImage.png')}
                    style={{ width: 200, height: 250 }}
                />
            </View>
            <View style={{ marginTop: 125, paddingHorizontal: 5 }}>
                <Heading content="Welcome to YouChat2" />
            </View>
            <View style={{ marginVertical: 15 }}>
                <TouchableOpacity
                    style={styles.inputTop}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.inputTopText}>Login</Text>
                </TouchableOpacity>
                <CustomButton
                    navigation={navigation}
                    bgColor={colors.bgGray}
                    textColor={colors.textDark}
                    goto="Signup"
                    content="Signup"
                />
            </View>
        </SafeAreaView>
    );
};

export default Greeting;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 7,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 200,
    },
    inputTop: {
        elevation: 1,
        backgroundColor: colors.primary,
        marginTop: 3,
        borderRadius: 8,
        margin: 10,
        minWidth: 250,
        height: 40
    },
    inputTopText: {
      fontSize:24,
      fontWeight: '500',
      color: colors.textWhite,
      marginVertical: 5,
      textAlign: 'center',
      textAlignVertical: 'center'
    }
});
