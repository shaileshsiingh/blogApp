import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBfLmb22jB_vs7p6YsU4HJXnGiDP7Ftw9o",
  authDomain: "newblog-20727.firebaseapp.com",
  projectId: "newblog-20727",
  storageBucket: "newblog-20727.appspot.com",
  messagingSenderId: "598402605806",
  appId: "1:598402605806:web:8f02700afcf94ee1f949ff"
};


if(!firebase.apps.length) firebase.initializeApp(firebaseConfig)


const auth  = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp

export {auth,db,storage,serverTimestamp}


