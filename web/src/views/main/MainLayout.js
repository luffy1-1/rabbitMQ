import React from 'react';
import { AppBar, Box, Container, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                enableColorOnDark
                position="fixed"
                color="inherit"
                elevation={2}
                sx={{
                    bgcolor: 'black',
                    transition: 'none',
                    height: 50
                }}
            >
                <Typography sx={{ color: 'white', margin: 'auto', fontWeight: 'bold' }}>Messages</Typography>
            </AppBar>
            <Container sx={{marginTop: 10}}>
            <Outlet/>
            </Container>
        </Box>
    );
}

export default MainLayout;