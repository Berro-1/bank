import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import AdminSidebar from "../../../components/layout/adminSidebar/adminSidebar";
import { motion } from "framer-motion";
import { getAllUsers } from "../../../store/users/userActions";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const userCount = users.length;

  // Aggregate user registration data by day
  const aggregateData = () => {
    const data = {};
    users.forEach(user => {
      const date = new Date(user.createdAt);
      if (isNaN(date.getTime())) {
        console.error('Invalid date:', user.createdAt);
        return;
      }
      const day = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      if (data[day]) {
        data[day]++;
      } else {
        data[day] = 1;
      }
    });
    console.log('Aggregated Data:', data);
    return Object.keys(data).sort().map(key => ({ day: key, count: data[key] }));
  };

  const data = aggregateData();

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar />
      <motion.div
        style={{ flexGrow: 1, padding: 20 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 4, px: 4 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", color: "#fff" }}>
            Admin Dashboard
          </Typography>
        </Box>
        <Container maxWidth="lg">
          <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
            <Box sx={{ marginBottom: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: "bold", color: "#424242" }}>
                Total Users: {userCount}
              </Typography>
            </Box>
            <Box sx={{ marginBottom: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "#424242", marginBottom: 2 }}>
                User Registrations Over Time:
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart
                  data={data}
                  margin={{
                    top: 10, right: 30, left: 0, bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="day" tick={{ fill: '#4CAF50' }} />
                  <YAxis tick={{ fill: '#4CAF50' }} allowDecimals={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #4CAF50' }} />
                  <Legend verticalAlign="top" height={36} />
                  <Area type="monotone" dataKey="count" stroke="#4CAF50" fill="#A5D6A7" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Container>
      </motion.div>
    </Box>
  );
};

export default AdminDashboard;
