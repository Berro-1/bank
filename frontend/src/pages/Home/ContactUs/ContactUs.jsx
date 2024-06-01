import React from "react";
import { Box, Container, Typography, TextField, Button } from "@mui/material";

function ContactUsSection() {
    return (
        <Box sx={{ py: 8, backgroundColor: '#121212', color: 'white' }}>
            <Container>
                <Typography variant="h4" gutterBottom textAlign="center">
                    Contact Us
                </Typography>
                <Box
                    component="form"
                    sx={{
                        mt: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <TextField
                        required
                        fullWidth
                        label="Name"
                        margin="normal"
                        variant="outlined"
                        sx={{
                            backgroundColor: '#1c1c1c',
                            borderRadius: 1,
                            '& .MuiInputBase-root': {
                                color: 'white',
                            },
                            '& .MuiInputLabel-root': {
                                color: 'white',
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'white',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#bb86fc',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#bb86fc',
                                },
                            },
                        }}
                    />
                    <TextField
                        required
                        fullWidth
                        label="Email"
                        margin="normal"
                        variant="outlined"
                        sx={{
                            backgroundColor: '#1c1c1c',
                            borderRadius: 1,
                            '& .MuiInputBase-root': {
                                color: 'white',
                            },
                            '& .MuiInputLabel-root': {
                                color: 'white',
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'white',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#bb86fc',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#bb86fc',
                                },
                            },
                        }}
                    />
                    <TextField
                        required
                        fullWidth
                        label="Message"
                        margin="normal"
                        variant="outlined"
                        multiline
                        rows={4}
                        sx={{
                            backgroundColor: '#1c1c1c',
                            borderRadius: 1,
                            '& .MuiInputBase-root': {
                                color: 'white',
                            },
                            '& .MuiInputLabel-root': {
                                color: 'white',
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'white',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#bb86fc',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#bb86fc',
                                },
                            },
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            mt: 2,
                            backgroundColor: '#bb86fc',
                            '&:hover': { backgroundColor: '#a45ee5' }
                        }}
                    >
                        Send Message
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}

export default ContactUsSection;
