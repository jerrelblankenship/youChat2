import { Timestamp } from "firebase/firestore"

export interface ChatChannel {
    id: string,
    participants: string[],
    createdAt: Timestamp,
    lastMessage?: {
        text: string,
        createdAt: Timestamp
    }
}

