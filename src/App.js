import logo from './logo.svg';
import {Button, TextField,Box,Grid2, RadioGroup, Radio, FormControlLabel, AppBar, createTheme, ThemeProvider, CssBaseline, FormLabel} from '@mui/material';
import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import BackButton from './BackButton';
import React, { useContext, useState, useEffect } from 'react';
import './App.css';
import ThemeButton from './ThemeButton';
import { TaskCntxt } from './TaskContext';
import { ThemeCntxt } from './ThemeContext';
import { dark } from '@mui/material/styles/createPalette';
import { grey } from '@mui/material/colors';
import {db, colRef, auth} from './firebaseConfig';
import { addDoc, query, getDocs } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export const ThemeContext = React.createContext();


export default function App() 
{
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
      const handleSubmit = (event) =>
      {
        event.preventDefault();
        
        console.log("TaskTypeSubmit: " + taskType);
        console.log("TaskNameSubmit: " + taskName);
        
        const newTask = {
          tType: taskType,
          tName: taskName
        };

          /*taskType and taskName saved every time the user changes it, here they 
          have just hit submit, and the values are set in stone. We add those values
          into a new document in the colRef (which is just the books collection) and give it
          2 fields; title and author*/
        addDoc(colRef, {
          title: taskType,
          author: taskName,
        })

        addTask(newTask);
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
      const {taskList, addTask} = useContext(TaskCntxt);
      console.log("VIEWTASKS TASKLIST: ", taskList); 
      const {lightMode, darkMode, darkTheme, setDarkTheme} = useContext(ThemeCntxt);
      const overallTheme = darkTheme ? darkMode : lightMode; 
      const [books, setBooks] = useState([]);

      /* below this comment I am setting an array called books, to contain
      a bunch of task objects. I am doing this in a useeffect since getDocs is asynchronous,
      so when I try to print the array, it is empty. This auto updates*/
      useEffect(()=>{
        getDocs(colRef).then(
          (snapshot)=>{
            const tempBooks = []
            snapshot.docs.forEach((doc)=>
            {
              tempBooks.push({...doc.data()})
              setBooks(tempBooks);
            })
          }
        )
      })
      
      console.log("BOOKS: ", books);
      return(
        <ThemeProvider theme = {overallTheme}>
          <CssBaseline/> 
        <div>
          
          {books.map((book, index)=>
          (
            <li key = {index}>
              <Button sx = {{backgroundColor: 'blue'}}>
                <h4>{book.title}</h4>
                <br/>
                <h4>{book.author}</h4>
              </Button>
            </li>
          ))
          }
        </div>
        </ThemeProvider>
      )
    }
     
    const SignUpPage = () =>
    {
      const navigate = useNavigate();
      const [password, setPassword] = useState("");
      const [email, setEmail] = useState("");
      const goToHome = () =>
      {
        navigate('/home');
      }
      const registerUser = () =>
      {
        createUserWithEmailAndPassword(auth, email, password);
      }
      const handleEmailChange = (event) =>
      {
        setEmail(event.target.value);
      }
      const handlePasswordChange = (event) =>
      {
        setPassword(event.target.value);
      }
      return(
        <div>
        <Button onClick = {goToHome}>Home</Button>
        <form onSubmit = {registerUser}>
          <FormLabel label = "email" onChange={handleEmailChange}/>
          <input type='email'></input>
          <FormLabel label = "password" onChange = {handlePasswordChange}/>
          <input type='password'></input>
          <button type='submit'></button>
        </form>
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
      </Routes>
    </Router>
    </>
  );
}

