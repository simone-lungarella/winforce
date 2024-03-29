import { Visibility, VisibilityOff } from '@mui/icons-material';
import LoginIcon from '@mui/icons-material/Login';
import {
    Box,
    Button, Grid, IconButton, TextField, Typography
} from "@mui/material";
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { default as React, useState } from 'react';
import eventService from "./services/appService";

const formStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    p: 3,
};

const LoginForm = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [invalidCredentials, setInvalidCredentials] = useState(false);

    const handleSubmit = () => {

        eventService.login(username, password).then(response => {

            const token = response?.data?.jwtToken;

            if (token != null) {
                setInvalidCredentials(false);
                props.setAuthenticated(true, response.data);
                eventService.setToken(token);
            } else {
                setInvalidCredentials(true);
                props.setAuthenticated(false, null);
                eventService.setToken(null);
            }
        }).catch(() => {
            setInvalidCredentials(true);
        });
    }

    return (
        <Box sx={formStyle} >
            <Grid container direction="column" justifyContent="center" alignItems="center" rowGap={2} >
                {invalidCredentials &&
                    <Typography color="error" variant="overline">Credenziali non corrette</Typography>
                }
                <TextField style={{ width: 250, height: 50 }}
                    required
                    error={invalidCredentials}
                    name="username"
                    label="Nome utente"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <FormControl variant="outlined" style={{ width: 250, height: 50 }}>
                    <InputLabel error={invalidCredentials} >Password *</InputLabel>
                    <OutlinedInput
                        required
                        error={invalidCredentials}
                        label="Password"
                        name="password"
                        type={isPasswordVisible ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                    edge="end"
                                >
                                    {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <Button
                    disabled={username === "" || password === ""}
                    variant="contained"
                    endIcon={<LoginIcon />}
                    onClick={handleSubmit}
                >
                    LOGIN
                </Button>
            </Grid>
        </Box >
    );
}

export default LoginForm;
