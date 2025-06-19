import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Box,
  Avatar,
  InputAdornment,
  Fade,
  Alert,
  CircularProgress,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  WorkOutline as WorkOutlineIcon,
  Business as BusinessIcon,
  LocationOn as LocationOnIcon,
  AttachMoney as AttachMoneyIcon,
  Description as DescriptionIcon,
  Link as LinkIcon
} from '@mui/icons-material';
import { styled, alpha } from '@mui/system';

const GradientPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(6),
  borderRadius: '24px',
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.1)} 0%, ${alpha(theme.palette.secondary.light, 0.1)} 100%)`,
  backdropFilter: 'blur(10px)',
  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
  position: 'relative',
  overflow: 'hidden',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    right: '-50%',
    width: '200%',
    height: '200%',
    background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.05)} 0%, transparent 70%)`,
    animation: 'rotate 15s linear infinite',
    zIndex: -1,
  },
  '@keyframes rotate': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
}));

const FloatingButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 4),
  borderRadius: '12px',
  fontWeight: 700,
  fontSize: '1rem',
  textTransform: 'none',
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: theme.palette.common.white,
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
  },
  '&:disabled': {
    background: theme.palette.grey[300],
  },
}));

const IconTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: alpha(theme.palette.common.white, 0.9),
    '& fieldset': {
      borderColor: alpha(theme.palette.divider, 0.3),
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.light,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
    },
  },
}));

export default function PostJob() {
  const [jobData, setJobData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    description: '',
    applyLink: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await axios.post('/api/jobs', jobData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/jobs');
      }, 1500);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to post job. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        pt: { xs: 12, md: 14 },
        pb: 10,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <Fade in timeout={500}>
        <GradientPaper elevation={0} sx={{ width: '100%', px: { xs: 2, sm: 4 }, py: { xs: 4, sm: 6 } }}>
          {/* Decorative Bubbles */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 120,
              height: 120,
              background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 70%)`,
              borderRadius: '50%',
              transform: 'translate(30%, -30%)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: 100,
              height: 100,
              background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.08)} 0%, transparent 70%)`,
              borderRadius: '50%',
              transform: 'translate(-30%, 30%)',
            }}
          />

          {/* Header */}
          <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                width: 72,
                height: 72,
                mb: 2,
                boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
              }}
            >
              <WorkOutlineIcon fontSize="large" />
            </Avatar>
            <Typography
              variant="h4"
              component="h1"
              fontWeight={800}
              color="primary"
              textAlign="center"
            >
              Post a New Job
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              textAlign="center"
              sx={{ maxWidth: 600 }}
            >
              Fill in the job details to get it in front of thousands of candidates.
            </Typography>
          </Box>

          {/* Alerts */}
          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
              Job posted successfully! Redirecting...
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <IconTextField
                  label="Job Title"
                  name="title"
                  value={jobData.title}
                  onChange={handleChange}
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <WorkOutlineIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  size={isMobile ? 'small' : 'medium'}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <IconTextField
                  label="Company Name"
                  name="company"
                  value={jobData.company}
                  onChange={handleChange}
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BusinessIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  size={isMobile ? 'small' : 'medium'}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <IconTextField
                  label="Location"
                  name="location"
                  value={jobData.location}
                  onChange={handleChange}
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  size={isMobile ? 'small' : 'medium'}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <IconTextField
                  label="Salary Range"
                  name="salary"
                  value={jobData.salary}
                  onChange={handleChange}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  size={isMobile ? 'small' : 'medium'}
                />
              </Grid>
              <Grid item xs={12}>
                <IconTextField
                  label="Job Description"
                  name="description"
                  value={jobData.description}
                  onChange={handleChange}
                  multiline
                  rows={isMobile ? 4 : 6}
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DescriptionIcon color="primary" sx={{ mt: isMobile ? -3 : -6, alignSelf: 'flex-start' }} />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <IconTextField
                  label="Application Link"
                  name="applyLink"
                  value={jobData.applyLink}
                  onChange={handleChange}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LinkIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  size={isMobile ? 'small' : 'medium'}
                />
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center">
                  <FloatingButton
                    type="submit"
                    size="large"
                    disabled={isSubmitting || success}
                    startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
                    sx={{
                      width: isMobile ? '100%' : 240,
                      py: 1.5,
                      fontSize: '1rem',
                    }}
                  >
                    {isSubmitting ? 'Posting...' : success ? 'Success!' : 'Post Job Now'}
                  </FloatingButton>
                </Box>
              </Grid>
            </Grid>
          </form>
        </GradientPaper>
      </Fade>
    </Container>
  );
}
