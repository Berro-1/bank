import React from "react";
import { Box, Container, Typography } from "@mui/material";

function AboutUsSection() {
    return (
        <Box sx={{ py: 8, backgroundColor: '#121212', color: 'white' }}>
            <Container>
                <Typography variant="h4" gutterBottom textAlign="center" sx={{ fontWeight: 'bold', color: '#64CCC5' }}>
                    About Us
                </Typography>
                <Typography variant="body1" textAlign="center" paragraph sx={{ maxWidth: '800px', margin: '0 auto', color: '#d1d5db' }}>
                    My Bank has been providing top-notch financial services to customers for over 20 years. Our mission is to help you achieve your financial goals with ease and confidence. We offer a wide range of services including savings accounts, loans, credit cards, and more. Our dedicated team of professionals is here to assist you every step of the way.
                </Typography>
            </Container>
        </Box>
    );
}

export default AboutUsSection;
