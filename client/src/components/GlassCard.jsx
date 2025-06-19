import { Box } from '@mui/material';

export default function GlassCard({ children }) {
  return (
// In GlassCard component
  <Box sx={{
    background: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(12px)',
    borderRadius: 4,
    p: 3,
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    mb: 3,
    width: '100%'
  }}>
  {children}
</Box>
  );
}