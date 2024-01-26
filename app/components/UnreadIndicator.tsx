import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type UnreadIndicatorProps = {
    unreadCount: number;
};

const UnreadIndicator = ({ unreadCount }: UnreadIndicatorProps) => {
    return (
        <View style={styles.unreadContainer}>
            <Text style={styles.unreadText}>{unreadCount}</Text>
        </View>
    );
};

// Define the styles for the component
const styles = StyleSheet.create({
    unreadContainer: {
        backgroundColor: 'red',
        borderRadius: 12,
        padding: 6,
        minWidth: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    unreadText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default UnreadIndicator;
