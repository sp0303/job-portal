// AdminDashboard.jsx
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { Box, useTheme, useMediaQuery } from '@mui/material';

export default function AdminDashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navbar would go here */}
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar />
        <Box 
          component="main"
          sx={{ 
            flexGrow: 1,
            p: 3,
            ml: { xs: 0, md: '72px' }, // Adjust based on collapsed width
            width: { xs: '100%', md: 'calc(100% - 72px)' },
            transition: theme.transitions.create('margin', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}