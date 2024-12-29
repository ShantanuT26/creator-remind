import {initializeApp} from 'firebase/app';
import {collection, getDocs, getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyC8fUX9Eud4wiryzL4e6W2jdDRREljdqHQ",
    authDomain: "creator-remind-new.firebaseapp.com",
    projectId: "creator-remind-new",
    storageBucket: "creator-remind-new.firebasestorage.app",
    messagingSenderId: "373350147006",
    appId: "1:373350147006:web:625d78b3b6b7ec351d0fef",
    measurementId: "G-83NN4KCX3T"
  };

initializeApp(firebaseConfig);

const db = getFirestore();

const auth = getAuth();

const userColRef = collection(db, "users");

// getDocs(colRef).then(
//   (snapshot)=>{
//     const books = [];
//     snapshot.docs.forEach((doc)=>
//     {
//       books.push({...doc.data()})
//     })
//     console.log(books); 
//   }
// )

export {db, userColRef, auth};