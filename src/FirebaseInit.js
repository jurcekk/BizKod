import { initializeApp } from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAZCUZoolC8fPxO2kSIyv72ET2RzSTUhj8',
  authDomain: 'bizkod-7c176.firebaseapp.com',
  projectId: 'bizkod-7c176',
  storageBucket: 'bizkod-7c176.appspot.com',
  messagingSenderId: '597718546859',
  appId: '1:597718546859:web:3ec8d79f5c0aae5bdafaee',
  databaseURL:
    'https://bizkod-7c176-default-rtdb.europe-west1.firebasedatabase.app',
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getDatabase(FIREBASE_APP);
