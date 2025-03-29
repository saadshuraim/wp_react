import { useContext, useState, useEffect, memo } from 'react';
import { BooksContext } from '../context/BooksContext';
import BookCard from '../components/BookCard';
import HeroBanner from '../components/HeroBanner';
import { categories } from '../data/mockData';

// Memoized category button for better performance
const CategoryButton = memo(({ category, isActive, onClick }) => (
  <button 
    className={`${
      isActive 
        ? 'bg-gradient-to-r from-green-900 to-neutral-700 text-white shadow-md' 
        : 'bg-neutral-50 border border-neutral-700 text-neutral-900 hover:bg-neutral-100'
    } px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-sm victorian-text relative z-20`}
    onClick={onClick}
  >
    {category}
  </button>
));

const HomePage = () => {
  const { 
    filteredBooks, 
    searchTerm, 
    setSearchTerm, 
    activeCategory, 
    setActiveCategory 
  } = useContext(BooksContext);
  
  // Animation delay for books grid
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Set loaded after a short delay to trigger animations
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  // Debounced search input handler for better performance
  const handleSearchChange = (e) => {
    const value = e.target.value;
    
    // Clear any existing timeouts
    if (window.searchTimeout) {
      clearTimeout(window.searchTimeout);
    }
    
    // Set a timeout to update the search term after typing stops
    window.searchTimeout = setTimeout(() => {
      setSearchTerm(value);
    }, 300);
  };
  
  // Animated clock icon
  const ClockIcon = () => (
    <div className="inline-block mr-2 relative w-6 h-6">
      <div className="absolute inset-0">
        <svg viewBox="0 0 24 24" fill="none" xmlns="https://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9" stroke="#2D3A25" strokeWidth="2"/>
          <path className="clock-hand" d="M12 7v5h4" stroke="#2D3A25" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  );
  
  return (
    <section className="page-transition max-w-7xl mx-auto px-4">
      <HeroBanner />
      
      {/* Search and Filter Section */}
      <div className="mb-10 mt-12 parchment-bg p-4 sm:p-6 rounded-lg relative" id="books-section">
        {/* Decorative corner elements - hidden on mobile */}
        <div className="absolute top-0 left-0 w-12 md:w-16 h-12 md:h-16 opacity-20 hidden sm:block pointer-events-none">
          <svg viewBox="0 0 100 100" fill="none" xmlns="https://www.w3.org/2000/svg">
            <path d="M0 0 L100 0 L100 20 L20 20 L20 100 L0 100 Z" fill="#2D3A25"/>
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 w-12 md:w-16 h-12 md:h-16 opacity-20 transform rotate-180 hidden sm:block pointer-events-none">
          <svg viewBox="0 0 100 100" fill="none" xmlns="https://www.w3.org/2000/svg">
            <path d="M0 0 L100 0 L100 20 L20 20 L20 100 L0 100 Z" fill="#2D3A25"/>
          </svg>
        </div>
        
        <div className="border-2 border-amber-800 rounded-lg p-3 relative">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 relative z-10">
            <h2 className="text-2xl md:text-3xl victorian-text text-neutral-900 relative after:content-[''] after:absolute after:w-1/3 after:h-1 after:-bottom-2 after:left-0 after:bg-amber-800">
              <ClockIcon /> <span className="align-middle">Browse Literary Collection</span>
            </h2>
            <div className="w-full md:w-auto">
              <div className="relative">
                <input 
                  type="text" 
                  defaultValue={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search by title or author..." 
                  className="w-full md:w-80 pl-10 pr-4 py-3 border-2 border-neutral-700 rounded-lg shadow-sm focus:ring-2 focus:ring-amber-800 focus:border-amber-800 bg-neutral-50 transition-all duration-200"
                  aria-label="Search books"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-search text-neutral-700"></i>
                </div>
              </div>
            </div>
          </div>
          
          {/* Categories Section */}
          <div>
            <div className="ornate-divider">
              <span></span>
            </div>
            
            <h3 className="text-lg font-bold text-neutral-900 mb-4 victorian-text text-center">Browse by Genre</h3>
            <div className="flex flex-wrap gap-3 justify-center pb-2">
              {categories.map(category => (
                <CategoryButton 
                  key={category}
                  category={category}
                  isActive={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                />
              ))}
            </div>
            
            <div className="ornate-divider">
              <span></span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Books Grid - add book count display */}
      <div className="mb-4 text-neutral-700 text-sm victorian-text">
        Displaying {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'}
        {activeCategory !== 'All' && ` in ${activeCategory}`}
        {searchTerm && ` matching "${searchTerm}"`}
      </div>
      
      {/* Responsive grid with fewer columns on smaller screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book, index) => (
            <div 
              key={book.id} 
              className={`animate-fade-in ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-all duration-300 hover:-translate-y-2`} 
              style={{ animationDelay: `${Math.min(index * 0.1, 0.5)}s` }} // Cap maximum delay for better UX
            >
              <BookCard book={book} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 md:py-16 parchment-bg rounded-lg shadow-sm border border-neutral-700 victorian-text">
            <i className="fas fa-book-open text-4xl md:text-5xl text-neutral-700 mb-4"></i>
            <h3 className="text-xl md:text-2xl font-semibold text-neutral-900 mb-3">No Books Found</h3>
            <p className="text-neutral-700 max-w-md mx-auto px-4">
              The librarian couldn't locate any volumes matching your search criteria. Perhaps try adjusting your filters or search terms.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomePage;
