import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCo-KsY6HfeG58s0d-DMbZ0r2VPYn8eRrI",
  authDomain: "cooking-ninja-site-e844f.firebaseapp.com",
  projectId: "cooking-ninja-site-e844f",
  storageBucket: "cooking-ninja-site-e844f.appspot.com",
  messagingSenderId: "820025592420",
  appId: "1:820025592420:web:767d6d8f8cece15ce02d71",
}

firebase.initializeApp(firebaseConfig)

const projectFirestore = firebase.firestore()

export { projectFirestore }
