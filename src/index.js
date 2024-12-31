import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import TaskContext from './TaskContext';
import ThemeContext from './ThemeContext';
import AuthContext from './AuthContext';
import {initializeApp} from 'firebase/app';
import {collection, getDocs, getFirestore} from 'firebase/firestore';
import { BrowserRouter as Router } from 'react-router-dom';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <AuthContext>
    <ThemeContext>
    <TaskContext>
      <App />
    </TaskContext>
    </ThemeContext>
    </AuthContext>
  </React.StrictMode>
  
);

// initializeApp(firebaseConfig);

// const db = getFirestore();

// const colRef = collection(db, "Books");

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



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
