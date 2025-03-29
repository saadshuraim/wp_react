import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const { isAuthenticated, logout, user } = useAuth();
  
  // Handle scrolling detection for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'brass-bg shadow-md py-2' : 'bg-opacity-90 py-4'
    } wood-bg`}>
      {/* Decorative border at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-900 via-amber-700 to-amber-900"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo and Site Title */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-10 h-10">
              <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <rect width="30" height="40" x="10" y="5" rx="2" fill="#DAA520" />
                <rect width="28" height="38" x="11" y="6" rx="1" fill="#FFFAF0" />
                <path d="M15 15 H35 M15 20 H30 M15 25 H35 M15 30 H25" stroke="#8B4513" strokeWidth="1" />
                <path d="M20 38 C25 45, 35 45, 40 38" stroke="#8B4513" strokeWidth="1" fill="transparent" />
                <path d="M20 6 V0 H30 V6" stroke="#8B4513" strokeWidth="1" fill="transparent" />
              </svg>
            </div>
            <div>
              <span className="font-bold text-xl text-amber-100 steampunk-text">BookHaven</span>
              <span className="ml-1 text-xs text-amber-300 steampunk-text">AI Department</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`nav-link quill-hover steampunk-text ${location === '/' ? 'active text-amber-200' : 'text-amber-100'}`}>
              <i className="fas fa-compass mr-1"></i> Home
            </Link>
            <Link href="/favorites" className={`nav-link quill-hover steampunk-text ${location === '/favorites' ? 'active text-amber-200' : 'text-amber-100'}`}>
              <i className="fas fa-heart mr-1"></i> Favorites
            </Link>
            <Link href="/add-book" className={`nav-link quill-hover steampunk-text ${location === '/add-book' ? 'active text-amber-200' : 'text-amber-100'}`}>
              <i className="fas fa-book-medical mr-1"></i> Add Book
            </Link>
            
            {isAuthenticated ? (
              <div className="relative group">
                <button 
                  className="flex items-center space-x-1 text-amber-100 steampunk-text"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <div className="w-8 h-8 rounded-full bg-amber-800 flex items-center justify-center">
                    <span className="text-amber-100">{user?.name?.charAt(0).toUpperCase() || 'U'}</span>
                  </div>
                  <span>{user?.name || 'User'}</span>
                  <i className="fas fa-caret-down"></i>
                </button>
                
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg parchment-bg py-1 z-10 border border-amber-800">
                    <div className="px-4 py-2 text-sm text-amber-900 border-b border-amber-800">
                      Signed in as <span className="font-semibold">{user?.email}</span>
                    </div>
                    <button 
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-amber-900 hover:bg-amber-800 hover:bg-opacity-20 steampunk-text"
                    >
                      <i className="fas fa-sign-out-alt mr-2"></i> Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login">
                <button className="login-button bg-gradient-to-r from-amber-800 to-amber-700 hover:from-amber-700 hover:to-amber-600 text-amber-100 py-2 px-4 rounded-md flex items-center transition-all steampunk-text">
                  <i className="fas fa-key mr-2"></i> Login
                </button>
              </Link>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-amber-100 focus:outline-none"
            >
              <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden parchment-bg border border-amber-800 rounded-lg mt-4 py-4 px-2 shadow-lg">
            <Link href="/" className="block py-2 px-4 text-amber-900 steampunk-text hover:bg-amber-800 hover:bg-opacity-20 rounded-md">
              <i className="fas fa-compass mr-2"></i> Home
            </Link>
            <Link href="/favorites" className="block py-2 px-4 text-amber-900 steampunk-text hover:bg-amber-800 hover:bg-opacity-20 rounded-md">
              <i className="fas fa-heart mr-2"></i> Favorites
            </Link>
            <Link href="/add-book" className="block py-2 px-4 text-amber-900 steampunk-text hover:bg-amber-800 hover:bg-opacity-20 rounded-md">
              <i className="fas fa-book-medical mr-2"></i> Add Book
            </Link>
            
            <div className="border-t border-amber-800 my-2"></div>
            
            {isAuthenticated ? (
              <>
                <div className="px-4 py-2 text-amber-900 steampunk-text">
                  Signed in as <span className="font-semibold">{user?.name}</span>
                </div>
                <button 
                  onClick={logout}
                  className="w-full text-left py-2 px-4 text-amber-900 steampunk-text hover:bg-amber-800 hover:bg-opacity-20 rounded-md"
                >
                  <i className="fas fa-sign-out-alt mr-2"></i> Sign out
                </button>
              </>
            ) : (
              <Link href="/login" className="block py-2 px-4 text-amber-900 steampunk-text hover:bg-amber-800 hover:bg-opacity-20 rounded-md">
                <i className="fas fa-key mr-2"></i> Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
