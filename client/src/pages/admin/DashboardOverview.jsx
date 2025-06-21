import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Box,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Stack,
  Skeleton
} from '@mui/material';
import { 
  WorkOutline as JobsIcon, 
  TrendingUp as TrendIcon, 
  DateRange as CalendarIcon,
  BarChart as StatsIcon
} from '@mui/icons-material';
import { indigo, teal, purple } from '@mui/material/colors';
import { DataGrid } from '@mui/x-data-grid';
const API = process.env.REACT_APP_API_BASE_URL;
// Date formatting utility
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const StatCard = ({ icon: Icon, label, value, color }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 3,
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        background: `linear-gradient(135deg, ${color[50]} 0%, ${color[100]} 100%)`,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        },
      }}
    >
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              backgroundColor: color[500],
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon fontSize="medium" />
          </Box>
          <Box>
            <Typography 
              variant="subtitle2" 
              color="text.secondary" 
              sx={{ fontWeight: 500 }}
            >
              {label}
            </Typography>
            <Typography 
              variant={isMobile ? 'h5' : 'h4'} 
              fontWeight={700}
              color={color[800]}
            >
              {value || <Skeleton width={60} />}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

const RecentJobsTable = ({ jobs }) => {
  const columns = [
    { 
      field: 'title', 
      headerName: 'Job Title', 
      flex: 2,
      renderCell: (params) => (
        <Typography fontWeight={500}>{params.value}</Typography>
      )
    },
    { 
      field: 'company', 
      headerName: 'Company', 
      flex: 1 
    },
    { 
      field: 'postedAt', 
      headerName: 'Posted', 
      flex: 1,
      valueFormatter: (params) => formatDate(params.value)
    },
  ];

  return (
    <Box sx={{ height: 400, width: '100%', mt: 4 }}>
      <Typography variant="h6" mb={2} fontWeight={600}>
        Recent Job Postings
      </Typography>
      <DataGrid
        rows={jobs.slice(0, 10)}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        sx={{
          borderRadius: 3,
          border: 'none',
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'rgba(244, 246, 248, 0.8)',
            borderRadius: 3,
          },
        }}
      />
    </Box>
  );
};

export default function DashboardOverview() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [stats, setStats] = useState({
    totalJobs: null,
    jobsThisMonth: null,
    topTitles: null,
    recentJobs: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API}/jobs`);
        const jobs = res.data;
        
        const now = new Date();
        const thisMonth = jobs.filter(job => {
          const posted = job.postedAt ? new Date(job.postedAt) : null;
          return posted && posted.getMonth() === now.getMonth() && posted.getFullYear() === now.getFullYear();
        });

        const titleCount = {};
        jobs.forEach(job => {
          titleCount[job.title] = (titleCount[job.title] || 0) + 1;
        });

        const sortedTitles = Object.entries(titleCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([title]) => title);

        setStats({
          totalJobs: jobs.length,
          jobsThisMonth: thisMonth.length,
          topTitles: sortedTitles.join(', '),
          recentJobs: jobs
            .sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt))
            .slice(0, 10)
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ p: isMobile ? 2 : 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
          Dashboard Overview
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back! Here's what's happening with your job portal.
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            icon={JobsIcon} 
            label="Total Jobs" 
            value={stats.totalJobs} 
            color={indigo}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            icon={CalendarIcon} 
            label="This Month" 
            value={stats.jobsThisMonth} 
            color={teal}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            icon={TrendIcon} 
            label="Trending Titles" 
            value={stats.topTitles} 
            color={purple}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            icon={StatsIcon} 
            label="Active Listings" 
            value={stats.totalJobs} 
            color={indigo}
          />
        </Grid>
      </Grid>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <RecentJobsTable jobs={stats.recentJobs} />
      )}
    </Box>
  );
}