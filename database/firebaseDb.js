import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBff9Euc7YfYALjX9NJYN2KpkGmeDYJlwE",
  authDomain: "react-native-crud-3e3ff.firebaseapp.com",
  projectId: "react-native-crud-3e3ff",
  storageBucket: "react-native-crud-3e3ff.appspot.com",
  messagingSenderId: "141086682730",
  appId: "1:141086682730:web:bbe3a2212459bcdfa4a413",
  measurementId: "G-Z3MSRNZ86R"
};

if (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}

export { firebase };