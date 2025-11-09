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
import MemberDashboard from './pages/member/MemberDashboard';
import MemberPromotionsPage from './pages/member/MemberPromotionsPage';
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

            {/* Protected Member Routes */}
            <Route 
              path="/member" 
              element={
                <ProtectedRoute>
                  <MemberDashboard />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/member/promotions" 
              element={
                <ProtectedRoute>
                  <MemberPromotionsPage />
                </ProtectedRoute>
              }
            />
            {/* Add more protected routes as you create components:
            <Route 
              path="/member/details" 
              element={
                <ProtectedRoute>
                  <MemberDetailsPage />
                </ProtectedRoute>
              }
            />
            */}
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