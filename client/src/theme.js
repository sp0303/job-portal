// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',    // Customize as needed
      light: '#63a4ff',
    },
    secondary: {
      main: '#9c27b0',
      light: '#d05ce3',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

export default theme;
