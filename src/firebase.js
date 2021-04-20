import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyAxZdDdrbEUU8L__ozXk1HErpSY71z3t0w",
  authDomain: "letsshop-a1431.firebaseapp.com",
  projectId: "letsshop-a1431",
  storageBucket: "letsshop-a1431.appspot.com",
  messagingSenderId: "472193570537",
  appId: "1:472193570537:web:8325fb7a09adb67fedc278",
  measurementId: "G-4RFV02RYQK",
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };
