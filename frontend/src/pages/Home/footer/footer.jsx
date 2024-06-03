import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/system";

const StyledFooter = styled('footer')(({ theme }) => ({
    backgroundColor: '#1c1c1c',
    padding: theme.spacing(6),
    textAlign: 'center',
}));

function Footer() {
    return (
        <StyledFooter>
            <Container>
                <Typography variant="h6" color="white" gutterBottom>
                    My Bank
                </Typography>
                <Typography variant="body2" color="white">
                    © {new Date().getFullYear()} My Bank. All rights reserved.
                </Typography>
            </Container>
        </StyledFooter>
    );
}

export default Footer;
