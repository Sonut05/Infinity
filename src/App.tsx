import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { AdminProtectedRoute } from './components/admin/AdminProtectedRoute';
import { AdminLayout } from './components/admin/AdminLayout';

// Public Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import { Process } from './pages/Process';
import { Contact } from './pages/Contact';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminEnquiries } from './pages/admin/AdminEnquiries';
import { AdminEnquiryDetail } from './pages/admin/AdminEnquiryDetail';

// Wrapper for public layout
const PublicLayoutWrapper: React.FC = () => (
  <Layout>
    <Outlet />
  </Layout>
);

// Wrapper for protected admin layout
const ProtectedAdminWrapper: React.FC = () => (
  <AdminProtectedRoute>
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  </AdminProtectedRoute>
);

export const App: React.FC = () => {
  return (
    <AdminAuthProvider>
      <Router>
        <Routes>
          {/* Admin Login (Publicly accessible dedicated layout) */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route element={<ProtectedAdminWrapper />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/enquiries" element={<AdminEnquiries />} />
            <Route path="/admin/enquiries/:id" element={<AdminEnquiryDetail />} />
          </Route>

          {/* Public Website Routes */}
          <Route element={<PublicLayoutWrapper />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/process" element={<Process />} />
            <Route path="/contact" element={<Contact />} />
            {/* Catch-all fallback route */}
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </AdminAuthProvider>
  );
};

export default App;

