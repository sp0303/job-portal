import React from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  Box, 
  Grid,
  Button,
  Chip,
  useTheme,
  useMediaQuery,
  styled
} from '@mui/material';
import { motion } from 'framer-motion';
import CorporateBuilding from '../assets/corporate-building.svg'; // Add this SVG
import RecruitingDashboard from '../assets/recruiting-dashboard.svg'; // Add this SVG

const FeatureHighlight = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  background: theme.palette.mode === 'dark' 
    ? 'rgba(255, 255, 255, 0.05)' 
    : 'rgba(25, 118, 210, 0.05)',
  marginBottom: theme.spacing(2)
}));

const features = [
  {
    icon: '🚀',
    title: 'AI-Powered Matching',
    description: 'Our algorithm surfaces top candidates matching your exact requirements'
  },
  {
    icon: '📊',
    title: 'Talent Analytics',
    description: 'Real-time data on candidate pipelines and hiring metrics'
  },
  {
    icon: '🔍',
    title: 'Advanced Filters',
    description: 'Screen candidates by skills, experience, and cultural fit'
  },
  {
    icon: '🤝',
    title: 'Collaboration Tools',
    description: 'Share candidate profiles and get team feedback in one place'
  }
];

function Employers() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography 
              variant="h3" 
              component="h1"
              sx={{
                fontWeight: 800,
                mb: 3,
                lineHeight: 1.2,
                color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.dark
              }}
            >
              Corporate <span style={{ color: theme.palette.secondary.main }}>Recruiting</span> Suite
            </Typography>
            
            <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary' }}>
              Transform your hiring process with enterprise-grade recruitment tools
            </Typography>
            
            <Box sx={{ mb: 4 }}>
              {features.map((feature, index) => (
                <FeatureHighlight key={index}>
                  <Box sx={{ fontSize: '24px' }}>{feature.icon}</Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>{feature.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{feature.description}</Typography>
                  </Box>
                </FeatureHighlight>
              ))}
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button 
                variant="contained" 
                size="large"
                sx={{
                  borderRadius: '8px',
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
                }}
              >
                Request Early Access
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                sx={{
                  borderRadius: '8px',
                  px: 4,
                  py: 1.5,
                  fontWeight: 600
                }}
              >
                See Pricing
              </Button>
            </Box>
            
            <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip label="ATS Integration" size="small" />
              <Chip label="GDPR Compliant" size="small" />
              <Chip label="Bulk Hiring" size="small" />
            </Box>
          </motion.div>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ height: '100%' }}
          >
            <Paper
              elevation={6}
              sx={{
                height: '100%',
                borderRadius: '16px',
                overflow: 'hidden',
                background: theme.palette.mode === 'dark' 
                  ? 'linear-gradient(145deg, #121212 0%, #1e1e1e 100%)' 
                  : 'linear-gradient(145deg, #f8faff 0%, #ffffff 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2
              }}
            >
              <Box 
                component="img" 
                src={RecruitingDashboard} 
                alt="Recruiting Dashboard" 
                sx={{ 
                  width: '100%', 
                  height: 'auto',
                  maxHeight: '500px',
                  objectFit: 'contain',
                  filter: theme.palette.mode === 'dark' ? 'brightness(0.9)' : 'none'
                }} 
              />
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
      
      {/* Enterprise Features Section */}
      <Box sx={{ mt: 10 }}>
        <Typography variant="h4" align="center" sx={{ mb: 2, fontWeight: 700 }}>
          Built for <span style={{ color: theme.palette.secondary.main }}>Enterprise</span> Needs
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" sx={{ maxWidth: '700px', mx: 'auto', mb: 5 }}>
          Our platform scales with your hiring needs, from individual roles to large-scale recruitment drives
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%', borderRadius: '12px' }}>
              <Typography variant="h6" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  background: 'rgba(25, 118, 210, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  🔄
                </Box>
                Automated Workflows
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Streamline your hiring process with customizable automation for screening, scheduling, and communications.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%', borderRadius: '12px' }}>
              <Typography variant="h6" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  background: 'rgba(76, 175, 80, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  🌐
                </Box>
                Global Hiring
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Source candidates worldwide with compliance tools for international hiring and localization support.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%', borderRadius: '12px' }}>
              <Typography variant="h6" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  background: 'rgba(156, 39, 176, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  📈
                </Box>
                Talent Pipeline
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Build and maintain relationships with potential candidates for future opportunities.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Employers;