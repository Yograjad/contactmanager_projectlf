const {initializeApp} = require("firebase/app");
const {getStorage} = require("firebase/storage");

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

module.exports = {firebaseApp, storage};
