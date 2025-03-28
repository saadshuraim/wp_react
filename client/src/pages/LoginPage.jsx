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
    <section className="page-transition max-w-md mx-auto">
      <div className="text-center mb-8 animate-fade-in">
        <svg className="w-20 h-20 mx-auto mb-4 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.2"/>
          <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h1 className="text-3xl font-heading font-bold text-primary">Welcome to BookHaven</h1>
        <p className="text-neutral-dark">FAST University Karachi's AI Department Book Platform</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        {loginError && (
          <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-4 animate-fade-in">
            <div className="flex">
              <div className="flex-shrink-0">
                <i className="fas fa-exclamation-circle text-red-500"></i>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  {loginError}
                </p>
              </div>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-neutral-dark mb-2">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-neutral rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="youremail@example.com"
            />
            {errors.email && (
              <div className="text-red-500 text-sm mt-1">{errors.email}</div>
            )}
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-neutral-dark mb-2">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-neutral rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Your password"
            />
            {errors.password && (
              <div className="text-red-500 text-sm mt-1">{errors.password}</div>
            )}
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-md font-medium transition-colors mb-4 flex items-center justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </>
            ) : 'Login'}
          </button>
          
          <p className="text-center text-sm text-neutral-dark">
            Don't have an account? <a href="#" className="text-primary hover:underline">Create one</a>
          </p>
        </form>
        
        <div className="mt-6 pt-6 border-t border-neutral">
          <p className="text-center text-sm text-neutral-dark mb-4">For demo purposes, use:</p>
          <div className="text-center text-xs bg-neutral-light p-2 rounded">
            <p>Email: <span className="font-mono">student@fast.edu.pk</span></p>
            <p>Password: <span className="font-mono">password123</span></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
