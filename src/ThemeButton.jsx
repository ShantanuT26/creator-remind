import { useContext } from 'react';
import { ThemeCntxt } from './ThemeContext';
import {Button} from '@mui/material';
import { dark } from '@mui/material/styles/createPalette';
const ThemeButton = ()=>
{
    const {lightMode, darkMode, darkTheme, setDarkTheme} = useContext(ThemeCntxt);
    function toggleTheme()
    {
        setDarkTheme(!darkTheme);
    }
    return(
        <Button onClick={toggleTheme}>CHANGE THEME</Button>
    )
}

export default ThemeButton;