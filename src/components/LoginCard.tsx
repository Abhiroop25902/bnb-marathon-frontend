import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function LoginCard() {
    return (
        <Card sx={{
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <TextField id="outlined-basic" label="Email" variant="outlined" margin="normal"/>
            <TextField id="outlined-basic" label="Password" variant="outlined" margin="normal"/>
            <Button variant="contained" sx={{marginTop: '16px'}}>Login</Button>

        </Card>
    );
}