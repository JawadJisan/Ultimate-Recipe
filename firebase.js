import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBv7nmafuBQjvri1ogxPcDxS71TwdB2Rxw",
  authDomain: "ultimate-recipe-84d60.firebaseapp.com",
  projectId: "ultimate-recipe-84d60",
  storageBucket: "ultimate-recipe-84d60.appspot.com",
  messagingSenderId: "1027515055312",
  appId: "1:1027515055312:web:5141b8ef201d63be6532d5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = () => signInWithPopup(auth, provider);
const logout = () => signOut(auth);

// export { auth, signInWithGoogle, logout, onAuthStateChanged };
export { auth, provider, signInWithPopup };
