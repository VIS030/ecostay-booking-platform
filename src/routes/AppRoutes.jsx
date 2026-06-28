import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ChatWidget from '../components/chat/ChatWidget';
import HomePage from '../pages/HomePage';
import ListingsPage from '../pages/ListingsPage';
import PropertyDetailsPage from '../pages/PropertyDetailsPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import BookingConfirmationPage from '../pages/BookingConfirmationPage';
import DashboardPage from '../pages/DashboardPage';
import AboutPage from '../pages/AboutPage';
import DestinationsPage from '../pages/DestinationsPage';
import ExperiencesPage from '../pages/ExperiencesPage';
import NotFoundPage from '../pages/NotFoundPage';
import ProtectedRoute from '../components/auth/ProtectedRoute';

function Layout({ children, showFooter = true }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      {showFooter && <Footer />}
      <ChatWidget />
    </>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout><HomePage /></Layout>} />
      <Route path="/listings" element={<Layout><ListingsPage /></Layout>} />
      <Route path="/destinations" element={<Layout><DestinationsPage /></Layout>} />
      <Route path="/experiences" element={<Layout><ExperiencesPage /></Layout>} />
      <Route path="/properties/:id" element={<Layout><PropertyDetailsPage /></Layout>} />
      <Route path="/login" element={<Layout showFooter={false}><LoginPage /></Layout>} />
      <Route path="/register" element={<Layout showFooter={false}><RegisterPage /></Layout>} />
      <Route path="/forgot-password" element={<Layout showFooter={false}><ForgotPasswordPage /></Layout>} />
      <Route path="/booking-confirmation" element={<Layout><ProtectedRoute><BookingConfirmationPage /></ProtectedRoute></Layout>} />
      <Route path="/dashboard" element={<Layout><ProtectedRoute><DashboardPage /></ProtectedRoute></Layout>} />
      <Route path="/about" element={<Layout><AboutPage /></Layout>} />
      <Route path="*" element={<Layout><NotFoundPage /></Layout>} />
    </Routes>
  );
}
