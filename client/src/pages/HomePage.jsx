import { useContext, useState, useEffect } from 'react';
import { BooksContext } from '../context/BooksContext';
import BookCard from '../components/BookCard';
import HeroBanner from '../components/HeroBanner';
import { categories } from '../data/mockData';

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
  
  return (
    <section className="page-transition">
      <HeroBanner />
      
      {/* Search and Filter Section */}
      <div className="mb-8" id="books-section">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <h2 className="text-2xl font-heading font-bold text-primary">Browse Books</h2>
          <div className="w-full md:w-auto">
            <div className="relative">
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title or author..." 
                className="w-full md:w-80 pl-10 pr-4 py-2 border border-neutral rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-search text-neutral-dark"></i>
              </div>
            </div>
          </div>
        </div>
        
        {/* Categories Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(category => (
            <button 
              key={category}
              className={`${
                activeCategory === category 
                  ? 'bg-primary text-white' 
                  : 'bg-neutral hover:bg-primary hover:text-white'
              } px-4 py-1 rounded-full text-sm font-medium transition-colors`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book, index) => (
            <div 
              key={book.id} 
              className={`animate-fade-in ${isLoaded ? 'opacity-100' : 'opacity-0'}`} 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <BookCard book={book} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <i className="fas fa-book-open text-4xl text-neutral-dark mb-3"></i>
            <h3 className="text-xl font-semibold text-primary mb-2">No Books Found</h3>
            <p className="text-neutral-dark">
              We couldn't find any books matching your search criteria. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomePage;
