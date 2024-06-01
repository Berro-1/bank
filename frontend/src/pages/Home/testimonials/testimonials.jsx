import React from "react";
import { Box, Container, Typography, Grid, Card, CardContent } from "@mui/material";

function TestimonialsSection() {
    return (
        <Box sx={{ py: 8, backgroundColor: '#121212', color: 'white' }}>
            <Container>
                <Typography variant="h4" gutterBottom textAlign="center">
                    What Our Customers Say
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ backgroundColor: '#1c1c1c', color: 'white' }}>
                            <CardContent>
                                <Typography variant="h6">
                                    "Excellent service and friendly staff!"
                                </Typography>
                                <Typography variant="body2" color="white">
                                    - John Doe
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ backgroundColor: '#1c1c1c', color: 'white' }}>
                            <CardContent>
                                <Typography variant="h6">
                                    "They helped me get a loan quickly and easily."
                                </Typography>
                                <Typography variant="body2" color="white">
                                    - Jane Smith
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ backgroundColor: '#1c1c1c', color: 'white' }}>
                            <CardContent>
                                <Typography variant="h6">
                                    "Great banking experience overall."
                                </Typography>
                                <Typography variant="body2" color="white">
                                    - Mark Johnson
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default TestimonialsSection;
