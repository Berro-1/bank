import React from "react";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";

function Header() {
    return (
        <AppBar position="static" sx={{ bgcolor: '#1c1c1c' }}>
            <Container>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        My Bank
                    </Typography>
                    <Button color="inherit">Home</Button>
                    <Button color="inherit">Services</Button>
                    <Button color="inherit">About</Button>
                    <Button color="inherit">Contact</Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;
