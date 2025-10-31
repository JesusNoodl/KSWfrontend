import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
            KSW Martial Arts
          </Link>
          <div className="flex items-center space-x-1">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 hover:bg-gray-100 px-4 py-2 rounded transition"
            >
              Home
            </Link>
            <Link 
              to="/schedule" 
              className="text-gray-700 hover:text-blue-600 hover:bg-gray-100 px-4 py-2 rounded transition"
            >
              Schedule
            </Link>
            <Link 
              to="/team" 
              className="text-gray-700 hover:text-blue-600 hover:bg-gray-100 px-4 py-2 rounded transition"
            >
              Team
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-blue-600 hover:bg-gray-100 px-4 py-2 rounded transition"
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-blue-600 hover:bg-gray-100 px-4 py-2 rounded transition"
            >
              Contact
            </Link>
            <Link to="/login" className="ml-2">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;