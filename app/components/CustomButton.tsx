import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const CustomButton = (props: any) => {
    const handleOnPress = () => {
        if (props.onPress && typeof props.onPress === 'function') {
            try {
                props.onPress();
            } catch (error) {
                console.error(
                    'Error executing the `onPress` event passed in to the Custom Button.',
                );
                alert(error);
            }
        } else {
            props.navigation.navigate(props.goto);
        }
    };
    return (
        <TouchableOpacity
            style={{
                elevation: 1,
                backgroundColor: props.bgColor,
                marginTop: 3,
                marginHorizontal: 10,
                borderRadius: 8,
            }}
            onPress={handleOnPress}
        >
            <Text
                style={{
                    color: props.textColor,
                    textAlign: 'center',
                    marginVertical: 5,
                    fontSize: 24,
                    fontWeight: '400',
                }}
            >
                {props.content}
            </Text>
        </TouchableOpacity>
    );
};

export default CustomButton;
