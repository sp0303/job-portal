import { Typography, Container, Box, useTheme, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

export default function Home() {
  const theme = useTheme();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ pt: 15, pb: 10 }}>
      <Box 
        ref={ref}
        sx={{ 
          my: 4,
          background: theme.palette.mode === 'dark' 
            ? 'rgba(30, 30, 40, 0.8)'
            : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: 4,
          p: 4,
          boxShadow: theme.shadows[10],
          border: `1px solid ${theme.palette.divider}`
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <Typography 
            variant="h2" 
            gutterBottom 
            sx={{
              fontWeight: 700,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(45deg, #64B5F6 30%, #BA68C8 90%)'
                : 'linear-gradient(45deg, #1976D2 30%, #9C27B0 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3
            }}
          >
            Welcome to Vidyavantu Jobs
          </Typography>
          <Typography variant="h5" paragraph sx={{ color: theme.palette.text.primary }}>
            Connecting talent with opportunity in the digital age
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Box sx={{ mt: 4 }}>
            <Typography variant="body1" paragraph sx={{ color: theme.palette.text.secondary }}>
              Discover your next career move with our cutting-edge job platform.
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: theme.palette.text.secondary }}>
              We combine advanced technology with human insight to match you with
              the perfect opportunity.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/jobs')}
              sx={{
                px: 4,
                fontWeight: 600
              }}
            >
              Browse Jobs
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/employers')}
              sx={{
                px: 4,
                fontWeight: 600
              }}
            >
              For Employers
            </Button>
          </Box>
        </motion.div>
      </Box>
    </Container>
  );
}