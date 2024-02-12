// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkNFQz7cUY_1_2JbcrTo3rbq-dL6Ok8SM",
  authDomain: "crmbritacal.firebaseapp.com",
  projectId: "crmbritacal",
  storageBucket: "crmbritacal.appspot.com",
  messagingSenderId: "125114827719",
  appId: "1:125114827719:web:fe839a139873fd9156cfe2",
  measurementId: "G-XJFGWTXCS4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Auth com persistência de estado
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Verifica se o Analytics é suportado
isSupported().then((supported) => {
  if (supported) {
    // Se o Analytics é suportado, inicializa
    const analytics = getAnalytics(app);
  } else {
    // Se não é suportado, pode-se lidar com a situação aqui
    console.log("Firebase Analytics não é suportado neste ambiente.");
  }
}).catch((error) => {
  console.error("Erro ao verificar o suporte do Firebase Analytics:", error);
});




export { auth };

