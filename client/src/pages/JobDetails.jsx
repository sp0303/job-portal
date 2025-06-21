import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  Paper,
  Button,
  Chip,
  Box,
  Grid,
  Divider,
  Avatar,
  useTheme,
  IconButton,
  Link,
  Rating,
} from '@mui/material';
import {
  ArrowBack,
  LocationOn,
  AttachMoney,
  Work,
  Event,
  Share,
  BookmarkBorder,
  School,
  StarRate,
  Business,
  Info,
  SmartToy,
  DateRange,
  Description
} from '@mui/icons-material';
const API = process.env.REACT_APP_API_BASE_URL;

const getRandomColor = () => {
  const colors = ['#00DBDE', '#FC00FF', '#0083FF', '#00FF87', '#FF00F5'];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    axios.get(`${API}/jobs/${id}`)
      .then(res => setJob(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleApplyClick = () => {
    if (job?.applyLink) {
      const formattedLink = job.applyLink.startsWith('http') ? job.applyLink : `https://${job.applyLink}`;
      window.open(formattedLink, '_blank');
    }
  };

  if (!job) return <div>Loading...</div>;

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
        variant="outlined"
      >
        Back to Jobs
      </Button>

      <Grid container spacing={4} alignItems="flex-start">
        <Grid item xs={12} md={8}>
          <Paper elevation={4} sx={{
            borderRadius: 4,
            overflow: 'hidden',
            background: theme.palette.mode === 'dark'
              ? 'rgba(30, 30, 40, 0.8)'
              : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            p: { xs: 3, md: 5 }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 4 }}>
              <Avatar sx={{
                bgcolor: getRandomColor(),
                mr: 3,
                width: 80,
                height: 80,
                fontSize: 32
              }}>
                {job.company?.charAt(0)?.toUpperCase() || '?'}
              </Avatar>
              <Box>
                <Typography variant="h4" fontWeight={700}>{job.title}</Typography>
                <Typography variant="h6" color="primary">{job.company}</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  <Chip icon={<LocationOn />} label={job.location} variant="outlined" />
                  <Chip icon={<AttachMoney />} label={job.salary} variant="outlined" />
                  <Chip icon={<Work />} label={job.type || 'Full-time'} variant="outlined" />
                  <Chip icon={<Event />} label={`Posted: ${new Date(job.postedDate || Date.now()).toLocaleDateString()}`} variant="outlined" />
                </Box>
              </Box>
            </Box>

            {/* About Company Section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                <Business sx={{ verticalAlign: 'middle', mr: 1 }} />
                About Company
              </Typography>
              <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-line' }}>
                {job.about || 'No additional company info available.'}
              </Typography>
              
              {/* Ratings Display */}
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <StarRate color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body1" sx={{ mr: 1 }}>Company Rating:</Typography>
                  <Rating value={job.rating || 0} precision={0.5} readOnly />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <StarRate color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body1" sx={{ mr: 1 }}>AmbitionBox:</Typography>
                  <Rating value={job.ambienceBoxRating || 0} precision={0.5} readOnly />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <StarRate color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body1" sx={{ mr: 1 }}>Glassdoor:</Typography>
                  <Rating value={job.glassdoorRating || 0} precision={0.5} readOnly />
                </Box>
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Job Description */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                <Description sx={{ verticalAlign: 'middle', mr: 1 }} />
                Job Description
              </Typography>
              <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-line' }}>
                {job.description || 'No description available.'}
              </Typography>
            </Box>

            {/* Responsibilities */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                <Work sx={{ verticalAlign: 'middle', mr: 1 }} />
                Role and Responsibilities
              </Typography>
              <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-line' }}>
                {job.responsibilities || 'Not specified.'}
              </Typography>
            </Box>

            {/* Education & Skills */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                <School sx={{ verticalAlign: 'middle', mr: 1 }} />
                Education & Skills
              </Typography>
              <Typography variant="body1" paragraph>
                {job.education || 'Not specified.'}
              </Typography>
              {job.skills && job.skills.length > 0 && (
                <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {job.skills.map((skill, index) => (
                    <Chip key={index} label={skill} variant="outlined" />
                  ))}
                </Box>
              )}
            </Box>

            {/* How to Apply */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                <Info sx={{ verticalAlign: 'middle', mr: 1 }} />
                How to Apply
              </Typography>
              <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-line' }}>
                {job.applyInstructions || 'Click the button below to apply directly on the company/job page.'}
              </Typography>
            </Box>

            {/* AI Recommendations */}
            {job.aiSuggestion && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  <SmartToy sx={{ verticalAlign: 'middle', mr: 1 }} />
                  AI Recommendations
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
                  {job.aiSuggestion}
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Right Sidebar */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{
            p: 3,
            borderRadius: 3,
            position: 'sticky',
            top: 100,
            backgroundColor: theme.palette.mode === 'dark' ? '#1e293b' : '#fafafa',
            boxShadow: theme.palette.mode === 'dark' ? '0px 2px 12px rgba(0,0,0,0.4)' : '0px 2px 12px rgba(0,0,0,0.08)',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Job Summary
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Event sx={{ mr: 2 }} />
              <Typography>Posted: {new Date(job.postedDate || Date.now()).toLocaleDateString()}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Work sx={{ mr: 2 }} />
              <Typography>Experience: {job.experience || 'Not specified'}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <DateRange sx={{ mr: 2 }} />
              <Typography>Posted Date: {new Date(job.postedDate).toLocaleDateString()}</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Button
              variant="contained"
              onClick={handleApplyClick}
              size="large"
              sx={{
                py: 1.5,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: theme.shadows[4],
                },
              }}
            >
              APPLY NOW
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
              <IconButton aria-label="share">
                <Share />
              </IconButton>
              <IconButton aria-label="save">
                <BookmarkBorder />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}