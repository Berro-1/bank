import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function HeroSection() {
    const navigate = useNavigate();
    return (
        <Box sx={{
            backgroundColor: '#111827',
            color: 'white',
            py: 12,
            minHeight: '90vh',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }}>
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#64CCC5' }}>
                        Welcome to SafeStream
                    </Typography>
                    <Typography variant="h6" paragraph sx={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto', opacity: 0.8 }}>
                        Explore our diverse range of financial solutions designed to help you achieve your financial goals.
                    </Typography>
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
                        <Button variant="contained" sx={{
                            backgroundColor: '#64CCC5',
                            '&:hover': { backgroundColor: '#52A9A5' },
                            padding: '10px 20px',
                            fontSize: '16px',
                            fontWeight: '600',
                            borderRadius: '50px',
                            transition: 'all 0.3s ease'
                        }}>
                            Get Started
                        </Button>
                        <Button variant="outlined" 
                        onClick={()=> navigate('/Services')}
                        sx={{
                            borderColor: '#64CCC5',
                            color: '#64CCC5',
                            '&:hover': {
                                borderColor: '#52A9A5',
                                color: '#52A9A5'
                            },
                            padding: '10px 20px',
                            fontSize: '16px',
                            fontWeight: '600',
                            borderRadius: '50px',
                            transition: 'all 0.3s ease'
                        }}>
                            Learn More
                        </Button>
                    </Box>
                </motion.div>
            </Container>
        </Box>
    );
}

export default HeroSection;
