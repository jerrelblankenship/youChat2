// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp, getApps } from 'firebase/app';
import { Auth, getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

let FIREBASE_APP, FIREBASE_AUTH: Auth, FIREBASE_DB: Firestore;

// Initialize Firebase only if it hasn't been initialized yet.
if (!getApps().length) {
    FIREBASE_APP = initializeApp(firebaseConfig);
    FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
    FIREBASE_DB = getFirestore(FIREBASE_APP);
} else {
    FIREBASE_APP = getApps()[0];
    FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
    FIREBASE_DB = getFirestore(FIREBASE_APP);
}

export { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DB };
