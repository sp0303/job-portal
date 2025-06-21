import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Button,
  Box,
  TablePagination,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  TableSortLabel
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { format } from 'date-fns';

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('postedAt');
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_BASE_URL;
  const fetchJobs = async () => {
    try {
      const res = await axios.get('${API}/jobs');
      setJobs(res.data);
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
      showSnackbar('Failed to fetch jobs', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    setDeletingId(id);
    try {
      await axios.delete(`${API}/jobs/${id}`);
      setJobs(jobs.filter(job => job.id !== id));
      showSnackbar('Job deleted successfully', 'success');
    } catch (err) {
      console.error('Delete failed:', err);
      showSnackbar('Failed to delete job', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch {
      return 'N/A';
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <Container sx={{ pt: 10, pb: 6 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>Manage Job Posts</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate('/admin/add-job')}
        >
          Add New Job
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper sx={{ borderRadius: 3, boxShadow: 3 }}>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>
                    <TableSortLabel
                      active={orderBy === 'title'}
                      direction={orderBy === 'title' ? order : 'asc'}
                      onClick={() => handleRequestSort('title')}
                    >
                      Title
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>
                    <TableSortLabel
                      active={orderBy === 'company'}
                      direction={orderBy === 'company' ? order : 'asc'}
                      onClick={() => handleRequestSort('company')}
                    >
                      Company
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>
                    <TableSortLabel
                      active={orderBy === 'location'}
                      direction={orderBy === 'location' ? order : 'asc'}
                      onClick={() => handleRequestSort('location')}
                    >
                      Location
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>
                    <TableSortLabel
                      active={orderBy === 'postedAt'}
                      direction={orderBy === 'postedAt' ? order : 'desc'}
                      onClick={() => handleRequestSort('postedAt')}
                    >
                      Posted Date
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }} align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stableSort(jobs, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(job => (
                    <TableRow
                      key={job.id}
                      hover
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell>{job.title}</TableCell>
                      <TableCell>{job.company}</TableCell>
                      <TableCell>{job.location}</TableCell>
                      <TableCell>{formatDate(job.postedAt || job.postedDate)}</TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                          <Tooltip title="Edit">
                            <IconButton
                              color="primary"
                              onClick={() => navigate(`/admin/edit-job/${job.id}`)}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              color="error"
                              onClick={() => handleDelete(job.id)}
                              disabled={deletingId === job.id}
                            >
                              {deletingId === job.id ? (
                                <CircularProgress size={24} />
                              ) : (
                                <DeleteIcon />
                              )}
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={jobs.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}