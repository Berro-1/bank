import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";

function HeroSection() {
    return (
        <Box sx={{ backgroundColor: '#121212', color: 'white', py: 12, minHeight: '87vh', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Container>
                <Typography variant="h3" gutterBottom>
                    Welcome to My Bank
                </Typography>
                <Typography variant="h6" paragraph>
                    Your trusted partner in financial services.
                </Typography>
                <Button variant="contained" sx={{ backgroundColor: '#bb86fc' }}>Get Started</Button>
            </Container>
        </Box>
    );
}

export default HeroSection;
