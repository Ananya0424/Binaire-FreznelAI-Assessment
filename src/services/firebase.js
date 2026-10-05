import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBUMG3s53h7m3beR6lZdLuk80NsUjUOJgA",
  authDomain: "freznel-movies.firebaseapp.com",
  projectId: "freznel-movies",
  storageBucket: "freznel-movies.firebasestorage.app",
  messagingSenderId: "564698022576",
  appId: "1:564698022576:web:dd7736dee780b77c047175"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
