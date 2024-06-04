import React, { useState } from "react";
import { Box, Container, Typography, TextField, Button, Grid, Paper, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { LocationOn, Phone, Email, AccessTime } from "@mui/icons-material";
import axios from 'axios';
import SimpleMap from './customMap'; // Adjust the import path as necessary

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
            const response = await axios.post('http://localhost:5000/send-email', formData);
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

                <Grid container spacing={4} sx={{ mt: 4 }}>
                    {/* Contact Details */}
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 3, backgroundColor: '#1c1c1c', color: '#fff', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)' }}>
                            <Typography variant="h6" gutterBottom sx={{ color: '#64CCC5' }}>
                                Contact Details
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <LocationOn sx={{ color: '#64CCC5' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="1234 Bank St, City, Country" />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Phone sx={{ color: '#64CCC5' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="+123 456 7890" />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Email sx={{ color: '#64CCC5' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="info@mybank.com" />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <AccessTime sx={{ color: '#64CCC5' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Mon - Fri: 9 AM - 6 PM" />
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>

                    {/* Contact Form */}
                    <Grid item xs={12} md={8}>
                        <Paper sx={{ p: 3, backgroundColor: '#1c1c1c', color: '#fff', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)' }}>
                            <Typography variant="h6" gutterBottom sx={{ color: '#64CCC5' }}>
                                Send Us a Message
                            </Typography>
                            <Box
                                component="form"
                                onSubmit={handleSubmit}
                                sx={{
                                    mt: 3,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
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
                        </Paper>
                    </Grid>
                </Grid>

                {/* Map */}
                <Box sx={{ mt: 8 }}>
                    <SimpleMap />
                </Box>
            </Container>
        </Box>
    );
}

export default ContactUsSection;
