import React, { useState } from 'react'
import { Box, Button, Container, Snackbar, Stack, TextField } from '@mui/material';
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState(localStorage.getItem("username") || "")
    const [open, setOpen] = useState(false)
    const login = () => {
        if (username.length < 3) {
            setOpen(true)
        }
        else {
            localStorage.setItem("username", username)
            navigate("/chat")
        }
    }
    return (
        <Box maxWidth="sm">
            <TextField value={username} onChange={(e) => setUsername(e.target.value)} ></TextField>
            <br />
            <Stack spacing={2} direction="row" style={{ marginTop: 10 }}>
                <Button onClick={() => setUsername("")} variant='outlined' >Clear</Button>
                <Button onClick={login} variant='contained' >Login</Button>
            </Stack>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}
                message="Username should be atleast 3 characters."
            />
        </Box>
    );
}

export default LoginComponent;