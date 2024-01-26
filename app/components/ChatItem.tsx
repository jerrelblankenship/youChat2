import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import UnreadIndicator from '@/app/components/UnreadIndicator';

// Define the type for the chat item's expected props
type ChatItemProps = {
    displayName: string;
    lastMessageText: string;
    onPress: () => void;
    unreadCount: number;
  };

  const ChatItem = ({ displayName, lastMessageText, onPress, unreadCount }: ChatItemProps) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{displayName}</Text>
                <Text style={styles.subtitle}>{lastMessageText}</Text>
            </View>
            {unreadCount > 0 && <UnreadIndicator unreadCount={unreadCount} />}
        </TouchableOpacity>
    );
};

// Define the styles for the component
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    contentContainer: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
    },
});

export default ChatItem;
