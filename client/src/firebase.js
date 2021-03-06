import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyDaLN_lnEClBaCWrSMk-s2U07Y7LypPw6g",
  authDomain: "mern-whatsapp-974bd.firebaseapp.com",
  databaseURL: "https://mern-whatsapp-974bd.firebaseio.com",
  projectId: "mern-whatsapp-974bd",
  storageBucket: "mern-whatsapp-974bd.appspot.com",
  messagingSenderId: "50423077165",
  appId: "1:50423077165:web:68f243a567f0e91d5f5ba4"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export {auth, provider}
export default db