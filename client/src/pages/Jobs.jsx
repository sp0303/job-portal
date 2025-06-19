import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Container,
  Box, 
  Grid, 
  TextField, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Select,
  Typography,
  Paper,
  useTheme,
  Pagination,
  Divider,
  Chip,
  useMediaQuery,
  IconButton,
  InputAdornment
} from '@mui/material';
import { motion } from 'framer-motion';
import JobCard from '../components/JobCard';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import TuneIcon from '@mui/icons-material/Tune';

export default function Jobs() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [page, setPage] = useState(1);
  const [jobsPerPage] = useState(isMobile ? 4 : 8);
  const [showFilters, setShowFilters] = useState(false);
  const [uniqueLocations, setUniqueLocations] = useState([]);
  const navigate = useNavigate();

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    axios.get('/api/jobs')
      .then(res => {
        // Sort jobs by postedAt in descending order (newest first)
        const sortedJobs = res.data.sort((a, b) => {
          const dateA = a.postedAt ? new Date(a.postedAt).getTime() : 0;
          const dateB = b.postedAt ? new Date(b.postedAt).getTime() : 0;
          return dateB - dateA;
        });
        
        setJobs(sortedJobs);
        setFilteredJobs(sortedJobs);
        
        // Extract unique locations from jobs data
        const locations = [...new Set(sortedJobs
          .map(job => job.location)
          .filter(location => location && location.trim() !== '')
        )].sort();
        
        setUniqueLocations(locations);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const results = jobs.filter(job => {
      const matchesSearch = searchTerm ? 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills?.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) : true;
      
      const matchesLocation = locationFilter ?
        job.location?.toLowerCase().includes(locationFilter.toLowerCase()) : true;
      
      const matchesExperience = experienceFilter ?
        job.experienceLevel?.toLowerCase().includes(experienceFilter.toLowerCase()) : true;
      
      return matchesSearch && matchesLocation && matchesExperience;
    });
    
    // Apply sorting
    const sortedResults = [...results].sort((a, b) => {
      const dateA = a.postedAt ? new Date(a.postedAt).getTime() : 0;
      const dateB = b.postedAt ? new Date(b.postedAt).getTime() : 0;
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
    
    setFilteredJobs(sortedResults);
    setPage(1); // Reset to first page when filters change
  }, [searchTerm, locationFilter, experienceFilter, jobs, sortOrder]);

  // Pagination logic
  const indexOfLastJob = page * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const truncateDescription = (text, limit = 100) => {
    if (!text) return 'No description available';
    if (text.length <= limit) return text;
    return `${text.substring(0, limit)}...`;
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setLocationFilter('');
    setExperienceFilter('');
  };

  const hasFilters = searchTerm || locationFilter || experienceFilter;

  return (
    <Container maxWidth="xl" sx={{ pt: { xs: 8, sm: 10 }, pb: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          sx={{
            p: { xs: 2, sm: 4 },
            mb: 4,
            borderRadius: 3,
            background: theme.palette.mode === 'dark' ? 
              'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)' : 
              'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)',
            boxShadow: theme.shadows[4],
            border: theme.palette.mode === 'dark' ? '1px solid #333' : '1px solid #e0e0e0'
          }}
        >
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              background: theme.palette.mode === 'dark' ? 
                'linear-gradient(45deg, #64b5f6, #1976d2)' : 
                'linear-gradient(45deg, #1976d2, #0d47a1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}
          >
            Find Your Dream Job
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <TextField
              label="Search Jobs, Companies, or Skills"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
            
            {isMobile && (
              <IconButton 
                onClick={() => setShowFilters(!showFilters)}
                sx={{ 
                  bgcolor: theme.palette.primary.main,
                  color: 'white',
                  '&:hover': {
                    bgcolor: theme.palette.primary.dark
                  }
                }}
              >
                <TuneIcon />
              </IconButton>
            )}
          </Box>
          
          {(showFilters || !isMobile) && (
            <Box 
              sx={{ 
                display: 'flex', 
                gap: 2, 
                mb: 2,
                flexDirection: isMobile ? 'column' : 'row'
              }}
            >
              <FormControl fullWidth size={isMobile ? 'small' : 'medium'}>
                <InputLabel>Location</InputLabel>
                <Select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  label="Location"
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="">All Locations</MenuItem>
                  {uniqueLocations.map((location) => (
                    <MenuItem key={location} value={location}>
                      {location}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <FormControl fullWidth size={isMobile ? 'small' : 'medium'}>
                <InputLabel>Experience Level</InputLabel>
                <Select
                  value={experienceFilter}
                  onChange={(e) => setExperienceFilter(e.target.value)}
                  label="Experience"
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="">All Levels</MenuItem>
                  <MenuItem value="Intern">Intern</MenuItem>
                  <MenuItem value="Entry">Entry Level</MenuItem>
                  <MenuItem value="Mid">Mid Level</MenuItem>
                  <MenuItem value="Senior">Senior</MenuItem>
                  <MenuItem value="Lead">Lead</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth size={isMobile ? 'small' : 'medium'}>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  label="Sort By"
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="newest">Newest First</MenuItem>
                  <MenuItem value="oldest">Oldest First</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
          
          {hasFilters && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Active filters:
              </Typography>
              {searchTerm && (
                <Chip 
                  label={`Search: ${searchTerm}`} 
                  onDelete={() => setSearchTerm('')}
                  size="small"
                />
              )}
              {locationFilter && (
                <Chip 
                  label={`Location: ${locationFilter}`} 
                  onDelete={() => setLocationFilter('')}
                  size="small"
                />
              )}
              {experienceFilter && (
                <Chip 
                  label={`Experience: ${experienceFilter}`} 
                  onDelete={() => setExperienceFilter('')}
                  size="small"
                />
              )}
              <Chip 
                label="Clear all" 
                onClick={clearFilters}
                size="small"
                variant="outlined"
                sx={{ ml: 1 }}
              />
            </Box>
          )}
        </Paper>
      </motion.div>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="body1" color="text.secondary">
          Showing {indexOfFirstJob + 1}-{Math.min(indexOfLastJob, filteredJobs.length)} of {filteredJobs.length} jobs
        </Typography>
        {filteredJobs.length > jobsPerPage && (
          <Pagination 
            count={totalPages} 
            page={page} 
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            sx={{ 
              '& .MuiPaginationItem-root': {
                color: theme.palette.mode === 'dark' ? '#fff' : 'inherit',
              }
            }}
          />
        )}
      </Box>
      
      {currentJobs.length > 0 ? (
        <>
          <Grid container spacing={3}>
            {currentJobs.map((job, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={job.id}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (index % jobsPerPage) * 0.05 }}
                  whileHover={{ y: -5 }}
                  style={{ height: '100%' }}
                >
                  <JobCard 
                    job={{
                      ...job,
                      description: truncateDescription(job.description),
                      postedAt: formatDate(job.postedAt) // Add formatted date
                    }} 
                    onClick={() => navigate(`/jobs/${job.id}`)}
                  />
                </motion.div>
              </Grid>
            ))}
          </Grid>
          
          {filteredJobs.length > jobsPerPage && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination 
                count={totalPages} 
                page={page} 
                onChange={handlePageChange}
                color="primary"
                size={isMobile ? 'small' : 'medium'}
                sx={{ 
                  '& .MuiPaginationItem-root': {
                    color: theme.palette.mode === 'dark' ? '#fff' : 'inherit',
                  }
                }}
              />
            </Box>
          )}
        </>
      ) : (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            No jobs found
          </Typography>
          <Typography color="text.secondary">
            Try adjusting your search filters or search term
          </Typography>
          {hasFilters && (
            <Box sx={{ mt: 2 }}>
              <Chip 
                label="Clear all filters" 
                onClick={clearFilters}
                color="primary"
                variant="outlined"
              />
            </Box>
          )}
        </Paper>
      )}
    </Container>
  );
}