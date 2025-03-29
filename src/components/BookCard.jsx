import { useState, useEffect, memo } from 'react';
import { Link } from 'wouter';
import { useAuth } from '../hooks/useAuth';
import { useFavorites } from '../hooks/useFavorites';

const BookCard = memo(({ book }) => {
  const { isAuthenticated } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [animating, setAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Determine style based on genre
  const getGenreStyle = () => {
    if (!book.category) return 'classic';
    
    const category = book.category.toLowerCase();
    
    if (category.includes('science') || category.includes('sci-fi') || category.includes('fiction')) {
      return 'scifi';
    } else if (category.includes('history') || category.includes('historical') || category.includes('biography')) {
      return 'historical';
    } else if (category.includes('fantasy') || category.includes('adventure')) {
      return 'fantasy';
    } else if (category.includes('philosophy') || category.includes('classic')) {
      return 'classic';
    }
    
    return 'classic'; // default
  };
  
  const genreStyle = getGenreStyle();
  
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      // Redirect to login is handled in the useFavorites hook
      toggleFavorite(book.id);
      return;
    }
    
    // Add animation
    setAnimating(true);
    toggleFavorite(book.id);
    setTimeout(() => setAnimating(false), 300);
  };
  
  // Generate star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star"></i>);
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }
    
    // Add empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }
    
    return stars;
  };
  
  // Get card styling based on genre - simplified for better performance
  const getCardStyling = () => {
    switch(genreStyle) {
      case 'scifi':
        return 'bg-gradient-to-b from-slate-800 to-blue-900 text-blue-100 border border-blue-500';
      case 'historical':
        return 'bg-amber-50 text-amber-900 border border-amber-800';
      case 'fantasy':
        return 'bg-gradient-to-br from-purple-900 to-indigo-800 text-purple-100 border border-purple-500';
      case 'classic':
      default:
        return 'bg-neutral-50 text-neutral-900 border border-neutral-700';
    }
  };
  
  // Get text styling based on genre
  const getTextStyling = () => {
    switch(genreStyle) {
      case 'scifi':
        return 'time-period-scifi';
      case 'historical':
        return 'time-period-historical';
      case 'fantasy':
        return 'font-bold tracking-wide';
      case 'classic':
      default:
        return 'time-period-classic';
    }
  };
  
  // Handle image loading
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  
  return (
    <div 
      className={`book-card ${getCardStyling()} rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg relative h-full`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/book/${book.id}`}>
        <div className="relative flex flex-col h-full">
          {/* Animated decoration on hover - only on larger screens */}
          {isHovered && (
            <div className="absolute top-2 right-2 z-20 animate-fade-in hidden md:block">
              <i className={`fas ${genreStyle === 'scifi' ? 'fa-rocket' : 'fa-feather-alt'} text-xl ${
                genreStyle === 'scifi' 
                  ? 'text-blue-300' 
                  : 'text-amber-600'
              }`}></i>
            </div>
          )}
          
          {/* Book Cover with placeholder and lazy loading */}
          <div className="relative h-56 overflow-hidden bg-neutral-200 animate-pulse">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <i className="fas fa-book text-4xl text-neutral-400"></i>
              </div>
            )}
            <img 
              src={'../src/data'+book.coverImage} 
              alt={`Book cover: ${book.title}`} 
              className={`w-full h-56 object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              } ${
                genreStyle === 'historical' ? 'sepia-[0.6]' : 
                genreStyle === 'classic' ? 'sepia-[0.3]' : 
                genreStyle === 'scifi' ? 'hue-rotate-15 saturate-150' : ''
              }`}
              loading="lazy"
              onLoad={handleImageLoad}
            />
          </div>
          
          <div className="p-4 flex flex-col flex-grow relative z-10">
            <div className="flex justify-between items-start">
              <h3 className={`font-heading font-bold text-lg ${getTextStyling()} line-clamp-2`}>{book.title}</h3>
              <button 
                className={`favorite-btn text-xl ${
                  genreStyle === 'scifi' 
                    ? (isFavorite(book.id) ? 'text-blue-300' : 'text-blue-600') 
                    : (isFavorite(book.id) ? 'text-accent' : 'text-neutral-dark')
                } hover:text-accent transition-colors ${animating ? 'animate-scale-up' : ''}`}
                onClick={handleFavoriteClick}
                aria-label={isFavorite(book.id) ? "Remove from favorites" : "Add to favorites"}
              >
                <i className={isFavorite(book.id) ? "fas fa-heart" : "far fa-heart"}></i>
              </button>
            </div>
            
            <p className={`text-sm ${getTextStyling()} mb-2`}>{book.author}</p>
            
            <div className="flex items-center mb-2">
              <div className="star-rating flex">
                {renderStars(book.rating)}
              </div>
              <span className={`text-xs ml-2 ${genreStyle === 'scifi' ? 'text-blue-300' : 'text-neutral-dark'}`}>({book.rating}/5)</span>
            </div>
            
            <p className={`text-sm ${genreStyle === 'scifi' ? 'text-blue-200' : 'text-neutral-dark'} line-clamp-2`}>{book.description}</p>
            
            {/* Era indicator */}
            {book.year && (
              <div className={`mt-3 inline-block px-3 py-1 rounded-full text-xs ${
                genreStyle === 'scifi' 
                  ? 'bg-blue-800 text-blue-200 border border-blue-500' 
                  : genreStyle === 'historical'
                    ? 'bg-amber-800 bg-opacity-20 text-amber-900 border border-amber-700'
                    : 'bg-amber-100 text-neutral-900 border border-neutral-300'
              }`}>
                <i className={`fas ${
                  genreStyle === 'scifi' ? 'fa-clock' : 'fa-calendar-alt'
                } mr-1`}></i>
                {book.year}
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
});

export default BookCard;
