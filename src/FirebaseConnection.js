import firebase from "firebase/app";
import 'firebase/database';

const firebaseConfig = {

  apiKey: "AIzaSyAiFQ3O0E1KJW40dg6jE8hf5CJizgd7Xrk",

  authDomain: "micro-93813.firebaseapp.com",

  databaseURL: "https://micro-93813-default-rtdb.firebaseio.com",

  projectId: "micro-93813",

  storageBucket: "micro-93813.appspot.com",

  messagingSenderId: "528271025953",

  appId: "1:528271025953:web:c2bbd4b202f52fd6020060",

  measurementId: "G-RFN3M5GMHH"

};

  

if(!firebase.apps.length){
  
  firebase.initializeApp(firebaseConfig);
  
}

export default firebase;
  