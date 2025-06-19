import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
  IconButton,
  Drawer,
  useMediaQuery,
  Typography,
  Tooltip,
  styled,
  alpha
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  WorkOutline as JobsIcon,
  AddCircleOutline as AddJobIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon
} from '@mui/icons-material';
import { indigo } from '@mui/material/colors';
import { useAuth } from '../components/AuthContext';

const drawerWidth = 240;
const collapsedWidth = 72;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.paper,
    borderRight: 'none',
    boxShadow: theme.shadows[3],
    position: 'relative',
    height: 'calc(100vh - 64px)',
    top: '64px',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    [theme.breakpoints.down('md')]: {
      position: 'fixed',
      zIndex: 1100,
      height: 'calc(100vh - 64px)',
      top: '64px',
    },
  },
  '& .MuiDrawer-paperAnchorDockedLeft': {
    borderRight: 'none',
  },
}));

const CollapsedDrawer = styled(Drawer)(({ theme }) => ({
  width: collapsedWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: collapsedWidth,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.paper,
    borderRight: 'none',
    boxShadow: theme.shadows[3],
    position: 'relative',
    height: 'calc(100vh - 64px)',
    top: '64px',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    [theme.breakpoints.down('md')]: {
      position: 'fixed',
      zIndex: 1100,
      height: 'calc(100vh - 64px)',
      top: '64px',
    },
  },
}));

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
  { text: 'Add Job', icon: <AddJobIcon />, path: '/admin/add-job' },
  { text: 'Manage Jobs', icon: <JobsIcon />, path: '/admin/manage-jobs' },
];

export default function Sidebar() {
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width: 900px)');
  const [open, setOpen] = useState(!isMobile);
  const [activeItem, setActiveItem] = useState(location.pathname);
  const { logout } = useAuth();

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location]);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      {open ? (
        <StyledDrawer variant="permanent" open={open}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 2,
              height: 64,
            }}
          >
            <Typography variant="h6" noWrap sx={{ fontWeight: 700, color: indigo[500] }}>
              JobPortal Admin
            </Typography>
            <IconButton onClick={handleDrawerToggle} size="small">
              <ChevronLeftIcon />
            </IconButton>
          </Box>

          <Divider sx={{ borderColor: 'divider' }} />

          <List sx={{ px: 1 }}>
            {menuItems.map((item) => (
              <Tooltip title={!open ? item.text : ''} placement="right" key={item.text}>
                <ListItem
                  button
                  component={Link}
                  to={item.path}
                  selected={activeItem === item.path}
                  sx={{
                    borderRadius: 2,
                    mb: 0.5,
                    '&.Mui-selected': {
                      backgroundColor: alpha(indigo[500], 0.1),
                      '&:hover': {
                        backgroundColor: alpha(indigo[500], 0.15),
                      },
                    },
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <ListItemIcon sx={{ 
                    minWidth: 40, 
                    color: activeItem === item.path ? indigo[500] : 'inherit' 
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    primaryTypographyProps={{
                      fontWeight: activeItem === item.path ? 600 : 'normal',
                      color: activeItem === item.path ? indigo[500] : 'text.primary'
                    }} 
                  />
                </ListItem>
              </Tooltip>
            ))}
          </List>

          <Box sx={{ mt: 'auto', p: 2 }}>
            <Divider sx={{ borderColor: 'divider', mb: 2 }} />
            <Tooltip title={!open ? 'Settings' : ''} placement="right">
              <ListItem
                button
                sx={{
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItem>
            </Tooltip>
            <Tooltip title={!open ? 'Logout' : ''} placement="right">
              <ListItem
                button
                onClick={logout}
                sx={{
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </Tooltip>
          </Box>
        </StyledDrawer>
      ) : (
        <CollapsedDrawer variant="permanent" open={open}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
              height: 64,
            }}
          >
            <IconButton onClick={handleDrawerToggle} size="small">
              <ChevronRightIcon />
            </IconButton>
          </Box>

          <Divider sx={{ borderColor: 'divider' }} />

          <List sx={{ px: 1 }}>
            {menuItems.map((item) => (
              <Tooltip title={item.text} placement="right" key={item.text}>
                <ListItem
                  button
                  component={Link}
                  to={item.path}
                  selected={activeItem === item.path}
                  sx={{
                    borderRadius: 2,
                    mb: 0.5,
                    justifyContent: 'center',
                    '&.Mui-selected': {
                      backgroundColor: alpha(indigo[500], 0.1),
                      '&:hover': {
                        backgroundColor: alpha(indigo[500], 0.15),
                      },
                    },
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <ListItemIcon sx={{ 
                    minWidth: 0,
                    color: activeItem === item.path ? indigo[500] : 'inherit',
                    justifyContent: 'center'
                  }}>
                    {item.icon}
                  </ListItemIcon>
                </ListItem>
              </Tooltip>
            ))}
          </List>

          <Box sx={{ mt: 'auto', p: 2 }}>
            <Divider sx={{ borderColor: 'divider', mb: 2 }} />
            <Tooltip title="Settings" placement="right">
              <ListItem
                button
                sx={{
                  borderRadius: 2,
                  justifyContent: 'center',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center' }}>
                  <SettingsIcon />
                </ListItemIcon>
              </ListItem>
            </Tooltip>
            <Tooltip title="Logout" placement="right">
              <ListItem
                button
                onClick={logout}
                sx={{
                  borderRadius: 2,
                  justifyContent: 'center',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center' }}>
                  <LogoutIcon />
                </ListItemIcon>
              </ListItem>
            </Tooltip>
          </Box>
        </CollapsedDrawer>
      )}
    </>
  );
}