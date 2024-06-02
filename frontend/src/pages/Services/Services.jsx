import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Grid, Button, Paper, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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

const darkTheme = {
  backgroundColor: '#121212',
  color: '#ffffff',
  primary: '#bb86fc',
  secondary: '#03dac6',
};

const OurServices = () => {
  return (
    <div style={{ backgroundColor: darkTheme.backgroundColor, color: darkTheme.color, minHeight: '100vh' }}>
   
      <Box sx={{ py: 8 }}>
        <Container>
          <Typography variant="h4" gutterBottom textAlign="center" sx={{ fontWeight: 'bold', position: 'relative', display: 'inline-block' }}>
            Our Services
            <Divider sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', width: '50%', height: '3px', bgcolor: darkTheme.primary, mt: 1 }} />
          </Typography>
          <Grid container spacing={6} sx={{ mt: 6 }}>
            {services.map((service, index) => (
              <Grid item xs={12} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Paper sx={{
                    display: 'flex',
                    backgroundColor: 'rgba(28, 28, 28, 0.8)',
                    color: 'white',
                    p: 3,
                    borderRadius: 2,
                    alignItems: 'center',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(10px)',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.8)',
                    }
                  }}>
                    <Box
                      component="img"
                      sx={{
                        width: { xs: '100%', md: '250px' },
                        height: '250px',
                        objectFit: 'cover',
                        borderRadius: 2,
                        mr: { xs: 0, md: 3 },
                        mb: { xs: 2, md: 0 },
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                        transition: 'transform 0.3s',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        }
                      }}
                      src={service.image}
                      alt={service.title}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: darkTheme.primary }}>
                        {service.title}
                      </Typography>
                      <Typography variant="body1" paragraph>
                        {service.description}
                      </Typography>
                      <Button component={Link} to={`/services/${index}`} variant="contained" endIcon={<ArrowForwardIosIcon />} sx={{
                        mt: 2,
                        backgroundColor: darkTheme.primary,
                        '&:hover': {
                          backgroundColor: darkTheme.secondary,
                        },
                        transition: 'background-color 0.3s',
                      }}>
                        Learn More
                      </Button>
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default OurServices;
