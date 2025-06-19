// GovernmentJobs.jsx
import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

function GovernmentJobs() {
  return (
    <Container sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Government Job Openings
        </Typography>
        <Box mt={2}>
          <Typography variant="body1">
            This section will soon list verified Government Job openings from reliable sources like UPSC, SSC, State PSCs, and more.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default GovernmentJobs;
