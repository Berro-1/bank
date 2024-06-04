import React from 'react';
import { Typography, Container, Box, Grid, Button, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Footer from '../../components/footer/footer';

const darkTheme = {
  backgroundColor: '#111827', // Navy blue
  color: '#ffffff',
  primary: '#64CCC5',
  secondary: '#03dac6',
};

export const services = [
  {
    title: 'Savings Account',
    description: `Secure your future with our high-interest savings accounts. Our savings accounts offer competitive interest rates, ensuring your money grows over time. Enjoy easy access to your funds while benefiting from our robust security measures. Whether you're saving for a rainy day, a big purchase, or your retirement, our savings accounts provide a reliable and flexible solution for your financial needs.`,
    image: '/savings.jpg', // Updated path
  },
  {
    title: 'Loans',
    description: `Get the financial support you need with our loan services. We offer a variety of loan options to suit your needs, including personal loans, auto loans, and mortgage loans. Our loan application process is straightforward, and our loan officers are here to guide you every step of the way. Benefit from competitive interest rates and flexible repayment terms designed to fit your budget. Whether you're looking to buy a new car, purchase a home, or cover unexpected expenses, our loan services can help you achieve your goals.`,
    image: '/loan.jpg', // Updated path
  },
  {
    title: 'Credit Cards',
    description: `Explore our range of credit cards with great benefits. Our credit cards come with a variety of features, including cashback rewards, travel perks, and low interest rates. Choose the card that best fits your lifestyle and enjoy added financial flexibility and purchasing power. Our secure credit card services offer fraud protection and online account management, making it easy to keep track of your spending and rewards. Apply today and start enjoying the benefits of a My Bank credit card.`,
    image: '/credit.jpg', // Updated path
  },
  {
    title: 'Insurance',
    description: `Protect your assets with our comprehensive insurance plans. At My Bank, we offer a range of insurance products to safeguard your home, vehicle, and personal belongings. Our insurance policies are designed to provide peace of mind and financial protection against unforeseen events. With customizable coverage options and competitive premiums, our insurance services offer the protection you need at a price you can afford. Talk to our insurance specialists today to find the best coverage for your needs.`,
    image: '/insurance.jpg', // Updated path
  },
  {
    title: 'Investment',
    description: `Grow your wealth with our tailored investment solutions. Our investment services offer a variety of options to help you build a diversified portfolio. From stocks and bonds to mutual funds and retirement accounts, we provide the tools and expertise you need to make informed investment decisions. Our experienced financial advisors work with you to create a personalized investment strategy that aligns with your financial goals and risk tolerance. Start investing today and take control of your financial future with My Bank.`,
    image: '/investment.jpg', // Updated path
  },
];

const OurServices = () => {
  return (
    <div style={{ backgroundColor: darkTheme.backgroundColor, color: darkTheme.color, minHeight: '100vh', padding: '60px 20px' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom textAlign="center" sx={{ fontWeight: 'bold', color: darkTheme.primary, mb: 4,fontSize:'3rem' }}>
          Our Services
        </Typography>
        <Grid container spacing={4} justifyContent="center" alignItems="stretch">
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
              >
                <Paper sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  backgroundColor: '#1a2238', // Slightly lighter navy blue
                  color: '#fff',
                  p: 3,
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                  '&:hover': {
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
                    transform: 'translateY(-5px)',
                  },
                  transition: 'all 0.3s ease-in-out'
                }}>
                  <Box
                    component="img"
                    sx={{
                      height: '200px', // Fixed height for all images
                      objectFit: 'cover',
                      mb: 2,
                      borderRadius: '8px'
                    }}
                    src={service.image}
                    alt={service.title}
                  />
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: darkTheme.primary, mb: 1 }}>
                    {service.title}
                  </Typography>
                  <Typography variant="body2" paragraph sx={{ flex: 1, textAlign: 'center' }}>
                    {service.description}
                  </Typography>
                  <Button component={Link} to={`/services/${index}`} variant="contained" endIcon={<ArrowForwardIosIcon />} sx={{
                    mt: 2,
                    backgroundColor: darkTheme.primary,
                    '&:hover': {
                      backgroundColor: darkTheme.secondary,
                    }
                  }}>
                    Learn More
                  </Button>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer/>
    </div>
  );
};

export default OurServices;
