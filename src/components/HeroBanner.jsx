import { useState, useEffect } from 'react';

const HeroBanner = () => {
  const [fact, setFact] = useState('');
  const [factType, setFactType] = useState('date'); // Default to date facts
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Get formatted today's date for display
  const getTodayFormatted = () => {
    const today = new Date();
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return today.toLocaleDateString('en-US', options);
  };
  
  // Update clock - reduced update frequency for better performance
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 5000); // Update every 5 seconds instead of every second
    
    return () => clearInterval(timer);
  }, []);
  
  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  
  useEffect(() => {
    const fetchFactOfTheDay = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Get current date for the API call
        const today = new Date();
        const month = today.getMonth() + 1; // getMonth returns 0-11
        const day = today.getDate();
        
        // First try to get a date fact (historical event on this day)
        let response = await fetch(`https://numbersapi.com/${month}/${day}/date?json`);
        let data = await response.json();
        
        // If successful, use this fact
        if (data.found) {
          setFact(data.text);
          setFactType('date');
        } else {
          // Fallback to a random trivia fact
          response = await fetch(`https://numbersapi.com/random/trivia?json`);
          data = await response.json();
          setFact(data.text);
          setFactType('trivia');
        }
      } catch (error) {
        console.error('Error fetching fact of the day:', error);
        setError('Unable to load today\'s fact. Please try again later.');
        // Fallback fact in case of network issues
        setFact('Did you know? The average person spends six months of their lifetime waiting for red lights to turn green.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFactOfTheDay();
  }, []);
  
  return (
    <div className="relative rounded-xl overflow-hidden mb-10 victorian-border">
      {/* Subtle animated clock - hidden on mobile for better performance */}
      <div className="absolute top-10 right-10 opacity-20 z-0 pointer-events-none hidden md:block">
        <div className="w-40 h-40 clock-hand">
          <svg viewBox="0 0 100 100" xmlns="https://www.w3.org/2000/svg">
            <path d="M50 10 L55 50 L50 55 L45 50 Z" fill="#2D3A25" />
            <circle cx="50" cy="50" r="5" fill="#B8860B" />
          </svg>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 bg-neutral-800 before:absolute before:inset-0 before:bg-black before:bg-opacity-40 before:z-0 relative">
        <div className="p-6 md:p-12 flex flex-col justify-center relative z-10">
          {/* Time display - simplified on mobile */}
          <div className="mb-4 flex items-center">
            <div className="mr-3 p-2 rounded-full bg-green-900 bg-opacity-80">
              <i className="fas fa-clock text-amber-200 text-xl"></i>
            </div>
            <div className="victorian-text text-neutral-50">
              <div className="text-sm md:text-lg uppercase tracking-widest">Current Time</div>
              <div className="text-xl md:text-2xl font-bold text-amber-200">{formattedTime}</div>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 font-heading">BookHaven AI Library</h1>
          <p className="text-white text-base md:text-lg mb-6 md:mb-8 relative pl-4 md:pl-5 before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-amber-700">
            Journey through the literary ages with our curated collection at FAST University Karachi.
          </p>
          
          {/* Student information section - responsive sizing */}
          <div className="mb-6 text-amber-200 victorian-text bg-green-900 bg-opacity-30 p-3 md:p-4 border-l-4 border-amber-700 text-xs md:text-sm">
            <p>Web Programming Course - Assignment 2</p>
            <p>Saad Rashid | 22k-4108 | BSAI-6B</p>
            <p>FAST University, Karachi</p>
          </div>
          
          {/* Enhanced Fact of the Day Card as aged parchment */}
          <div className="parchment-bg rounded-lg border border-amber-800 shadow-lg p-4 md:p-5 transform transition-all duration-300 hover:shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-800 to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-full h-2 bg-gradient-to-l from-amber-800 to-transparent"></div>
            
            <div className="flex items-center mb-3 border-b border-amber-800 pb-2">
              <div className="bg-green-900 rounded-full p-2 mr-3">
                <i className={`fas ${factType === 'date' ? 'fa-calendar-alt' : 'fa-lightbulb'} text-amber-200 text-base md:text-lg`}></i>
              </div>
              <div>
                <h3 className="font-bold text-lg md:text-xl text-amber-900 victorian-text">Literary Almanac</h3>
                <p className="text-amber-800 text-xs md:text-sm">{factType === 'date' ? getTodayFormatted() : 'Scholarly Curiosity'}</p>
              </div>
            </div>
            
            {isLoading ? (
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-4 bg-amber-200 bg-opacity-50 rounded w-3/4"></div>
                  <div className="h-4 bg-amber-200 bg-opacity-50 rounded"></div>
                  <div className="h-4 bg-amber-200 bg-opacity-50 rounded w-5/6"></div>
                </div>
              </div>
            ) : error ? (
              <div className="text-red-500 flex items-center">
                <i className="fas fa-exclamation-circle mr-2"></i>
                <p>{error}</p>
              </div>
            ) : (
              <div className="relative">
                <p className="text-amber-900 leading-relaxed text-sm md:text-base time-period-historical">{fact}</p>
                <div className="mt-3 flex justify-end">
                  <button 
                    onClick={() => window.open('https://numbersapi.com', '_blank')}
                    className="text-xs md:text-sm text-amber-800 hover:text-amber-900 transition-colors flex items-center quill-hover"
                  >
                    <span>Source: Numbers API</span>
                    <i className="fas fa-feather-alt ml-1 text-xs"></i>
                  </button>
                </div>
                
                {/* Subtle ink stain decoration - hidden on mobile */}
                <div className="absolute -bottom-4 -right-4 opacity-10 w-20 h-20 hidden md:block">
                  <svg viewBox="0 0 100 100" xmlns="https://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="40" fill="#2C1B01" />
                    <circle cx="65" cy="35" r="5" fill="#2C1B01" />
                    <circle cx="35" cy="65" r="8" fill="#2C1B01" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Image section with appropriate height on mobile */}
        <div className="relative h-48 md:h-auto">
          <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>
          <img 
            src="httpss://khi.nu.edu.pk/wp-content/uploads/2023/06/DSC_0361.jpg" 
            alt="Library with books" 
            className="absolute inset-0 w-full h-full object-cover sepia-[0.6] z-0" 
            loading="eager" // Load priority for above-the-fold image
          />
          
          {/* Decorative Victorian elements - hidden on mobile */}
          <div className="absolute bottom-4 right-4 z-20 hidden md:block">
            <div className="p-2 rounded-full bg-green-900 bg-opacity-70 text-amber-200">
              <i className="fas fa-compass text-xl animate-spin-slow"></i>
            </div>
          </div>
          <div className="absolute top-4 left-4 z-20 hidden md:block">
            <div className="p-2 rounded-full bg-green-900 bg-opacity-70 text-amber-200">
              <i className="fas fa-book-open text-xl"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
