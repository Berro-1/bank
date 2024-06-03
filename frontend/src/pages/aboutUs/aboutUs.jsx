import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Grid, Avatar, Paper, Divider, Button } from '@mui/material';
import { motion } from 'framer-motion';

const darkTheme = {
  backgroundColor: '#1F2937',
  color: '#ffffff',
  primary: '#bb86fc',
  secondary: '#03dac6',
};

const teamMembers = [
  {
    name: 'Alice Johnson',
    role: 'Chief Financial Officer',
    image: 'alice.jpg',
  },
  {
    name: 'Bob Smith',
    role: 'Chief Executive Officer',
    image: 'bob.jpg',
  },
  {
    name: 'Clay Davis',
    role: 'Chief Operating Officer',
    image: 'clay.jpg',
  },
];

const testimonials = [
  {
    name: 'John Doe',
    feedback: 'Excellent service and friendly staff!',
  },
  {
    name: 'Jane Smith',
    feedback: 'They helped me get a loan quickly and easily.',
  },
  {
    name: 'Mark Johnson',
    feedback: 'Great banking experience overall.',
  },
];

const AboutUs = () => {
  return (
    <div style={{ backgroundColor: darkTheme.backgroundColor, color: darkTheme.color, minHeight: '100vh' }}>
      
      <Box sx={{ py: 8 }}>
        <Container>
          <Typography variant="h3" gutterBottom textAlign="center" sx={{ fontWeight: 'bold', color: darkTheme.primary }}>
            About Us
          </Typography>
          <Typography variant="h6" paragraph textAlign="center" sx={{ mb: 6, color: darkTheme.color }}>
            Learn more about our history, mission, vision, and the team that makes it all happen.
          </Typography>

          {/* History Section */}
          <Box sx={{ mb: 8 }}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h4" gutterBottom textAlign="center" sx={{ fontWeight: 'bold', color: darkTheme.primary }}>
                Our History
              </Typography>
              <Divider sx={{ mb: 4, bgcolor: darkTheme.primary, height: '3px' }} />
              <Typography variant="body1" paragraph sx={{ color: darkTheme.color }}>
                My Bank was founded in 2000 with a vision to provide exceptional financial services to the community. Over the past two decades, we have grown from a small local bank to a trusted financial institution with multiple branches across the country. Our commitment to customer service and innovative banking solutions has earned us numerous accolades and a loyal customer base.
              </Typography>
            </motion.div>
          </Box>

          {/* Mission and Vision Section */}
          <Box sx={{ mb: 8 }}>
            <Grid container spacing={6}>
              <Grid item xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Typography variant="h4" gutterBottom textAlign="center" sx={{ fontWeight: 'bold', color: darkTheme.primary }}>
                    Our Mission
                  </Typography>
                  <Divider sx={{ mb: 4, bgcolor: darkTheme.primary, height: '3px' }} />
                  <Typography variant="body1" paragraph sx={{ color: darkTheme.color }}>
                    Our mission is to empower individuals and businesses by providing reliable, accessible, and innovative financial services. We aim to build long-lasting relationships with our customers by understanding their needs and helping them achieve their financial goals.
                  </Typography>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Typography variant="h4" gutterBottom textAlign="center" sx={{ fontWeight: 'bold', color: darkTheme.primary }}>
                    Our Vision
                  </Typography>
                  <Divider sx={{ mb: 4, bgcolor: darkTheme.primary, height: '3px' }} />
                  <Typography variant="body1" paragraph sx={{ color: darkTheme.color }}>
                    Our vision is to be the leading financial institution known for our customer-centric approach and innovative banking solutions. We strive to set new standards in the banking industry through our commitment to excellence, integrity, and continuous improvement.
                  </Typography>
                </motion.div>
              </Grid>
            </Grid>
          </Box>

          {/* Values Section */}
          <Box sx={{ mb: 8 }}>
            <Typography variant="h4" gutterBottom textAlign="center" sx={{ fontWeight: 'bold', color: darkTheme.primary }}>
              Our Values
            </Typography>
            <Divider sx={{ mb: 4, bgcolor: darkTheme.primary, height: '3px' }} />
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Paper sx={{ p: 3, backgroundColor: '#1c1c1c', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                    <Typography variant="h6" gutterBottom sx={{ color: darkTheme.primary }}>
                      Integrity
                    </Typography>
                    <Typography variant="body2" sx={{ color: darkTheme.color }}>
                      We uphold the highest standards of integrity in all our actions and decisions.
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={4}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Paper sx={{ p: 3, backgroundColor: '#1c1c1c', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                    <Typography variant="h6" gutterBottom sx={{ color: darkTheme.primary }}>
                      Customer Focus
                    </Typography>
                    <Typography variant="body2" sx={{ color: darkTheme.color }}>
                      Our customers are at the heart of everything we do, and we strive to exceed their expectations.
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={4}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Paper sx={{ p: 3, backgroundColor: '#1c1c1c', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                    <Typography variant="h6" gutterBottom sx={{ color: darkTheme.primary }}>
                      Innovation
                    </Typography>
                    <Typography variant="body2" sx={{ color: darkTheme.color }}>
                      We embrace change and continuously seek new ways to improve our products and services.
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            </Grid>
          </Box>

          {/* Our Team Section */}
          <Box sx={{ mb: 8 }}>
            <Typography variant="h4" gutterBottom textAlign="center" sx={{ fontWeight: 'bold', color: darkTheme.primary }}>
              Our Team
            </Typography>
            <Divider sx={{ mb: 4, bgcolor: darkTheme.primary, height: '3px' }} />
            <Grid container spacing={4}>
              {teamMembers.map((member, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <Box sx={{ textAlign: 'center', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-10px)' } }}>
                      <Avatar
                        src={member.image}
                        alt={member.name}
                        sx={{ width: 150, height: 150, margin: '0 auto', mb: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)' }}
                      />
                      <Typography variant="h6" gutterBottom sx={{ color: darkTheme.primary }}>
                        {member.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: darkTheme.color }}>
                        {member.role}
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Achievements Section */}
          <Box sx={{ mb: 8 }}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h4" gutterBottom textAlign="center" sx={{ fontWeight: 'bold', color: darkTheme.primary }}>
                Our Achievements
              </Typography>
              <Divider sx={{ mb: 4, bgcolor: darkTheme.primary, height: '3px' }} />
              <Typography variant="body1" paragraph sx={{ color: darkTheme.color }}>
                Over the years, My Bank has received numerous awards and recognitions for our exceptional services and community contributions. We are proud to be recognized as one of the top banks in the country, thanks to our dedicated team and loyal customers. Some of our notable achievements include:
              </Typography>
              <ul>
                <li>
                  <Typography variant="body1" paragraph sx={{ color: darkTheme.color }}>
                    Best Customer Service Award - 2021
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" paragraph sx={{ color: darkTheme.color }}>
                    Excellence in Innovation Award - 2020
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" paragraph sx={{ color: darkTheme.color }}>
                    Top Financial Institution Award - 2019
                  </Typography>
                </li>
              </ul>
            </motion.div>
          </Box>

          {/* Testimonials Section */}
          <Box sx={{ mb: 8 }}>
            <Typography variant="h4" gutterBottom textAlign="center" sx={{ fontWeight: 'bold', color: darkTheme.primary }}>
              What Our Customers Say
            </Typography>
            <Divider sx={{ mb: 4, bgcolor: darkTheme.primary, height: '3px' }} />
            <Grid container spacing={4}>
              {testimonials.map((testimonial, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <Paper sx={{ p: 3, backgroundColor: '#1c1c1c', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                      <Typography variant="body1" paragraph sx={{ fontStyle: 'italic', color: darkTheme.color }}>
                        "{testimonial.feedback}"
                      </Typography>
                      <Typography variant="body2" sx={{ color: darkTheme.primary, textAlign: 'right' }}>
                        - {testimonial.name}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default AboutUs;
