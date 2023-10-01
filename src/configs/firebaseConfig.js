import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAqTYo9uZKBeaXgz9cRqn1Ov_KGvyrwKCI",
    authDomain: "pulsar-cloud-services.firebaseapp.com",
    projectId: "pulsar-cloud-services",
    storageBucket: "pulsar-cloud-services.appspot.com",
    messagingSenderId: "391284565114",
    appId: "1:391284565114:web:f584bc2aa153e4f7f847c3",
    measurementId: "G-DCECZRZ1J4",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

