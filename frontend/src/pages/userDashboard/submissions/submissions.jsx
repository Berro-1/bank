import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Typography, CircularProgress 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Sidebar from "../../../components/layout/hero/Sidebar";
import { getSubmissions } from "../../../store/submissions/submissionsActions";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: '#4727eb', 
  color: theme.palette.common.white,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

const Submissions = () => {
  const userId = "6644dcb9c16b269cf9bae998";

  const dispatch = useDispatch();
  const { loading, submissions } = useSelector(
    (state) => state.submissions || { submissions: [], loading: false }
  );

  useEffect(() => {
    dispatch(getSubmissions(userId)).then(() => {
      console.log("Submissions fetched:", submissions);
    });
  }, [dispatch, userId]);

  useEffect(() => {
    console.log("Submissions state updated:", submissions);
  }, [submissions]);

  return (
    <div className="flex w-full">
      <Sidebar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ padding: 20, flexGrow: 1 }}
      >
        <Typography variant="h4" component="h1" gutterBottom className="font-bold pt-10">
          Submissions
        </Typography>
        {loading ? (
          <CircularProgress color="primary" />
        ) : (
          <TableContainer component={Paper} style={{ width: '100%' }}>
            <Table style={{ width: '100%' }}>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell>Request Type</StyledTableCell>
                  <StyledTableCell>Details</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {submissions.map((submission) => (
                  <StyledTableRow key={submission._id}>
                    <TableCell>{new Date(submission.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>{submission.requestType}</TableCell>
                    <TableCell>{submission.details}</TableCell>
                    <TableCell>{submission.status}</TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </motion.div>
    </div>
  );
};

export default Submissions;
