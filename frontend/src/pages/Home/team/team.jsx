import React from "react";
import { Box, Container, Typography, Grid, Avatar } from "@mui/material";

const teamMembers = [
    {
        name: "Alice Johnson",
        role: "CFO",
        image: "alice.jpg",
    },
    {
        name: "Bob Smith",
        role: "CEO",
        image: "Bob.jpg",
    },
    {
        name: "Clay Davis",
        role: "COO",
        image: "clay.jpg",
    },
];

function OurTeamSection() {
    return (
        <Box sx={{ py: 8, backgroundColor: '#1c1c1c', color: 'white' }}>
            <Container>
                <Typography variant="h4" gutterBottom textAlign="center">
                    Our Team
                </Typography>
                <Grid container spacing={4}>
                    {teamMembers.map((member) => (
                        <Grid item xs={12} sm={6} md={4} key={member.name}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Avatar
                                    src={member.image}
                                    alt={member.name}
                                    sx={{ width: 150, height: 150, margin: '0 auto' }}
                                />
                                <Typography variant="h6" mt={2}>
                                    {member.name}
                                </Typography>
                                <Typography variant="body2" color="white">
                                    {member.role}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}

export default OurTeamSection;
