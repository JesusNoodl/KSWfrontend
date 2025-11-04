import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import Calendar from './pages/Calendar';
import Team from './pages/Team';
import About from './pages/About';
import Contact from './pages/Contact';
import { SpeedInsights } from '@vercel/speed-insights/react';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/team" element={<Team />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/calendar" element={<Calendar />} />
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
  );
}

export default App;