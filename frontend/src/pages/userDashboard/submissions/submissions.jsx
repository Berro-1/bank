import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Typography, CircularProgress, Button 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Sidebar from "../../../components/layout/hero/Sidebar";
import { getSubmissions, submitNewSubmission } from "../../../store/submissions/submissionsActions";
import ApplySubmissionModal from "./popupModal"; // Import the ApplySubmissionModal component

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

  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handleFormSubmit = (formDetails) => {
    dispatch(submitNewSubmission(formDetails, userId));
    toggleModal();
  };

  return (
    <div className="flex w-full">
      <Sidebar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ padding: 20, flexGrow: 1 }}
      >
        <div className="flex items-center justify-between">
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            className="font-bold"
          >
            Submissions
          </Typography>
          <Button
            sx={{
              backgroundColor: '#111827',
              color: 'white',
              '&:hover': {
                backgroundColor: '#333A45',
              },
              fontSize: "14px",
              fontWeight: "bold",
              padding: "8px 16px",
              borderRadius: "4px",
              textTransform: 'none',
            }}
            onClick={toggleModal} // Open the modal when this button is clicked
          >
            Apply
          </Button>
        </div>
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
      <ApplySubmissionModal
        isOpen={isModalOpen}
        toggle={toggleModal}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default Submissions;
