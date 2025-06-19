import { Box, Typography, Container, Link, Stack } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.paper',
        py: 4,
        mt: 8,
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} JobGenie. All rights reserved.
          </Typography>

          <Stack direction="row" spacing={3}>
            <Link href="/privacy" underline="hover" color="text.secondary">
              Privacy
            </Link>
            <Link href="/terms" underline="hover" color="text.secondary">
              Terms
            </Link>
            <Link href="/contact" underline="hover" color="text.secondary">
              Contact
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
