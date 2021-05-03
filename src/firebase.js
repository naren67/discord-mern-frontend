import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDtxAcYA-ftD6fpabee-o-wl6IK5AUY0JU",
    authDomain: "discord-mern-6114b.firebaseapp.com",
    projectId: "discord-mern-6114b",
    storageBucket: "discord-mern-6114b.appspot.com",
    messagingSenderId: "648723910987",
    appId: "1:648723910987:web:453a7a4bc7bf58e6fed8ce",
    measurementId: "G-KGF5Y25E3L"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db