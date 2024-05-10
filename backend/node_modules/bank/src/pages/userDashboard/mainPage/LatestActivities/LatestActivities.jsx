import React from 'react';
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const latestActivitiesData = [
  { id: 1, date: '2022-05-01', description: 'Payment received', amount: '$100' },
  { id: 2, date: '2022-05-02', description: 'Withdrawal', amount: '-$50' },
  { id: 3, date: '2022-05-03', description: 'Deposit', amount: '$200' },
  { id: 4, date: '2022-05-04', description: 'Payment sent', amount: '-$75' },
  { id: 5, date: '2022-05-05', description: 'Purchase', amount: '-$30' },
  { id: 6, date: '2022-05-06', description: 'Refund', amount: '$50' },
  { id: 7, date: '2022-05-07', description: 'Withdrawal', amount: '-$100' },
  { id: 8, date: '2022-05-08', description: 'Payment received', amount: '$150' },
  { id: 9, date: '2022-05-09', description: 'Purchase', amount: '-$25' },
  { id: 10, date: '2022-05-10', description: 'Deposit', amount: '$300' },
];

const LatestActivities = () => {
  return (
    <motion.div 
      className="mt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <h2 className="text-2xl font-bold" style={{ color: '#606470FF' }}>Latest Activities</h2>
      <TableContainer component={Paper} className="rounded-lg shadow-md">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-semibold" style={{ color: '#606470FF' }}>Date</TableCell>
              <TableCell className="font-semibold" style={{ color: '#606470FF' }}>Description</TableCell>
              <TableCell className="font-semibold" align="right" style={{ color: '#606470FF' }}>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {latestActivitiesData.map((activity, index) => (
              <TableRow key={activity.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <TableCell>{activity.date}</TableCell>
                <TableCell>{activity.description}</TableCell>
                <TableCell align="right">{activity.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </motion.div>
  );
};




export default LatestActivities;
