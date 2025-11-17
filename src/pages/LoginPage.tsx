import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function LoginPage() {
    return (
        <Box sx={{
            paddingLeft: '20vw',
            paddingRight: '20vw',
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            justifyContent: 'center',
        }}>
            <Typography variant="h4" gutterBottom>Hello There 👋</Typography>
            <TextField id="outlined-basic" label="Email" variant="outlined" margin="normal"/>
            <TextField id="outlined-basic" label="Password" variant="outlined" margin="normal"/>
            <Button variant="contained" sx={{marginTop: '0.5rem', height: '3rem'}}>Login</Button>

        </Box>
    );
}