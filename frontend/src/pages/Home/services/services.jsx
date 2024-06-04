import React from "react";
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";

function ServicesSection() {
    const services = [
        {
            title: "Savings Account",
            description: "Secure your future with our high-interest savings accounts.",
            image: "savings.jpg"
        },
        {
            title: "Loans",
            description: "Get the financial support you need with our loan services.",
            image: "loan.jpg"
        },
        {
            title: "Credit Cards",
            description: "Explore our range of credit cards with great benefits.",
            image: "credit.jpg"
        }
    ];

    return (
        <Box sx={{ py: 8, backgroundColor: '#121212', color: 'white' }}>
            <Container>
                <Typography variant="h4" gutterBottom textAlign="center" sx={{ fontWeight: 'bold', color: '#64CCC5' }}>
                    Our Services
                </Typography>
                <Grid container spacing={4}>
                    {services.map(service => (
                        <Grid item xs={12} sm={6} md={4} key={service.title}>
                            <Card sx={{ backgroundColor: '#1c1c1c', color: 'white', borderRadius: 2, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)' }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={service.image}
                                    alt={service.title}
                                    sx={{ borderRadius: '2px 2px 0 0', objectFit: 'cover' }}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {service.title}
                                    </Typography>
                                    <Typography variant="body2" color="white">
                                        {service.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}

export default ServicesSection;
