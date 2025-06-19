import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const MotionLink = motion(Link);

export default function Navbar({ mode, setMode }) {
  const toggleTheme = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background: 'rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(10px)',
        boxShadow: 'none',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component={motion.div}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          sx={{
            flexGrow: 1,
            fontWeight: 700,
            fontSize: '1.5rem',
            background: 'linear-gradient(45deg, #00DBDE 0%, #FC00FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          <Link to="/" style={{ textDecoration: 'none' }}>
            Vidyavantu Jobs
          </Link>
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Tooltip title="Toggle Theme">
            <IconButton onClick={toggleTheme} color="inherit">
              {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
          </Tooltip>

          <Button
            component={MotionLink}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variant="contained"
            sx={{
              background: 'linear-gradient(45deg, #00DBDE 0%, #FC00FF 100%)',
              borderRadius: 3,
              boxShadow: '0 3px 5px 2px rgba(0, 219, 222, .3)',
            }}
            to="/jobs"
          >
            Browse Jobs
          </Button>

          <Button
            component={MotionLink}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variant="contained"
            sx={{
              background: 'linear-gradient(45deg, #00DBDE 0%, #FC00FF 100%)',
              borderRadius: 3,
              boxShadow: '0 3px 5px 2px rgba(0, 219, 222, .3)',
            }}
            to="/government-jobs"
          >
            Government Jobs
          </Button>

          {/* <Button
            component={MotionLink}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variant="contained"
            sx={{
              background: 'linear-gradient(45deg, #00DBDE 0%, #FC00FF 100%)',
              borderRadius: 3,
              boxShadow: '0 3px 5px 2px rgba(0, 219, 222, .3)',
            }}
            to="/post-job"
          >
            Post a Job
          </Button> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
