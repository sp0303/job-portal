import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Jobs from '../pages/Jobs';
import JobDetails from '../pages/JobDetails';
import PostJob from '../pages/PostJob';
import GovernmentJobs from '../pages/GovernmentJobs';
import Employers from '../pages/Employers';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AddJob from '../pages/admin/AddJob';
import ManageJobs from '../pages/admin/ManageJobs';
import EditJob from '../pages/admin/EditJob';
import DashboardOverview from '../pages/admin/DashboardOverview';
import LoginPage from '../pages/admin/LoginPage';

import PrivateRoute from '../components/PrivateRoute';

const AppRoutes = ({ jobs, fetchJobs, fetchJob, handlePostJob }) => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/jobs" element={<Jobs jobs={jobs} fetchJobs={fetchJobs} />} />
    <Route path="/jobs/:id" element={<JobDetails fetchJob={fetchJob} />} />
    {/* <Route path="/post-job" element={<PostJob handlePostJob={handlePostJob} />} /> */}
    <Route path="/government-jobs" element={<GovernmentJobs />} />
    <Route path="/employers" element={<Employers />} />

    <Route path="/login" element={<LoginPage />} />

    <Route
      path="/admin"
      element={
        <PrivateRoute>
          <AdminDashboard />
        </PrivateRoute>
      }
    >
      <Route path="add-job" element={<AddJob />} />
      <Route path="manage-jobs" element={<ManageJobs />} />
      <Route path="edit-job/:id" element={<EditJob />} />
      <Route index element={<DashboardOverview />} />
    </Route>
  </Routes>
);

export default AppRoutes;
