import { ChatUser } from '@/app/types/ChatUser';
import { FIREBASE_AUTH } from './FirebaseConfig';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';

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
