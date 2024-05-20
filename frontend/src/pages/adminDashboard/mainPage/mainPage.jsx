import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Container, Grid, Paper, List, ListItem, ListItemText } from '@mui/material';
import AdminSidebar from '../../../components/layout/adminSidebar/adminSidebar';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getAllLoans } from '../../../store/Loans/loansActions';
// import { getAllUsers } from '../../../store/all';
import { getAllTransactions } from '../../../store/Transactions/transactionActions';
import { getcards } from '../../../store/cards/cardsActions';
// import { getAllInvestments } from '../../../store/';

const DashboardItem = ({ icon: Icon, title, value, backgroundColor }) => (
  <Paper sx={{ padding: 2, display: 'flex', alignItems: 'center', backgroundColor, height: '100%' }}>
    <Icon sx={{ fontSize: 40, color: 'white', marginRight: 2 }} />
    <Box>
      <Typography variant="h6" sx={{ color: 'white' }}>{title}</Typography>
      <Typography variant="h4" sx={{ color: 'white' }}>{value}</Typography>
    </Box>
  </Paper>
);

const recentActivities = [
  { id: 1, activity: 'User John Doe opened a new savings account' },
  { id: 2, activity: 'Loan approved for user Jane Smith' },
  { id: 3, activity: 'User Bob Johnson updated credit card limit' },
  { id: 4, activity: 'Investment made in mutual funds by user Alice Williams' },
  { id: 5, activity: 'Transaction of $5000 completed by user Chris Evans' },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdminDashboard = () => {
  const dispatch = useDispatch();

  // const { totalUsers } = useSelector((state) => state.users);
  const { totalTransactions, transactions } = useSelector((state) => state.transactions);
  const { totalLoans, loans } = useSelector((state) => state.loans);
  const { totalCreditCards, creditCards } = useSelector((state) => state.cards);
  // const { totalInvestments, investments } = useSelector((state) => state.investments);

  useEffect(() => {
    // dispatch(getAllUsers());
    dispatch(getAllTransactions());
    dispatch(getAllLoans());
    dispatch(getcards());
    // dispatch(getAllInvestments());
  }, [dispatch]);

  const data = transactions.map((transaction, index) => ({
    name: `Month ${index + 1}`,
    // users: totalUsers,
    loans: totalLoans,
    transactions: transaction.amount,
  }));

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminSidebar />
      <motion.div
        style={{ flexGrow: 1, padding: 20, marginLeft: 256 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>Admin Dashboard</Typography>
          </Box>
          <Grid container spacing={4}>
            {/* <Grid item xs={12} sm={6} md={4}>
              <DashboardItem
                backgroundColor="#2D3748"
                icon={PersonOutlineOutlinedIcon}
                title="Total Users"
                value={totalUsers}
              />
            </Grid> */}
            <Grid item xs={12} sm={6} md={4}>
              <DashboardItem
                backgroundColor="#4A5568"
                icon={ReceiptLongOutlinedIcon}
                title="Total Transactions"
                value={totalTransactions}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <DashboardItem
                backgroundColor="#2D3748"
                icon={AccountBalanceWalletOutlinedIcon}
                title="Current Balance"
                value="$789,000"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <DashboardItem
                backgroundColor="#4A5568"
                icon={AttachMoneyOutlinedIcon}
                title="Total Loans"
                value={totalLoans}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <DashboardItem
                backgroundColor="#2D3748"
                icon={CreditCardOutlinedIcon}
                title="Total Credit Cards"
                value={totalCreditCards}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6} md={4}>
              <DashboardItem
                backgroundColor="#4A5568"
                icon={TrendingUpOutlinedIcon}
                title="Total Investments"
                value={`$${totalInvestments}`}
              />
            </Grid> */}
          </Grid>
          <Box sx={{ marginTop: 4 }}>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
              Recent Activities
            </Typography>
            <Paper sx={{ padding: 2 }}>
              <List>
                {recentActivities.map(activity => (
                  <ListItem key={activity.id}>
                    <ListItemText primary={activity.activity} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>
          <Box sx={{ marginTop: 4 }}>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
              Analytics
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ padding: 2 }}>
                  <Typography variant="h6" sx={{ marginBottom: 2 }}>
                    User Growth
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="users" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper sx={{ padding: 2 }}>
                  <Typography variant="h6" sx={{ marginBottom: 2 }}>
                    Loans and Transactions
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="loans" fill="#82ca9d" />
                      <Bar dataKey="transactions" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper sx={{ padding: 2 }}>
                  <Typography variant="h6" sx={{ marginBottom: 2 }}>
                    Loan Distribution
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        dataKey="value"
                        isAnimationActive={false}
                        data={[
                          { name: 'Personal', value: 400 },
                          { name: 'Mortgage', value: 300 },
                          { name: 'Auto', value: 300 },
                          { name: 'Education', value: 200 }
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                      >
                        {COLORS.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </motion.div>
    </Box>
  );
};

export default AdminDashboard;
