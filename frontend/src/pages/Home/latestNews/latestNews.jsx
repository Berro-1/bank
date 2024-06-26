import React from "react";
import { Box, Container, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";

const newsArticles = [
    {
        title: "Bank Launches New Savings Plan",
        date: "March 15, 2023",
        image: "savingsplan.jpg",
        description: "Our new savings plan offers competitive interest rates to help you save more.",
    },
    {
        title: "CEO Discusses Future Plans",
        date: "February 20, 2023",
        image: "plans.jpg",
        description: "Our CEO Alice Johnson talks about the future plans and growth strategy of the bank.",
    },
];

function LatestNewsSection() {
    return (
        <Box sx={{ py: 8, backgroundColor: '#121212', color: 'white' }}>
            <Container>
                <Typography variant="h4" gutterBottom textAlign="center" sx={{ fontWeight: 'bold', color: '#64CCC5' }}>
                    Latest News
                </Typography>
                <Grid container spacing={4}>
                    {newsArticles.map((article) => (
                        <Grid item xs={12} sm={6} md={4} key={article.title}>
                            <Card sx={{ backgroundColor: '#1c1c1c', color: 'white', borderRadius: 2, boxShadow: '0 4px 20p rgba(0, 0, 0, 0.5)' }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={article.image}
                                    alt={article.title}
                                    sx={{ borderRadius: '2px 2px 0 0' }}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {article.title}
                                    </Typography>
                                    <Typography variant="body2" color="white" paragraph>
                                        {article.date}
                                    </Typography>
                                    <Typography variant="body2" color="white">
                                        {article.description}
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

export default LatestNewsSection;
