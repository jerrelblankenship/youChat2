/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as logger from "firebase-functions/logger";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

// Cloud Function:
// Triggered when a new user is created in Firebase Authentication
export const createChatChannels = functions.auth.user()
  .onCreate(async (user) => {
    const usersRef = admin.firestore().collection("users");

    // UID of the newly created user
    const newUserId = user.uid;

    try {
    // Fetch all existing users from Firestore
      const existingUsersSnapshot = await usersRef.get();

      const channelPromises: Promise<any>[] = [];

      existingUsersSnapshot.forEach((doc) => {
        // Check if the existing user's ID is different from the new user's ID
        if (doc.id !== newUserId) {
        // Create a new document in the 'channels' collection
          const channelPromise = admin.firestore().collection("channels").add({
            participants: [doc.id, newUserId],
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            lastMessage: {
              messageText: "No Messages Yet",
              createdAt: admin.firestore.FieldValue.serverTimestamp(),
            },
          });
          channelPromises.push(channelPromise);
        }
      });

      // Wait for all channel creation operations to complete
      await Promise.all(channelPromises);
    } catch (error) {
      logger.error("Error creating chat channels:", error);
    // Handle any errors here
    }
  });
