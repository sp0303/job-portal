import { Box, Typography, Button, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const theme = useTheme();

  return (
    <Box sx={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      px: 3,
      py: 10,
      background: `linear-gradient(to bottom, ${theme.palette.primary.main} 0%, ${theme.palette.background.default} 100%)`,
      color: theme.palette.mode === 'dark' ? '#fff' : '#fff',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url(/pattern.svg)',
        backgroundSize: '600px',
        opacity: 0.05,
        zIndex: 0
      }
    }}>
      <Box sx={{ position: 'relative', zIndex: 1, maxWidth: '800px' }}>
        <Typography variant="h2" component="h1" sx={{ 
          fontWeight: 700,
          mb: 3,
          fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' }
        }}>
          Welcome to Vidyavantu Jobs
        </Typography>
        
        <Typography variant="h5" component="h2" sx={{ 
          mb: 4,
          fontWeight: 400,
          fontSize: { xs: '1.2rem', sm: '1.5rem' }
        }}>
          Connecting talent with opportunity in the digital age
        </Typography>
        
        <Typography variant="body1" sx={{ 
          mb: 5,
          fontSize: '1.1rem',
          lineHeight: 1.6
        }}>
          Discover your next career move with our cutting-edge job platform.
          We combine advanced technology with human insight to match you with the perfect opportunity.
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center' }}>
          <Button 
            component={Link}
            to="/jobs"
            variant="contained"
            color="secondary"
            size="large"
            sx={{ px: 4, py: 1.5 }}
          >
            Browse Jobs
          </Button>
          <Button 
            component={Link}
            to="/employers"
            variant="outlined"
            color="inherit"
            size="large"
            sx={{ px: 4, py: 1.5, borderWidth: 2, '&:hover': { borderWidth: 2 } }}
          >
            For Employers
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection;