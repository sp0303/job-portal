import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ThemeProvider, CssBaseline, Toolbar, Box } from '@mui/material';
import { createTheme } from '@mui/material/styles';

import Navbar from './components/Navbar.jsx';
import AppRoutes from './routes/AppRoutes.jsx';
import Footer from './components/Footer.jsx';

// Professional theme configuration
const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#1976d2', // Professional blue
      },
      ...(mode === 'light'
        ? {
            background: { 
              default: '#f8fafc',
              paper: '#ffffff' 
            },
            text: { primary: '#1e293b' },
          }
        : {
            background: { 
              default: '#0f172a',
              paper: '#1e293b' 
            },
            text: { primary: '#f8fafc' },
          }),
    },
    typography: {
      fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    },
  });

function App() {
  const [jobs, setJobs] = useState([]);
  const [mode, setMode] = useState('light'); // Default to light mode
  const theme = getTheme(mode);

  const fetchJobs = () => {
    axios
      .get('/api/jobs')
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err));
  };

  const handlePostJob = (jobData) => {
    return axios
      .post('/api/jobs', jobData)
      .then(() => fetchJobs());
  };

  const fetchJob = (id) => {
    return axios
      .get(`/api/jobs/${id}`)
      .then((res) => res.data)
      .catch((err) => console.error(err));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh',
        background: theme.palette.background.default,
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Router>
          <Navbar mode={mode} setMode={setMode} />
          <Toolbar />
          <Box sx={{ flexGrow: 1 }}>
            <AppRoutes
              jobs={jobs}
              fetchJobs={fetchJobs}
              fetchJob={fetchJob}
              handlePostJob={handlePostJob}
            />
          </Box>
          <Footer /> {/* ✅ Add Footer here */}
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
