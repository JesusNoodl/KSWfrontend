import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-[#2e2e2e] shadow-2xl sticky top-0 z-50 border-b-2 border-[#ff6d00]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="text-2xl md:text-3xl font-black text-[#ff6d00] hover:text-white transition-colors duration-300 tracking-tight">
            FAKENHAM<span className="text-white"> MARTIAL ARTS</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-2">
            <Link 
              to="/" 
              className={`${
                isActive('/') 
                  ? 'text-white bg-[#ff6d00]' 
                  : 'text-[#ff6d00] hover:text-white hover:bg-[#3d3d3d]'
              } px-4 py-2 rounded-lg transition-all duration-300 font-semibold`}
            >
              Home
            </Link>
            <Link 
              to="/schedule" 
              className={`${
                isActive('/schedule') 
                  ? 'text-white bg-[#ff6d00]' 
                  : 'text-[#ff6d00] hover:text-white hover:bg-[#3d3d3d]'
              } px-4 py-2 rounded-lg transition-all duration-300 font-semibold`}
            >
              Schedule
            </Link>
            <Link 
              to="/calendar" 
              className={`${
                isActive('/calendar') 
                  ? 'text-white bg-[#ff6d00]' 
                  : 'text-[#ff6d00] hover:text-white hover:bg-[#3d3d3d]'
              } px-4 py-2 rounded-lg transition-all duration-300 font-semibold`}
            >
              Calendar
            </Link>
            <Link 
              to="/team" 
              className={`${
                isActive('/team') 
                  ? 'text-white bg-[#ff6d00]' 
                  : 'text-[#ff6d00] hover:text-white hover:bg-[#3d3d3d]'
              } px-4 py-2 rounded-lg transition-all duration-300 font-semibold`}
            >
              Team
            </Link>
            <Link 
              to="/about" 
              className={`${
                isActive('/about') 
                  ? 'text-white bg-[#ff6d00]' 
                  : 'text-[#ff6d00] hover:text-white hover:bg-[#3d3d3d]'
              } px-4 py-2 rounded-lg transition-all duration-300 font-semibold`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`${
                isActive('/contact') 
                  ? 'text-white bg-[#ff6d00]' 
                  : 'text-[#ff6d00] hover:text-white hover:bg-[#3d3d3d]'
              } px-4 py-2 rounded-lg transition-all duration-300 font-semibold`}
            >
              Contact
            </Link>
            
            <div className="ml-4 pl-4 border-l-2 border-[#ff6d00]">
              <Link to="/login">
                <button className="bg-[#ff6d00] text-black px-6 py-2.5 rounded-lg hover:bg-white hover:scale-105 transition-all duration-300 font-bold shadow-lg">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;