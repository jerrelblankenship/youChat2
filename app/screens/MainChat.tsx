import {
    ActivityIndicator,
    Button,
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { FIREBASE_AUTH, FIREBASE_DB } from '@/app/services/FirebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { ChatChannel } from '@/app/types/ChatChannel';
import { NavigatingProperties } from '../navigation/NavigatingProperties';
import {
    Firestore,
    collection,
    doc,
    getDoc,
    onSnapshot,
    orderBy,
    query,
    where,
} from 'firebase/firestore';
import ChatItem from '../components/ChatItem';

const handleSignOut = async () => {
    await signOut(FIREBASE_AUTH);
};

const MainChat = ({ navigation }: NavigatingProperties) => {
    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        // Listen for authentication state to change.
        const unsubscribeAuth = onAuthStateChanged(FIREBASE_AUTH, (user) => {
            setCurrentUser(user);
        });

        return unsubscribeAuth;
    }, []);

    useEffect(() => {
        if (currentUser) {
            // Create a query against the collection.
            const q = query(
                collection(FIREBASE_DB, 'channels'),
                where('participants', 'array-contains', currentUser.uid),
                orderBy('lastMessage.createdAt', 'desc'),
            );
            console.log(q);
            // Listen to query Snapshot
            const unsubscribe = onSnapshot(
                q,
                async (querySnapshot) => {
                    const fetchedChannels = querySnapshot.docs.map(async (doc) => {
                        const channelInfo = doc.data();
                        const lastMessage = channelInfo.lastMessage || {
                            messageText: 'No messages yet',
                            createdAt: new Date(),
                        };
                        const otherUserId = channelInfo.participants.find(
                            (p: string) => p !== currentUser.uid,
                        );
                        const otherUser = await getDisplayName(otherUserId);
                        return {
                            id: doc.id,
                            ...channelInfo,
                            otherUser,
                            lastMessage,
                            unreadCount: 1, // TODO: need to figure this out.
                        };
                    });

                    const channelData = await Promise.all(fetchedChannels);
                    setChannels(channelData);
                    setLoading(false);
                },
                (err) => {
                    console.error('Failed to fetch channels: ', err);
                    setLoading(false);
                },
            );

            // Cleanup subscription on unmount
            return () => unsubscribe();
        }
    }, [currentUser]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={channels}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ChatItem
                        displayName={item.otherUser} // Implement this function based on your user's data
                        lastMessageText={item.lastMessage.messageText}
                        unreadCount={item.unreadCount}
                        onPress={() => {
                            console.log('Chat Item Pressed, ChannelId:', item.id);
                        }}
                    />
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No chats available.</Text>
                }
            />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Button onPress={handleSignOut} title="Logout" />
            </View>
        </View>
    );
};

const getDisplayName = async (otherUserId: string) => {
    try {
        const userDoc = await getDoc(doc(FIREBASE_DB, 'users', otherUserId))

        if (userDoc.exists()) {
            const user = userDoc.data()
            const displayName = user.firstname + ' ' + user.lastname

            return displayName
        } else {
            return "I Don't Know"
        }
    } catch (error) {
        console.error('Error getting the recipient information: ', error)
        return 'Error'
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    emptyText: {
        marginTop: 50,
        textAlign: 'center',
    },
});

export default MainChat;
