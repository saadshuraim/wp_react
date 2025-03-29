import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
  const [, setLocation] = useLocation();
  const { login, isAuthenticated } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Animated clock icon from HomePage
  const ClockIcon = () => (
    <div className="inline-block mr-2 relative w-6 h-6">
      <div className="absolute inset-0">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9" stroke="#2D3A25" strokeWidth="2"/>
          <path className="clock-hand" d="M12 7v5h4" stroke="#2D3A25" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  );
  
  // If already authenticated, redirect to home
  if (isAuthenticated) {
    setLocation('/');
    return null;
  }
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setLoginError('');
    
    try {
      await login(email, password);
      setLocation('/');
    } catch (error) {
      setLoginError(error.message);
      setIsSubmitting(false);
    }
  };
  
  return (
    <section className="page-transition max-w-7xl mx-auto px-4">
      <div className="mb-6 mt-8">
        <a href="/" 
           onClick={(e) => { e.preventDefault(); setLocation('/'); }}
           className="inline-flex items-center quill-hover text-neutral-900 hover:text-accent-gold transition-colors">
          <i className="fas fa-arrow-left mr-2"></i> Return to Library
        </a>
      </div>
      
      <div className="parchment-bg rounded-lg victorian-border relative p-6 shadow-md max-w-md mx-auto">
        {/* Decorative corner elements */}
        <div className="absolute top-0 left-0 w-12 md:w-16 h-12 md:h-16 opacity-20 hidden sm:block">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0 L100 0 L100 20 L20 20 L20 100 L0 100 Z" fill="#2D3A25"/>
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 w-12 md:w-16 h-12 md:h-16 opacity-20 transform rotate-180 hidden sm:block">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0 L100 0 L100 20 L20 20 L20 100 L0 100 Z" fill="#2D3A25"/>
          </svg>
        </div>
        
        <div className="relative z-10">
          <div className="text-center mb-8 animate-fade-in">
            <div className="brass-bg w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-neutral-50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.2"/>
                <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="text-3xl font-heading victorian-text font-bold text-neutral-900 mb-2 flex items-center justify-center">
              <ClockIcon /> <span className="align-middle">BookHaven Library Card</span>
            </h1>
            <p className="text-neutral-700 victorian-text">FAST University Karachi's AI Department Book Collection</p>
          </div>
          
          <div className="ornate-divider">
            <span></span>
          </div>
          
          {loginError && (
            <div className="bg-amber-50 border-l-4 border-amber-800 p-4 mb-6 animate-fade-in">
              <div className="flex">
                <div className="flex-shrink-0">
                  <i className="fas fa-exclamation-circle text-amber-800"></i>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-amber-800 victorian-text">
                    {loginError}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="animate-fade-in mt-6">
            <div className="mb-6">
              <label htmlFor="email" className="block text-neutral-900 victorian-text mb-2">Electronic Mail Address</label>
              <input 
                type="email" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border-2 border-neutral-700 rounded-lg focus:ring-2 focus:ring-amber-800 focus:border-amber-800 bg-neutral-50"
                placeholder="youremail@example.com"
              />
              {errors.email && (
                <div className="text-amber-800 text-sm mt-1 victorian-text">{errors.email}</div>
              )}
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-neutral-900 victorian-text mb-2">Secret Password</label>
              <input 
                type="password" 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border-2 border-neutral-700 rounded-lg focus:ring-2 focus:ring-amber-800 focus:border-amber-800 bg-neutral-50"
                placeholder="Your password"
              />
              {errors.password && (
                <div className="text-amber-800 text-sm mt-1 victorian-text">{errors.password}</div>
              )}
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-green-900 to-neutral-700 text-white py-2 rounded-md font-medium transition-colors mb-4 flex items-center justify-center hover:shadow-md"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 mr-2 relative">
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="animate-spin">
                      <circle cx="50" cy="50" r="45" fill="transparent" stroke="currentColor" strokeWidth="8" strokeDasharray="150" strokeDashoffset="25" />
                    </svg>
                  </div>
                  Accessing Library...
                </>
              ) : 'Sign The Ledger'}
            </button>
            
            <p className="text-center text-sm text-neutral-700 victorian-text">
              No library card yet? <a href="#" className="text-amber-800 hover:text-accent-gold transition-colors quill-hover">Apply for membership</a>
            </p>
          </form>
          
          <div className="ornate-divider mt-6">
            <span></span>
          </div>
          
          <div className="mt-6">
            <p className="text-center text-sm text-neutral-700 victorian-text mb-4">For demonstration purposes, please utilize:</p>
            <div className="text-center text-xs bg-neutral-50 border border-neutral-700 p-3 rounded victorian-text">
              <p>Electronic Mail: <span className="font-mono text-neutral-900">student@fast.edu.pk</span></p>
              <p>Secret Password: <span className="font-mono text-neutral-900">password123</span></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
