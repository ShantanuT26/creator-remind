import {useNavigate} from 'react-router-dom';
import {Button} from '@mui/material';
import { useAuth } from './AuthContext';
import { use } from 'react';

const SignOutButton = () =>
{
    const navigate = useNavigate();
    const {user, LogOutFunct} = useAuth();
    return(
        <Button onClick={()=>
        {
            console.log({LogOutFunct});
            LogOutFunct(navigate, "/login");
        }}>
            
            Sign Out
        </Button>
    )
}
export default SignOutButton;