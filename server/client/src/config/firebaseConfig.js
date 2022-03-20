import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";
import {initializeAuth, indexedDBLocalPersistence} from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyCtoqhN9BTZZQHZyQP5Z4BB0iu4zYZX3Mg",
	authDomain: "contact-webapp-mern.firebaseapp.com",
	projectId: "contact-webapp-mern",
	storageBucket: "contact-webapp-mern.appspot.com",
	messagingSenderId: "308525586536",
	appId: "1:308525586536:web:ec1328c859da8356c003dd",
	measurementId: "G-CCGG4B2VFV",
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const auth = initializeAuth(firebaseApp, {
	persistence: indexedDBLocalPersistence,
	// No popupRedirectResolver defined
});

export {firebaseApp, storage, auth};
