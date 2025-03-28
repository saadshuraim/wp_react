import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const [location] = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Close mobile menu when changing location
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <nav className="bg-primary shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <svg className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="ml-2 text-white font-heading font-bold text-xl">BookHaven</span>
              <span className="ml-2 text-xs text-white/70 hidden md:block">FAST University Karachi</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <NavLink href="/" active={location === '/'}>Home</NavLink>
            <NavLink href="/add-book" active={location === '/add-book'}>Add Book</NavLink>
            <NavLink href="/favorites" active={location === '/favorites'}>Favorites</NavLink>
            
            {isAuthenticated ? (
              <button 
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md text-sm font-medium transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link 
                href="/login"
                className="bg-secondary hover:bg-secondary-dark text-white px-4 py-1 rounded-md text-sm font-medium transition-colors"
              >
                Login
              </Link>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-accent focus:outline-none"
              aria-expanded={mobileMenuOpen}
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-primary-dark pb-3 px-4`}>
        <div className="pt-2 pb-3 space-y-1">
          <MobileNavLink href="/" active={location === '/'}>Home</MobileNavLink>
          <MobileNavLink href="/add-book" active={location === '/add-book'}>Add Book</MobileNavLink>
          <MobileNavLink href="/favorites" active={location === '/favorites'}>Favorites</MobileNavLink>
          
          {isAuthenticated ? (
            <button 
              onClick={logout}
              className="block w-full text-left px-3 py-2 rounded-md text-white font-medium hover:bg-primary-light"
            >
              Logout
            </button>
          ) : (
            <MobileNavLink href="/login" active={location === '/login'}>Login</MobileNavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

// Desktop NavLink component
const NavLink = ({ href, active, children }) => (
  <Link 
    href={href} 
    className={`nav-link text-white hover:text-accent px-3 py-2 text-sm font-medium ${active ? 'active' : ''}`}
  >
    {children}
  </Link>
);

// Mobile NavLink component
const MobileNavLink = ({ href, active, children }) => (
  <Link 
    href={href} 
    className={`block px-3 py-2 rounded-md text-white font-medium ${active ? 'bg-primary-light' : ''}`}
  >
    {children}
  </Link>
);

export default Navbar;
