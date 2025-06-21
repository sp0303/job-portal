import { Box, Typography, Link, Stack, IconButton, Divider, useTheme } from '@mui/material';
import { GitHub, LinkedIn, Twitter, Instagram, Favorite } from '@mui/icons-material';
import { motion } from 'framer-motion';

export default function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.85)' : '#f9f9f9',
        px: 2,
        py: 2,
        mt: 6,
        borderTop: '1px solid',
        borderColor: 'divider',
        width: '100%',
        backdropFilter: 'blur(8px)'
      }}
    >
      <Stack spacing={2}>
        {/* Logo and Social Icons */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
        >
          <motion.div whileHover={{ scale: 1.05 }}>
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(45deg, #64b5f6, #1976d2)'
                  : 'linear-gradient(45deg, #1976d2, #0d47a1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              VidyaVantu
            </Typography>
          </motion.div>

          <Stack direction="row" spacing={1}>
            <IconButton href="https://github.com" target="_blank" sx={{ color: 'text.secondary' }}>
              <GitHub fontSize="small" />
            </IconButton>
            <IconButton href="https://linkedin.com" target="_blank" sx={{ color: 'text.secondary' }}>
              <LinkedIn fontSize="small" />
            </IconButton>
            <IconButton href="https://twitter.com" target="_blank" sx={{ color: 'text.secondary' }}>
              <Twitter fontSize="small" />
            </IconButton>
            <IconButton href="https://instagram.com" target="_blank" sx={{ color: 'text.secondary' }}>
              <Instagram fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>

        {/*<Divider sx={{ borderColor: theme.palette.divider }} />

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Stack direction="row" spacing={2}>
            <Link href="/about" underline="hover" variant="body2" color="text.secondary">About</Link>
            <Link href="/features" underline="hover" variant="body2" color="text.secondary">Features</Link>
            <Link href="/pricing" underline="hover" variant="body2" color="text.secondary">Pricing</Link>
            <Link href="/contact" underline="hover" variant="body2" color="text.secondary">Contact</Link>
          </Stack>

          <Stack direction="row" spacing={2}>
            <Link href="/privacy" underline="hover" variant="body2" color="text.secondary">Privacy</Link>
            <Link href="/terms" underline="hover" variant="body2" color="text.secondary">Terms</Link>
          </Stack>
        </Stack>

        <Divider sx={{ borderColor: theme.palette.divider }} />*/}

        {/* Bottom Line */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="caption" color="text.secondary">
            © {new Date().getFullYear()} Connect, Inc. All rights reserved.
          </Typography>

          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Typography variant="caption" color="text.secondary">Made with</Typography>
            <Favorite
              fontSize="small"
              sx={{
                color: theme.palette.mode === 'dark' ? '#ff4081' : '#f50057',
                animation: 'pulse 1.5s infinite',
                '@keyframes pulse': {
                  '0%': { transform: 'scale(1)' },
                  '50%': { transform: 'scale(1.2)' },
                  '100%': { transform: 'scale(1)' }
                }
              }}
            />
            <Typography variant="caption" color="text.secondary">by Connect Team</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
