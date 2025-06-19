import { Card, CardContent, Typography, Button, Box, Chip, Stack, Divider, useTheme, Link } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WorkIcon from '@mui/icons-material/Work';
import { useState } from 'react';

export default function JobCard({ job, onClick }) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  
  // Format salary display
  const formatSalary = (salary) => {
    if (!salary || salary === 'Salary not specified') return 'Salary not disclosed';
    if (typeof salary === 'number') return `$${salary.toLocaleString()}`;
    return salary;
  };

  // Truncate description to 3 lines (approx 150 characters)
  const truncateDescription = (text) => {
    if (!text) return 'No job description provided';
    const maxLength = 150;
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

  const handleReadMore = (e) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <Card 
      onClick={onClick}
      sx={{ 
        width: 320,
        minHeight: 300,
        display: 'flex',
        flexDirection: 'column',
        background: theme.palette.background.paper,
        borderRadius: 2,
        boxShadow: theme.shadows[1],
        border: `1px solid ${theme.palette.divider}`,
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: theme.shadows[4],
        }
      }}
    >
      <CardContent sx={{ p: 3, flexGrow: 1 }}>
        {/* Job Title - Always visible */}
        <Typography 
          variant="h6" 
          component="h2"
          sx={{ 
            fontWeight: 700,
            color: theme.palette.text.primary,
            mb: 1,
            minHeight: '2.5em' // Ensure space even if empty
          }}
        >
          {job?.title || 'Job Title Not Specified'}
        </Typography>
        
        {/* Company - Always visible */}
        <Typography 
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            color: theme.palette.text.secondary,
            mb: 2,
            minHeight: '1.5em' // Ensure space even if empty
          }}
        >
          {job?.company || 'Company Not Specified'}
        </Typography>

        {/* Job Details Chips - Always visible */}
        <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
          <Chip 
            icon={<LocationOnIcon fontSize="small" />}
            label={job?.location || 'Location not specified'} 
            size="small"
            sx={{ 
              borderRadius: 1,
              backgroundColor: theme.palette.action.selected,
            }}
          />
          <Chip 
            icon={<AttachMoneyIcon fontSize="small" />}
            label={formatSalary(job?.salary)} 
            size="small"
            sx={{ 
              borderRadius: 1,
              backgroundColor: theme.palette.action.selected,
            }}
          />
          <Chip 
            icon={<WorkIcon fontSize="small" />}
            label={job?.type || 'Full-time'} 
            size="small"
            sx={{ 
              borderRadius: 1,
              backgroundColor: theme.palette.action.selected,
            }}
          />
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* Job Description - Truncated with Read More link */}
        <Box sx={{ mb: 3 }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: theme.palette.text.secondary,
              mb: 1,
              fontWeight: 500
            }}
          >
            Job Description
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: theme.palette.text.primary,
              whiteSpace: 'pre-line',
              minHeight: '3em', // Ensure space even if empty
              display: '-webkit-box',
              WebkitLineClamp: expanded ? 'unset' : 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {job?.description || 'No job description provided'}
          </Typography>
          {job?.description && job.description.length > 150 && (
            <Link
              component="button"
              variant="body2"
              onClick={handleReadMore}
              sx={{
                mt: 1,
                fontWeight: 600,
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              Read more
            </Link>
          )}
        </Box>

        {/* Requirements - Conditionally visible */}
        {job?.requirements && (
          <Box sx={{ mb: 3 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: theme.palette.text.secondary,
                mb: 1,
                fontWeight: 500
              }}
            >
              Requirements
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: theme.palette.text.primary,
                whiteSpace: 'pre-line',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {job.requirements}
            </Typography>
            <Link
              component="button"
              variant="body2"
              onClick={handleReadMore}
              sx={{
                mt: 1,
                fontWeight: 600,
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              Read more
            </Link>
          </Box>
        )}
      </CardContent>

      {/* Apply Button - Always visible at bottom */}
      <Box sx={{ p: 2, pt: 0 }}>
        <Button 
          fullWidth
          variant="contained"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          sx={{
            fontWeight: 600,
            py: 1.5,
            borderRadius: 1
          }}
        >
          APPLY NOW
        </Button>
      </Box>
    </Card>
  );
}