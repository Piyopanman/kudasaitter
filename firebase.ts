import { FirebaseConfigType } from "./types/firebaseConfig";

export const firebaseConfig: FirebaseConfigType = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY as string,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN as string,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL as string,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET as string,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID as string,
  appId: process.env.NEXT_PUBLIC_APP_ID as string,
};
