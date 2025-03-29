import { useState, useEffect, useContext } from 'react';
import { useRoute, Link } from 'wouter';
import { BooksContext } from '../context/BooksContext';
import { useAuth } from '../hooks/useAuth';
import { useFavorites } from '../hooks/useFavorites';
import ReviewItem from '../components/ReviewItem';

const BookDetailPage = () => {
  const [, params] = useRoute('/book/:id');
  const { getBook, addReview } = useContext(BooksContext);
  const { isAuthenticated, user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  useEffect(() => {
    if (params?.id) {
      // Simulate loading delay for realistic UX
      setTimeout(() => {
        const foundBook = getBook(params.id);
        setBook(foundBook);
        setLoading(false);
      }, 300);
    }
  }, [params?.id, getBook]);
  
  const handleSubmitReview = (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setError('You must be logged in to submit a review');
      return;
    }
    
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
    
    if (reviewText.trim() === '') {
      setError('Please enter a review comment');
      return;
    }
    
    // Create review object
    const newReview = {
      username: user.name,
      userImg: user.name.split(' ').map(name => name[0]).join(''),
      userColor: 'bg-primary',
      affiliation: `${user.department} Department`,
      rating,
      comment: reviewText,
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    };
    
    // Add review to book
    addReview(book.id, newReview);
    
    // Update local book state
    setBook({
      ...book,
      reviews: [...book.reviews, newReview],
      rating: ((book.rating * book.reviews.length) + rating) / (book.reviews.length + 1)
    });
    
    // Reset form
    setRating(0);
    setReviewText('');
    setError('');
    setSuccess(true);
    
    // Clear success message after 3 seconds
    setTimeout(() => setSuccess(false), 3000);
  };
  
  // Handle favorite toggle
  const handleToggleFavorite = () => {
    if (book) {
      toggleFavorite(book.id);
    }
  };
  
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
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="relative w-16 h-16">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" fill="#B87333" stroke="#8B4513" strokeWidth="2" />
            <path d="M50,10 L55,50 L50,55 L45,50 Z M50,90 L45,50 L50,45 L55,50 Z M10,50 L50,45 L55,50 L50,55 Z M90,50 L50,55 L45,50 L50,45 Z" fill="#8B4513" />
            <circle cx="50" cy="50" r="10" fill="#8B4513" />
            <circle cx="50" cy="50" r="5" fill="#DAA520" />
          </svg>
        </div>
      </div>
    );
  }
  
  if (!book) {
    return (
      <div className="text-center py-10 parchment-bg p-6 rounded-lg victorian-border">
        <i className="fas fa-exclamation-circle text-4xl text-amber-800 mb-3"></i>
        <h2 className="text-2xl font-semibold victorian-text mb-2">Book Not Found</h2>
        <p className="text-neutral-700 mb-6">The volume you seek appears to be missing from our collection.</p>
        <Link href="/" className="bg-gradient-to-r from-green-900 to-neutral-700 text-white px-4 py-2 rounded-md font-medium transition-colors hover:shadow-md">
          Return to Library
        </Link>
      </div>
    );
  }
  
  // Generate star rating UI
  const renderStarRating = () => {
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      let starClass = "far fa-star cursor-pointer text-2xl mx-1 hover:text-accent-gold transition-colors";
      
      if (i <= (hoverRating || rating)) {
        starClass = "fas fa-star cursor-pointer text-2xl mx-1 text-accent-gold";
      }
      
      stars.push(
        <i 
          key={i}
          className={starClass}
          onClick={() => setRating(i)}
          onMouseEnter={() => setHoverRating(i)}
          onMouseLeave={() => setHoverRating(0)}
        ></i>
      );
    }
    
    return stars;
  };
  
  return (
    <section className="page-transition max-w-7xl mx-auto px-4">
      <div className="mb-6 mt-8">
        <Link href="/" className="inline-flex items-center quill-hover text-neutral-900 hover:text-accent-gold transition-colors">
          <i className="fas fa-arrow-left mr-2"></i> Return to Library
        </Link>
      </div>
      
      <div className="parchment-bg rounded-lg victorian-border relative p-6 shadow-md">
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
        
        <div className="md:flex relative z-10">
          <div className="md:w-1/3 p-4 flex justify-center">
            <div className="relative">
              <img 
                src={'../src/data'+book.coverImage} 
                alt={`Book cover for ${book.title}`} 
                className="w-full max-w-xs object-cover rounded-md shadow-md border-2 border-amber-900" 
              />
              <div className="absolute -bottom-3 -right-3 w-10 h-10">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="45" fill="#B87333" stroke="#8B4513" strokeWidth="2" />
                  <path d="M50,10 L55,50 L50,55 L45,50 Z" fill="#8B4513" />
                  <circle cx="50" cy="50" r="5" fill="#DAA520" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3 p-4">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-heading victorian-text font-bold text-neutral-900 mb-2 relative after:content-[''] after:absolute after:w-1/3 after:h-1 after:-bottom-2 after:left-0 after:bg-amber-800">{book.title}</h1>
              <button 
                onClick={handleToggleFavorite}
                className="text-2xl text-neutral-900 hover:text-accent-gold transition-colors"
                aria-label={isFavorite(book.id) ? "Remove from favorites" : "Add to favorites"}
              >
                <i className={isFavorite(book.id) ? "fas fa-heart text-accent-gold" : "far fa-heart"}></i>
              </button>
            </div>
            
            <p className="text-xl text-neutral-700 mb-4 mt-3 victorian-text">by {book.author}</p>
            
            <div className="flex items-center mb-6">
              <div className="star-rating flex text-xl">
                {Array.from({ length: Math.floor(book.rating) }).map((_, i) => (
                  <i key={`star-full-${i}`} className="fas fa-star text-accent-gold"></i>
                ))}
                
                {book.rating % 1 >= 0.5 && (
                  <i className="fas fa-star-half-alt text-accent-gold"></i>
                )}
                
                {Array.from({ length: 5 - Math.ceil(book.rating) }).map((_, i) => (
                  <i key={`star-empty-${i}`} className="far fa-star text-accent-gold"></i>
                ))}
              </div>
              <span className="ml-2 text-neutral-700">({book.rating.toFixed(1)}/5 from {book.reviews.length} reviews)</span>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl victorian-text font-semibold text-neutral-900 mb-2 flex items-center">
                <ClockIcon /> <span className="align-middle">Description</span>
              </h2>
              <p className="text-neutral-700">{book.description}</p>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {book.categories.map(category => (
                <span key={category} className="bg-neutral-50 border border-neutral-700 text-neutral-900 px-3 py-1 rounded-full text-sm victorian-text">
                  {category}
                </span>
              ))}
            </div>
            
            <div className="flex items-center text-sm text-neutral-700">
              <span className="mr-4"><i className="far fa-calendar-alt mr-1"></i> Published: {book.published}</span>
              <span><i className="far fa-file-alt mr-1"></i> Pages: {book.pages}</span>
            </div>
          </div>
        </div>
        
        {/* Reviews Section */}
        <div className="mt-8 pt-6">
          <div className="ornate-divider">
            <span></span>
          </div>
          
          <h2 className="text-2xl victorian-text font-semibold text-neutral-900 mb-4 text-center">Reader Impressions</h2>
          
          {/* Add Review Form */}
          <div className="mb-8 bg-neutral-50 p-6 rounded-lg border border-neutral-700 shadow-sm relative z-10">
            {!isAuthenticated ? (
              <div className="text-center">
                <p className="text-neutral-700 mb-6 victorian-text">You must be a registered member of our library to leave a review.</p>
                <Link href="/login" 
                  className="bg-gradient-to-r from-green-900 to-neutral-700 text-white px-6 py-3 rounded-md font-medium inline-block transition-colors hover:shadow-md relative z-20"
                >
                  Login to Review
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview}>
                {error && (
                  <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <i className="fas fa-exclamation-circle text-red-500"></i>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">{error}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {success && (
                  <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-4 animate-fade-in">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <i className="fas fa-check-circle text-green-500"></i>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-green-700">Your review has been submitted successfully!</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="mb-4">
                  <label className="block text-neutral-900 victorian-text mb-2">Your Rating</label>
                  <div className="flex star-rating mb-1">
                    {renderStarRating()}
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="reviewComment" className="block text-neutral-900 victorian-text mb-2">Your Review</label>
                  <textarea 
                    id="reviewComment"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    rows="4" 
                    className="w-full px-3 py-2 border-2 border-neutral-700 rounded-lg focus:ring-2 focus:ring-amber-800 focus:border-amber-800 bg-neutral-50"
                    placeholder="Share your thoughts about this book..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="bg-gradient-to-r from-green-900 to-neutral-700 text-white px-4 py-2 rounded-md font-medium transition-colors hover:shadow-md"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>
          
          {/* Reviews List */}
          <div className="space-y-6">
            {book.reviews.length > 0 ? (
              book.reviews.map((review, index) => (
                <div 
                  key={review.id || index} 
                  className="animate-fade-in" 
                  style={{ animationDelay: `${Math.min(index * 0.1, 0.5)}s` }}
                >
                  <ReviewItem review={review} />
                </div>
              ))
            ) : (
              <div className="text-center py-6 bg-neutral-50 rounded-lg border border-neutral-700">
                <i className="far fa-comment text-3xl text-neutral-700 mb-2"></i>
                <p className="text-neutral-700 victorian-text">No reviews yet. Be the first to share your thoughts about this literary work!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetailPage;
