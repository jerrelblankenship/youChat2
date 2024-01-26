import { ChatUser } from '@/app/types/ChatUser';
import { FIREBASE_AUTH } from './FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

class FirebaseService {
    public async createUserAccount(user: ChatUser, password: string): Promise<boolean> {
        try {
            console.log(user)
            console.log(password)
            console.log(FIREBASE_AUTH)



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
}

export default FirebaseService;
