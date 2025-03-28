import { useState } from 'react';
import { Link } from 'wouter';
import { useAuth } from '../hooks/useAuth';
import { useFavorites } from '../hooks/useFavorites';

const BookCard = ({ book }) => {
  const { isAuthenticated } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [animating, setAnimating] = useState(false);
  
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
  
  return (
    <div className="book-card bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/book/${book.id}`}>
        <div className="relative">
          <img 
            src={book.coverImage} 
            alt={`Book cover: ${book.title}`} 
            className="w-full h-56 object-cover"
          />
          <div className="p-4">
            <div className="flex justify-between items-start">
              <h3 className="font-heading font-bold text-lg text-primary line-clamp-2">{book.title}</h3>
              <button 
                className={`favorite-btn text-xl ${isFavorite(book.id) ? 'text-accent' : 'text-neutral-dark'} hover:text-accent transition-colors ${animating ? 'animate-scale-up' : ''}`}
                onClick={handleFavoriteClick}
                aria-label={isFavorite(book.id) ? "Remove from favorites" : "Add to favorites"}
              >
                <i className={isFavorite(book.id) ? "fas fa-heart" : "far fa-heart"}></i>
              </button>
            </div>
            <p className="text-sm text-neutral-dark mb-2">{book.author}</p>
            <div className="flex items-center mb-2">
              <div className="star-rating flex">
                {renderStars(book.rating)}
              </div>
              <span className="text-xs ml-2 text-neutral-dark">({book.rating}/5)</span>
            </div>
            <p className="text-sm text-neutral-dark line-clamp-2">{book.description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BookCard;
