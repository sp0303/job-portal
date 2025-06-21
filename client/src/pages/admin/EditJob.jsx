import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, TextField, Button, Typography, Paper, Grid, Box, Avatar,
  InputAdornment, Alert, CircularProgress, useTheme, useMediaQuery,
  Chip, Tabs, Tab, Divider, Rating
} from '@mui/material';
import {
  Edit as EditIcon,
  WorkOutline as WorkOutlineIcon,
  Business as BusinessIcon,
  LocationOn as LocationOnIcon,
  AttachMoney as AttachMoneyIcon,
  Description as DescriptionIcon,
  Link as LinkIcon,
  AddCircleOutline as AddCircleOutlineIcon,
  Category as CategoryIcon,
  School as SchoolIcon,
  Info as InfoIcon,
  DateRange as DateRangeIcon,
  SmartToy as SmartToyIcon,
  StarRate as StarRateIcon,
  StarBorder as StarBorderIcon,
  Work as WorkIcon
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { styled, alpha } from '@mui/system';
import { motion } from 'framer-motion';

const GradientPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(4),
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
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    borderRadius: '16px',
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
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1, 3),
    fontSize: '0.875rem',
    width: '100%',
  },
}));

const IconTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: alpha(theme.palette.common.white, 0.9),
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '& fieldset': {
      borderColor: alpha(theme.palette.divider, 0.3),
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.light,
      boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.1)}`,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.2)}`,
    },
  },
  [theme.breakpoints.down('sm')]: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '10px',
    },
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 600,
  minHeight: '48px',
  '&.Mui-selected': {
    color: theme.palette.primary.main,
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 'auto',
    padding: '6px 12px',
    fontSize: '0.75rem',
  },
}));

const RatingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(1.5),
  borderRadius: '12px',
  backgroundColor: alpha(theme.palette.primary.main, 0.05),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  marginBottom: theme.spacing(2),
}));

const SectionTitle = ({ icon, title }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, mt: 3 }}>
    {icon}
    <Typography variant="h6" sx={{ ml: 1, fontWeight: 600 }}>
      {title}
    </Typography>
  </Box>
);

export default function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [jobData, setJobData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    description: '',
    applyLink: '',
    about: '',
    rating: 0,
    type: '',
    responsibilities: '',
    education: '',
    applyInstructions: '',
    postedDate: new Date(),
    aiSuggestion: '',
    skills: [],
    newSkill: '',
    ambienceBoxRating: 0,
    glassdoorRating: 0,
    experience: ''
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const API = process.env.REACT_APP_API_BASE_URL;
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${API}/jobs/${id}`);
        setJobData({
          ...res.data,
          postedDate: new Date(res.data.postedDate),
          skills: res.data.skills || [],
          rating: res.data.rating || 0,
          ambienceBoxRating: res.data.ambienceBoxRating || 0,
          glassdoorRating: res.data.glassdoorRating || 0
        });
      } catch (err) {
        setError('Failed to load job details');
      } finally {
        setIsLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleDateChange = (date) => {
    setJobData({ ...jobData, postedDate: date });
  };

  const handleRatingChange = (name, value) => {
    setJobData({ ...jobData, [name]: value });
  };

  const handleAddSkill = () => {
    if (jobData.newSkill.trim() && !jobData.skills.includes(jobData.newSkill.trim())) {
      setJobData({
        ...jobData,
        skills: [...jobData.skills, jobData.newSkill.trim()],
        newSkill: ''
      });
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setJobData({
      ...jobData,
      skills: jobData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await axios.put(`${API}/jobs/${id}`, {
        ...jobData,
        postedDate: jobData.postedDate.toISOString()
      });
      setSuccess(true);
      setTimeout(() => navigate('/admin/manage-jobs'), 1500);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to update job');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="md" sx={{ pt: { xs: 3, md: 6 }, pb: 6 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GradientPaper>
            {/* Decorative elements */}
            <Box sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 120,
              height: 120,
              background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 70%)`,
              borderRadius: '50%',
              transform: 'translate(30%, -30%)',
              [theme.breakpoints.down('sm')]: {
                width: 80,
                height: 80,
              },
            }} />
            <Box sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: 100,
              height: 100,
              background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.08)} 0%, transparent 70%)`,
              borderRadius: '50%',
              transform: 'translate(-30%, 30%)',
              [theme.breakpoints.down('sm')]: {
                width: 60,
                height: 60,
              },
            }} />

            {/* Header */}
            <Box display="flex" flexDirection="column" alignItems="center" mb={isMobile ? 2 : 4}>
              <Avatar sx={{
                bgcolor: 'secondary.main',
                width: isMobile ? 56 : 72,
                height: isMobile ? 56 : 72,
                mb: 2,
                boxShadow: `0 4px 20px ${alpha(theme.palette.secondary.main, 0.3)}`,
              }}>
                <EditIcon fontSize={isMobile ? "medium" : "large"} />
              </Avatar>
              <Typography variant={isMobile ? "h5" : "h4"} fontWeight={800} color="secondary" align="center">
                Edit Job Post
              </Typography>
              <Typography variant={isMobile ? "body2" : "subtitle1"} color="text.secondary" align="center" sx={{ maxWidth: 600 }}>
                Update the job details below
              </Typography>
            </Box>

            {/* Alerts */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
                  Job updated successfully! Redirecting...
                </Alert>
              </motion.div>
            )}

            {!isLoading && (
              <>
                {/* Form Tabs */}
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  variant={isMobile ? "scrollable" : "standard"}
                  scrollButtons={isMobile ? "auto" : false}
                  allowScrollButtonsMobile
                  sx={{ mb: 3 }}
                >
                  <StyledTab label="Basic Info" />
                  <StyledTab label="Details" />
                  <StyledTab label="Additional" />
                </Tabs>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                  {tabValue === 0 && (
                    <Grid container spacing={isMobile ? 2 : 3}>
                      {[
                        { label: 'Job Title', name: 'title', icon: <WorkOutlineIcon color="primary" /> },
                        { label: 'Company', name: 'company', icon: <BusinessIcon color="primary" /> },
                        { label: 'Location', name: 'location', icon: <LocationOnIcon color="primary" /> },
                        { label: 'Salary', name: 'salary', icon: <AttachMoneyIcon color="primary" /> },
                        { label: 'Job Type', name: 'type', icon: <CategoryIcon color="primary" /> },
                        { label: 'Experience', name: 'experience', icon: <WorkIcon color="primary" /> },
                      ].map((field, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <IconTextField
                            label={field.label}
                            name={field.name}
                            value={jobData[field.name]}
                            onChange={handleChange}
                            fullWidth
                            required={['title', 'company', 'location'].includes(field.name)}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  {field.icon}
                                </InputAdornment>
                              ),
                            }}
                            size={isMobile ? 'small' : 'medium'}
                          />
                        </Grid>
                      ))}
                      <Grid item xs={12} sm={6}>
                        <DatePicker
                          label="Posted Date"
                          value={jobData.postedDate}
                          onChange={handleDateChange}
                          renderInput={(params) => (
                            <IconTextField
                              {...params}
                              fullWidth
                              InputProps={{
                                ...params.InputProps,
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <DateRangeIcon color="primary" />
                                  </InputAdornment>
                                ),
                              }}
                              size={isMobile ? 'small' : 'medium'}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  )}

                  {tabValue === 1 && (
                    <Grid container spacing={isMobile ? 2 : 3}>
                      {[
                        { label: 'Job Description', name: 'description', icon: <DescriptionIcon color="primary" />, multiline: true, rows: isMobile ? 4 : 6 },
                        { label: 'Responsibilities', name: 'responsibilities', icon: <DescriptionIcon color="primary" />, multiline: true, rows: isMobile ? 4 : 6 },
                        { label: 'Education & Skills', name: 'education', icon: <SchoolIcon color="primary" />, multiline: true, rows: isMobile ? 3 : 4 },
                        { label: 'How to Apply', name: 'applyInstructions', icon: <InfoIcon color="primary" />, multiline: true, rows: isMobile ? 3 : 4 },
                      ].map((field, index) => (
                        <Grid item xs={12} key={index}>
                          <IconTextField
                            label={field.label}
                            name={field.name}
                            value={jobData[field.name]}
                            onChange={handleChange}
                            fullWidth
                            required={field.name === 'description'}
                            multiline={field.multiline}
                            rows={field.rows}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  {field.icon}
                                </InputAdornment>
                              ),
                            }}
                            size={isMobile ? 'small' : 'medium'}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  )}

                  {tabValue === 2 && (
                    <Grid container spacing={isMobile ? 2 : 3}>
                      {[
                        { label: 'About Company', name: 'about', icon: <BusinessIcon color="primary" />, multiline: true, rows: isMobile ? 3 : 4 },
                        { label: 'Apply Link', name: 'applyLink', icon: <LinkIcon color="primary" /> },
                        { label: 'AI Suggestions', name: 'aiSuggestion', icon: <SmartToyIcon color="primary" />, multiline: true, rows: isMobile ? 3 : 4 },
                      ].map((field, index) => (
                        <Grid item xs={12} key={index}>
                          <IconTextField
                            label={field.label}
                            name={field.name}
                            value={jobData[field.name]}
                            onChange={handleChange}
                            fullWidth
                            multiline={field.multiline}
                            rows={field.rows}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  {field.icon}
                                </InputAdornment>
                              ),
                            }}
                            size={isMobile ? 'small' : 'medium'}
                          />
                        </Grid>
                      ))}

                      {/* Ratings Section */}
                      <Grid item xs={12}>
                        <SectionTitle icon={<StarRateIcon color="primary" />} title="Company Ratings" />
                        <RatingContainer>
                          <StarRateIcon color="primary" />
                          <Typography variant="body1" sx={{ mr: 1 }}>Company Rating:</Typography>
                          <Rating
                            name="rating"
                            value={jobData.rating}
                            onChange={(event, newValue) => handleRatingChange('rating', newValue)}
                            precision={0.5}
                            icon={<StarRateIcon fontSize="inherit" color="primary" />}
                            emptyIcon={<StarBorderIcon fontSize="inherit" />}
                          />
                        </RatingContainer>
                        
                        <RatingContainer>
                          <StarRateIcon color="primary" />
                          <Typography variant="body1" sx={{ mr: 1 }}>AmbitionBox Rating:</Typography>
                          <Rating
                            name="ambienceBoxRating"
                            value={jobData.ambienceBoxRating}
                            onChange={(event, newValue) => handleRatingChange('ambienceBoxRating', newValue)}
                            precision={0.5}
                            icon={<StarRateIcon fontSize="inherit" color="primary" />}
                            emptyIcon={<StarBorderIcon fontSize="inherit" />}
                          />
                        </RatingContainer>
                        
                        <RatingContainer>
                          <StarRateIcon color="primary" />
                          <Typography variant="body1" sx={{ mr: 1 }}>Glassdoor Rating:</Typography>
                          <Rating
                            name="glassdoorRating"
                            value={jobData.glassdoorRating}
                            onChange={(event, newValue) => handleRatingChange('glassdoorRating', newValue)}
                            precision={0.5}
                            icon={<StarRateIcon fontSize="inherit" color="primary" />}
                            emptyIcon={<StarBorderIcon fontSize="inherit" />}
                          />
                        </RatingContainer>
                      </Grid>

                      {/* Skills Section */}
                      <Grid item xs={12}>
                        <SectionTitle icon={<SchoolIcon color="primary" />} title="Required Skills" />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                          <IconTextField
                            label="Add Skill"
                            name="newSkill"
                            value={jobData.newSkill}
                            onChange={handleChange}
                            fullWidth
                            size={isMobile ? 'small' : 'medium'}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <AddCircleOutlineIcon color="primary" />
                                </InputAdornment>
                              ),
                            }}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                          />
                          <Button 
                            variant="contained" 
                            onClick={handleAddSkill}
                            sx={{ 
                              minWidth: 'auto',
                              height: isMobile ? '40px' : '48px',
                              borderRadius: '12px'
                            }}
                          >
                            Add
                          </Button>
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {jobData.skills.map((skill, index) => (
                            <Chip
                              key={index}
                              label={skill}
                              onDelete={() => handleRemoveSkill(skill)}
                              sx={{
                                borderRadius: '8px',
                                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                '& .MuiChip-deleteIcon': {
                                  color: theme.palette.primary.main,
                                },
                              }}
                            />
                          ))}
                        </Box>
                      </Grid>
                    </Grid>
                  )}

                  <Divider sx={{ my: 3 }} />

                  <Grid item xs={12}>
                    <Box display="flex" justifyContent="center" gap={2}>
                      <Button
                        variant="outlined"
                        onClick={() => navigate('/admin/manage-jobs')}
                        sx={{
                          borderRadius: '12px',
                          padding: theme.spacing(1.5, 4),
                          [theme.breakpoints.down('sm')]: {
                            padding: theme.spacing(1, 3),
                            width: '100%',
                          },
                        }}
                      >
                        Cancel
                      </Button>
                      <FloatingButton
                        type="submit"
                        disabled={isSubmitting || success}
                        startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
                        sx={{
                          minWidth: isMobile ? '100%' : '200px',
                        }}
                      >
                        {isSubmitting ? 'Updating...' : success ? 'Updated!' : 'Update Job'}
                      </FloatingButton>
                    </Box>
                  </Grid>
                </form>
              </>
            )}
          </GradientPaper>
        </motion.div>
      </Container>
    </LocalizationProvider>
  );
}