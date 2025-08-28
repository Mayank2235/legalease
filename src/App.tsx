import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import NotFound from '@/pages/NotFound';
import Features from '@/pages/Features';
import Lawyers from '@/pages/Lawyers';
import About from '@/pages/About';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import ClientDashboard from '@/pages/dashboard/ClientDashboard';
import LawyerDashboard from '@/pages/dashboard/LawyerDashboard';
import DashboardLawyersPage from '@/pages/dashboard/LawyersPage';
import DashboardConsultationsPage from '@/pages/dashboard/ConsultationsPage';
import DashboardProfilePage from '@/pages/dashboard/ProfilePage';
import CasesPage from '@/pages/dashboard/CasesPage';

const App = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
      <Route path="/features" element={<Features />} />
      <Route path="/lawyers" element={<Lawyers />} />
      <Route path="/about" element={<About />} />

      {user && (
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={user.role === 'CLIENT' ? <ClientDashboard /> : <LawyerDashboard />} />
          <Route path="lawyers" element={<DashboardLawyersPage />} />
          <Route path="consultations" element={<DashboardConsultationsPage />} />
          <Route path="profile" element={<DashboardProfilePage />} />
          <Route path="cases" element={<CasesPage />} />
        </Route>
      )}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
