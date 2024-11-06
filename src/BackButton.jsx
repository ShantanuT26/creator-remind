import {useNavigate} from 'react-router-dom';
import {Button} from '@mui/material';
const BackButton = () =>
{
    const Navigate = useNavigate();
    const GoBack = () =>
    {
        Navigate(-1);
    }
    return(
        <Button onClick = {GoBack}>Go Back</Button>
    )
}
export default BackButton;