import { ChatUser } from '@/app/types/ChatUser';
import { FIREBASE_AUTH, FIREBASE_DB } from './FirebaseConfig';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

class FirebaseService {
    public async createUserAccount(user: ChatUser, password: string): Promise<boolean> {
        try {
            const userCredentials = await createUserWithEmailAndPassword(
                FIREBASE_AUTH,
                user.email,
                password,
            );

            const newUser = userCredentials.user;
            console.log('Registered with: ', newUser.email);

            const newUserData = {
                email: user.email,
                firstname: user.firstName,
                lastname: user.lastName,
            };

            await setDoc(doc(FIREBASE_DB, 'users', newUser.uid), newUserData);
            return true;
        } catch (error: any) {
            console.error(error);
        }
        return false;
    }

    public async loginUser(email: string, password: string): Promise<boolean> {
        try {
            const response = await signInWithEmailAndPassword(
                FIREBASE_AUTH,
                email,
                password,
            );
            console.log(response);
        } catch (error) {
            console.error(error);
        }
        return false;
    }
}

export default FirebaseService;
