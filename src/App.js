import logo from './logo.svg';
import {Button, TextField,Box,Grid2, RadioGroup, Radio, FormControlLabel, FormControl, AppBar, createTheme, ThemeProvider, CssBaseline, FormLabel} from '@mui/material';
import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import BackButton from './BackButton';
import React, { useContext, useState, useEffect,useRef } from 'react';
import './App.css';
import ThemeButton from './ThemeButton';
import { TaskCntxt } from './TaskContext';
import { ThemeCntxt } from './ThemeContext';
import { dark } from '@mui/material/styles/createPalette';
import { grey } from '@mui/material/colors';
import {db, userColRef, auth} from './firebaseConfig';
import { addDoc, query, getDocs, setDoc, doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';
import validator from "validator";

export const ThemeContext = React.createContext();


export default function App() 
{
  const [signUpPassword, setSignUpPassword] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const HomePage = () =>
  {
    

    //const [darkTheme, setDarkTheme] = useState(true);
    

    
    // function toggleTheme()
    // {
    //     setDarkTheme(!darkTheme);
    // }
    const navigate = useNavigate();
    const handleClick = () =>
    {
      navigate('/fillValues');
    }
    const goToMyTasks = () =>
    {
      navigate('/myTasks');
    }
    const {lightMode, darkMode, darkTheme, setDarkTheme} = useContext(ThemeCntxt);
    const overallTheme = darkTheme ? darkMode : lightMode;
    return( 
      <ThemeProvider theme = {overallTheme}>
      <CssBaseline/> 
        
          <Grid2 container rowSpacing={200}>
            <Button onClick = {handleClick}>Add A Task</Button>
            <Button onClick = {goToMyTasks}>My Tasks</Button>
            {/* <Button onClick = {toggleTheme}>Toggle Theme</Button> */}
            <ThemeButton />
          </Grid2>
      </ThemeProvider>
    )
  }
  const FillTaskValues = () =>
    {
      const navigate = useNavigate();
      const {taskList, addTask} = useContext(TaskCntxt);
      const[taskName, setTaskName]  = useState("");
      const [taskType, setTaskType] = useState("");
      let userDocRef;
      useEffect(()=>
      {
        const unsubscribe = auth.onAuthStateChanged((user)=>
        {
          userDocRef = doc(db, "users", user.uid);
        })

        return()=>
        {
          unsubscribe();
        }
       
      })
      const handleSubmit = (event) =>
      {
        event.preventDefault();
        
        console.log("TaskTypeSubmit: " + taskType);
        console.log("TaskNameSubmit: " + taskName);
        
        const newTask = 
        {
          tType: taskType,
          tName: taskName
        };

          /*taskType and taskName saved every time the user changes it, here they 
          have just hit submit, and the values are set in stone. We add those values
          into a new document in the colRef (which is just the books collection) and give it
          2 fields; title and author*/

        // addDoc(colRef, {
        //   title: taskType,
        //   author: taskName,
        // })
        //addTask(newTask);
        updateDoc(userDocRef, { tasks: arrayUnion(newTask)});
        console.log("newtask: ",  newTask);
        navigate('/home');
      };

      useEffect(()=>
      {
        console.log("tasklist: ", taskList);
      }, [taskList]);

      const handleRadioGroupChange = (event) =>
      {
        setTaskType(event.target.value);

        console.log("Task Type: " + taskType);
      }
      const handleTaskNameChange = (event) =>
      {
        setTaskName(event.target.value);

        console.log("Task Name: " + taskName);
      }
      const {lightMode, darkMode, darkTheme, setDarkTheme} = useContext(ThemeCntxt);
      const overallTheme = darkTheme ? darkMode : lightMode;
      return(
        <ThemeProvider theme = {overallTheme}>
          <CssBaseline/> 
        <Box component = "nav"
        display = "flex"
        sx = {{width: '100%', position: 'fixed', top: 0, left: 0}}>
          <BackButton/>
        </Box>
        <Grid2 container 
        justifyContent="center" 
        alignItems="center" 
        style = {{minHeight: '100vh'}}
        direction = "column">
          <form onSubmit={handleSubmit}>
          <TextField label = "Name Your Task" onChange={handleTaskNameChange}/>
          <RadioGroup row onChange = {handleRadioGroupChange}>
            <FormControlLabel value = "Art Post" control={<Radio />} label = "Art Post" />
            <FormControlLabel value = "Fashion Post" control={<Radio />} label = "Fashion Post" />
            <FormControlLabel value = "Video Post" control={<Radio />} label = "Video Post" />
          </RadioGroup>
          <button type = "submit" >Submit</button>
          </form>
        </Grid2>
        </ThemeProvider>
      )
    }
    const ViewMyTasks = ()=>
    {
      //UNCOMMENT const {taskList, addTask} = useContext(TaskCntxt);
      //UNCOMMENT console.log("VIEWTASKS TASKLIST: ", taskList); 
      const {lightMode, darkMode, darkTheme, setDarkTheme} = useContext(ThemeCntxt);
      const overallTheme = darkTheme ? darkMode : lightMode; 
      const [taskBubbles, setTaskBubbles] = useState([]);
      let currUserDoc;
      let tempData;
      // const [books, setBooks] = useState([]);

      /* below this comment I am setting an array called books, to contain
      a bunch of task objects. I am doing this in a useeffect since getDocs is asynchronous,
      so when I try to print the array, it is empty. This auto updates*/
      // useEffect(()=>{
      //   getDocs(colRef).then(
      //     (snapshot)=>{
      //       const tempBooks = []
      //       snapshot.docs.forEach((doc)=>
      //       {
      //         tempBooks.push({...doc.data()})
      //         setBooks(tempBooks);
      //       })
      //     }
      //   )
      // })
      
      useEffect(()=>
      {
        const checkDocSnap = async(currUserDoc) =>
        {
          const docSnap = await getDoc(currUserDoc);
          if(docSnap.exists)
          {
            console.log("user doc exists");
            //setTaskBubbles(docSnap.tasks);
            tempData = docSnap.data();
            setTaskBubbles(tempData.tasks || []);
          }
          else{
            console.log("user doc DNE");
          }
        }
        const unsubscribe = auth.onAuthStateChanged((user)=>
        {
          if(user)  
          {
            console.log("Current User ID: ", user.uid);
            currUserDoc = doc(db, "users", user.uid);
            checkDocSnap(currUserDoc);
          }
          else{
            console.log("No user is signed in");
          }
        })

        return() =>
        {
          unsubscribe();
        };
      }, [])
     
      
      
      return(
        <ThemeProvider theme = {overallTheme}>
          <CssBaseline/> 
        <div>
        
        {taskBubbles.length>0 ? (
        taskBubbles.map((task, index)=>
        (
          <li key = {index}>
              <Button sx = {{backgroundColor: 'blue'}}>
                <h4>{task.tType}</h4>
                <br/>
                <h4>{task.tName}</h4>
              </Button>
            </li>
        ))) : (
          <p>No tasks availabke</p>
        )
        }
          
        </div>
        </ThemeProvider>
      )
    }
     
    const SignUpPage = () =>
    {
      const navigate = useNavigate();
      const emailRef = useRef("");
      const passwordRef = useRef("");
      const goToHome = () =>
      {
        navigate('/home');
      }
      const logIn = () =>
      {
        navigate('/login');
      }
      const registerUser = (event) =>
      {
        event.preventDefault();
        createUserWithEmailAndPassword(auth, emailRef.current, passwordRef.current).then
        (
          (cred)=>
          {
            console.log(cred.user);
          }
        ) .catch((error)=>
          {
            console.log(error.message);
          }
        );
      }
      return(
        <div>
        <Grid2 container direction="column">

        <Grid2>
        {/* <Button onClick = {goToHome}>Home</Button> */}
        <Button onClick = {logIn}>Already Have An Account? Log In</Button>
        </Grid2>

        <Grid2 margin = "auto" marginTop = {20} >
        <form onSubmit={registerUser}>
          <label> Email </label>
          <input type='email' 
          defaultValue = {signUpEmail} 
          onChange = {(event)=> emailRef.current = event.target.value} 
          style={{marginBottom: '16px'}}></input>

          <label> Password </label>
          <input type='password' defaultValue = {signUpPassword} onChange = {(event)=> passwordRef.current = event.target.value}
           style={{marginBottom: '16px'}}></input>
          <Button onClick = {registerUser}>Register</Button>
        </form>
        </Grid2>
        </Grid2>
        </div>
      )
    }
  
    const LoginPage = () =>
    {
      const emailRef = useRef("");
      const passwordRef = useRef("");
      const navigate = useNavigate();

      const logUserIn = (event) =>
      {
        event.preventDefault();
        console.log("loginemail: " + emailRef.current)
        console.log("loginpassword: " + passwordRef.current)
        signInWithEmailAndPassword(auth, emailRef.current, passwordRef.current).then(()=> 
        {
          const userDocRef = doc(db, "users", auth.currentUser.uid);
          setDoc(userDocRef, { name: "John Doe", email: auth.currentUser.email});
          navigate('/home')
        }
        ).catch(
          (err)=>{
            console.log(err.message);
          }
        )
      }

      useEffect(()=>
      {
        if(auth.currentUser)
        {
          console.log("Current User ID: ", auth.currentUser.uid);
        }
        else{
          console.log("No user is signed in");
        }
      })
      return(
        <div>
          <Grid2 container direction="column">
          <Grid2 margin = "auto" marginTop = {20} >
          <form onSubmit = {logUserIn}>
            <label > Email </label>
            <input type='email' defaultValue = {loginEmail} 
            onChange={(event)=>
            {
                emailRef.current = event.target.value;
            } 
            } 
            style={{marginBottom: '16px'}}/>
            <label> Password </label>
            <input type='password' defaultValue = {loginPassword} 
            onChange = {(event)=> passwordRef.current = event.target.value} 
            style={{marginBottom: '16px'}}></input>
            <button type = "submit">Log In</button>
          </form>
          </Grid2>
          </Grid2>
        </div>
      )
    }
  return (
    <>
    <Router>
      <Routes>
        <Route path = "/home" element = {<HomePage />}></Route>
        <Route path = "/fillValues" element = {<FillTaskValues />}></Route>
        <Route path = "/myTasks" element = {<ViewMyTasks />}></Route>
        <Route path = "/" element = {<SignUpPage/>}></Route>
        <Route path = "/login" element = {<LoginPage/>}></Route>
      </Routes>
    </Router>
    </>
  );
}

