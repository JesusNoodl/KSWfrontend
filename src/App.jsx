import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import Team from './pages/Team';
import About from './pages/About';
import Contact from './pages/Contact';
import Calendar from './pages/Calendar';
import Login from './pages/Login';
import News from './pages/News';
import MemberLayout from './components/member/MemberLayout';
import MemberDashboard from './pages/member/MemberDashboard';
import MemberPromotions from './pages/member/MemberPromotionsPage';
import MemberStudentDetails from './pages/member/MemberStudentDetails';
import MemberAwards from './pages/member/MemberAwards';
import MemberContacts from './pages/member/MemberContacts';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-black">
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/team" element={<Team />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/news" element={<News />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Member Routes - All nested under MemberLayout */}
            <Route
              path="/member"
              element={
                <ProtectedRoute>
                  <MemberLayout />
                </ProtectedRoute>
              }
            >
              {/* index route - shows when path is exactly /member */}
              <Route index element={<MemberDashboard />} />
              
              {/* Child routes - automatically get /member prefix */}
              <Route path="promotions" element={<MemberPromotions />} />

              {/* Child routes - automatically get /member prefix */}
              <Route path="student_details" element={<MemberStudentDetails />} />

              {/* Child routes - automatically get /member prefix */}
              <Route path="awards" element={<MemberAwards />} />

              {/* Child routes - automatically get /member prefix */}
              <Route path="contacts" element={<MemberContacts />} />
              
              {/* Add more protected routes as you create components */}
              {/* <Route path="details" element={<MemberDetailsPage />} /> */}
              {/* <Route path="classes" element={<MemberClassesPage />} /> */}
              {/* <Route path="news" element={<MemberNewsPage />} /> */}
              {/* <Route path="locations" element={<MemberLocationsPage />} /> */}
              {/* <Route path="cancelled" element={<MemberCancelledPage />} /> */}
            </Route>
            {/* Protected Admin Routes - Requires admin role */}
            <Route
              path="/admin"
              element={
                <AdminProtectedRoute>
                  <AdminLayout />
                </AdminProtectedRoute>
              }
            >
              {/* Dashboard - shows when path is exactly /admin */}
              <Route index element={<AdminDashboard />} />
              
              {/* Placeholder routes - create these pages as you build them */}
              {/* <Route path="people" element={<AdminPeoplePage />} /> */}
              {/* <Route path="people/:id" element={<AdminPersonDetailPage />} /> */}
              {/* <Route path="enrol" element={<AdminEnrolPage />} /> */}
              {/* <Route path="users" element={<AdminUsersPage />} /> */}
              {/* <Route path="classes" element={<AdminClassesPage />} /> */}
              {/* <Route path="promotions" element={<AdminPromotionsPage />} /> */}
              {/* <Route path="awards" element={<AdminAwardsPage />} /> */}
              {/* <Route path="events" element={<AdminEventsPage />} /> */}
              {/* <Route path="contacts" element={<AdminContactsPage />} /> */}
            </Route>
          </Routes>

          {/* Footer */}
          <footer className="bg-black text-white py-8 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <p>&copy; 2025 Fakenham Martial Arts. All rights reserved.</p>
            </div>
          </footer>
          <SpeedInsights />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;