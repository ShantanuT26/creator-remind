import logo from './logo.svg';
import {Button, TextField,Box,Grid2, RadioGroup, Radio, FormControlLabel, AppBar, createTheme, ThemeProvider, CssBaseline} from '@mui/material';
import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import BackButton from './BackButton';
import React, { useContext, useState, useEffect } from 'react';
import './App.css';
import ThemeButton from './ThemeButton';
import { TaskCntxt } from './TaskContext';
import { ThemeCntxt } from './ThemeContext';
import { dark } from '@mui/material/styles/createPalette';
import { grey } from '@mui/material/colors';

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

        addTask(newTask);
        console.log("newtask: ",  newTask);
      }
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
      return(
        <ThemeProvider theme = {overallTheme}>
          <CssBaseline/> 
        <div>
          {taskList.map((task, index)=>
          (
            <li key = {index}>
              <Button sx = {{backgroundColor: 'blue'}}>
                <h4>{task.tType}</h4>
                <br/>
                <h4>{task.tName}</h4>
              </Button>
            </li>
          ))
          }
        </div>
        </ThemeProvider>
      )
    }
  
  return (
    <>
    <Router>
      <Routes>
        <Route path = "/" element = {<HomePage />}></Route>
        <Route path = "/fillValues" element = {<FillTaskValues />}></Route>
        <Route path = "/myTasks" element = {<ViewMyTasks />}></Route>
      </Routes>
    </Router>
    </>
  );
}

