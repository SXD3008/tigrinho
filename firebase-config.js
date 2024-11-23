// Importa as funções necessárias do Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC-5N3HkmWCZDfpbTSSe6JwBjLiUjLllEw",
  authDomain: "data-do-tigrin.firebaseapp.com",
  projectId: "data-do-tigrin",
  storageBucket: "data-do-tigrin.appspot.com", // Corrigido
  messagingSenderId: "235335110818",
  appId: "1:235335110818:web:1cac4bd7c33da830bb07fb",
  measurementId: "G-ZDF5RMP2F2",
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Firestore
const db = getFirestore(app);

export { db };
