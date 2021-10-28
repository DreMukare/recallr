import firebase from 'firebase/app';
import env from 'react-dotenv';
import 'firebase/auth';
import 'firebase/firestore';

const app = firebase.initializeApp({
	apiKey: env.REACT_APP_FIREBASE_API_KEY,
	authDomain: env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: env.REACT_APP_FIREBASE_APP_ID,
});

const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

export { projectFirestore, projectAuth };
export default app;
