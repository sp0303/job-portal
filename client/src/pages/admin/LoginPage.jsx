import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/AuthContext';
import { Button, Container, Typography, Box, Paper } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

export default function LoginPage() {
  const { currentUser, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) navigate('/admin');
  }, [currentUser, navigate]);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 4 }}>
        <Typography variant="h4" gutterBottom>
          Admin Login
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Sign in with your Google account to access the Admin Dashboard.
        </Typography>
        <Box>
          <Button
            variant="contained"
            startIcon={<GoogleIcon />}
            onClick={handleLogin}
            sx={{ textTransform: 'none', fontWeight: 'bold' }}
          >
            Sign in with Google
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
