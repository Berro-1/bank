import React from "react";
import { Box, Container, Typography, Grid, Avatar } from "@mui/material";

function WhyChooseUsSection() {
    return (
        <Box sx={{ py: 8, backgroundColor: '#1c1c1c', color: 'white' }}>
            <Container>
                <Typography variant="h4" gutterBottom textAlign="center">
                    Why Choose Us
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Avatar sx={{ bgcolor: '#bb86fc', width: 56, height: 56, margin: '0 auto' }}>1</Avatar>
                            <Typography variant="h6" mt={2}>
                                Trusted
                            </Typography>
                            <Typography variant="body2" color="white">
                                We have over 20 years of experience in the banking industry.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Avatar sx={{ bgcolor: '#bb86fc', width: 56, height: 56, margin: '0 auto' }}>2</Avatar>
                            <Typography variant="h6" mt={2}>
                                Secure
                            </Typography>
                            <Typography variant="body2" color="white">
                                Your funds are safe with our advanced security measures.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Avatar sx={{ bgcolor: '#bb86fc', width: 56, height: 56, margin: '0 auto' }}>3</Avatar>
                            <Typography variant="h6" mt={2}>
                                Accessible
                            </Typography>
                            <Typography variant="body2" color="white">
                                Access your accounts anytime, anywhere with our mobile app.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Avatar sx={{ bgcolor: '#bb86fc', width: 56, height: 56, margin: '0 auto' }}>4</Avatar>
                            <Typography variant="h6" mt={2}>
                                Support
                            </Typography>
                            <Typography variant="body2" color="white">
                                Our 24/7 customer support is here to assist you.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default WhyChooseUsSection;
