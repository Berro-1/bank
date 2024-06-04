import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Box, Typography, Button } from '@mui/material';
import { services } from '../Services'; // Import services array
import Footer from '../../../components/footer/footer';

const darkTheme = {
  backgroundColor: '#111827', // Navy blue
  color: '#ffffff',
  primary: '#64CCC5', // Consistent teal color
  secondary: '#03dac6', // Accent color for highlights
};

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const service = services[serviceId];

  if (!service) {
    return (
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" gutterBottom textAlign="center" sx={{ fontWeight: 'bold', color: darkTheme.primary }}>
          Service Not Found
        </Typography>
      </Container>
    );
  }

  return (
    <div style={{ backgroundColor: darkTheme.backgroundColor, color: darkTheme.color, minHeight: '100vh' }}>
      <Container sx={{ py: 8 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center' }}>
          <Box
            component="img"
            sx={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: 2, mb: { xs: 4, md: 0 }, mr: { md: 4 } }}
            src={service.image}
            alt={service.title}
          />
          <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: darkTheme.primary }}>
              {service.title}
            </Typography>
            <Typography variant="body1" paragraph>
              {service.description}
            </Typography>
            <Typography variant="body1" paragraph>
              This is additional detailed information about the {service.title}. Our {service.title} services are designed to provide you with the best financial solutions. We offer tailored advice and plans to help you make the most out of your finances. Our dedicated team is always here to support you and ensure you receive the best possible service.
            </Typography>
            <Button variant="contained" href="/services" sx={{ mt: 2, backgroundColor: darkTheme.primary, '&:hover': { backgroundColor: darkTheme.secondary } }}>
              Back to Services
            </Button>
          </Box>
        </Box>
      </Container>
      <Footer/>
    </div>
  );
};

export default ServiceDetail;
