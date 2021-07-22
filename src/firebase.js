import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyDT0JELdsDsqCnPSwjEl563tTD8pzmzf84",
  authDomain: "project-find-them.firebaseapp.com",
  projectId: "project-find-them",
  storageBucket: "project-find-them.appspot.com",
  messagingSenderId: "269193392291",
  appId: "1:269193392291:web:294fdc2092d95da8b5cf16",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
