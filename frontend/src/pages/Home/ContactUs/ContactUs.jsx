import React, { useState } from "react";
import { Box, Container, Typography, TextField, Button } from "@mui/material";
import axios from 'axios';

function ContactUsSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/send-email', formData);
            alert(response.data.success);
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error(error);
            alert('Failed to send message. Please try again later.');
        }
    };

    return (
        <Box sx={{ py: 8, backgroundColor: '#111827', color: 'white' }}>
            <Container>
                <Typography variant="h4" gutterBottom textAlign="center" sx={{ fontWeight: 'bold', color: '#64CCC5' }}>
                    Contact Us
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        mt: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: '#1c1c1c',
                        padding: 4,
                        borderRadius: 2,
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                    }}
                >
                    <TextField
                        required
                        fullWidth
                        label="Name"
                        name="name"
                        margin="normal"
                        variant="outlined"
                        value={formData.name}
                        onChange={handleChange}
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
                                    borderColor: '#64CCC5',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#64CCC5',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#64CCC5',
                                },
                            },
                        }}
                    />
                    <TextField
                        required
                        fullWidth
                        label="Email"
                        name="email"
                        margin="normal"
                        variant="outlined"
                        value={formData.email}
                        onChange={handleChange}
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
                                    borderColor: '#64CCC5',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#64CCC5',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#64CCC5',
                                },
                            },
                        }}
                    />
                    <TextField
                        required
                        fullWidth
                        label="Message"
                        name="message"
                        margin="normal"
                        variant="outlined"
                        multiline
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
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
                                    borderColor: '#64CCC5',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#64CCC5',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#64CCC5',
                                },
                            },
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            mt: 2,
                            backgroundColor: '#64CCC5',
                            '&:hover': { backgroundColor: '#52A9A5' },
                            padding: '10px 20px',
                            fontSize: '16px',
                            fontWeight: '600',
                            borderRadius: '50px',
                            transition: 'all 0.3s ease',
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
