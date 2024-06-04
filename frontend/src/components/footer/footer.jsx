import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/system";

const StyledFooter = styled("footer")(({ theme }) => ({
  backgroundColor: "#111827",
  padding: theme.spacing(6),
  textAlign: "center",
  borderTop: "1px solid rgba(255, 255, 255, 0.2)",
}));

function Footer() {
  return (
    <StyledFooter>
      <Container>
        <Typography variant="h6" color="white" gutterBottom>
          SafeStream
        </Typography>
        <Typography variant="body2" color="white">
          © {new Date().getFullYear()} SafeStream. All rights reserved.
        </Typography>
      </Container>
    </StyledFooter>
  );
}

export default Footer;
