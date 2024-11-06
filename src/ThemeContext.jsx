import React, {useContext, useState} from 'react';
import {Button, TextField,Box,Grid2, RadioGroup, Radio, FormControlLabel, AppBar, createTheme, ThemeProvider, CssBaseline} from '@mui/material';

export const ThemeCntxt = React.createContext();

const ThemeContext = ({children} ) =>
{
    const darkMode = createTheme(
        {
          palette:{
            mode: 'dark',
            background:{
              default: '#121212',
              paper: '#1D1D1D'
            },
            text:{
              primary: '#ffffff'
            },
    
          },
        }
      );
    
      const lightMode = createTheme(
        {
          palette:{
            mode: 'light',
            background:{
              default: '#ffffff',
              paper: '#f5f5f5'
            },
            text:{
              primary: '#cccd5f'
            },
          },
        }
      );

      const [darkTheme, setDarkTheme] = useState(true);

      return(
        <ThemeCntxt.Provider value= {{lightMode, darkMode, darkTheme, setDarkTheme}}>
            {children}
        </ThemeCntxt.Provider>
      )
}

export default ThemeContext;
