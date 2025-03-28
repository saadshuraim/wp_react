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
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!book) {
    return (
      <div className="text-center py-10">
        <i className="fas fa-exclamation-circle text-4xl text-red-500 mb-3"></i>
        <h2 className="text-2xl font-semibold mb-2">Book Not Found</h2>
        <p className="text-neutral-dark mb-6">The book you're looking for doesn't exist or has been removed.</p>
        <Link href="/" className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md font-medium transition-colors">
          Return to Homepage
        </Link>
      </div>
    );
  }
  
  // Generate star rating UI
  const renderStarRating = () => {
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      let starClass = "far fa-star cursor-pointer text-2xl mx-1 hover:text-accent transition-colors";
      
      if (i <= (hoverRating || rating)) {
        starClass = "fas fa-star cursor-pointer text-2xl mx-1 text-accent";
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
    <section className="animate-fade-in">
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center text-primary hover:text-primary-dark">
          <i className="fas fa-arrow-left mr-2"></i> Back to Books
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 p-6 flex justify-center">
            <img 
              src={book.coverImage} 
              alt={`Book cover for ${book.title}`} 
              className="w-full max-w-xs object-cover rounded-md shadow-md" 
            />
          </div>
          
          <div className="md:w-2/3 p-6">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-heading font-bold text-primary mb-2">{book.title}</h1>
              <button 
                onClick={handleToggleFavorite}
                className="text-2xl text-neutral-dark hover:text-accent transition-colors"
                aria-label={isFavorite(book.id) ? "Remove from favorites" : "Add to favorites"}
              >
                <i className={isFavorite(book.id) ? "fas fa-heart text-accent" : "far fa-heart"}></i>
              </button>
            </div>
            
            <p className="text-xl text-neutral-dark mb-4">{book.author}</p>
            
            <div className="flex items-center mb-6">
              <div className="star-rating flex text-xl">
                {Array.from({ length: Math.floor(book.rating) }).map((_, i) => (
                  <i key={`star-full-${i}`} className="fas fa-star text-accent"></i>
                ))}
                
                {book.rating % 1 >= 0.5 && (
                  <i className="fas fa-star-half-alt text-accent"></i>
                )}
                
                {Array.from({ length: 5 - Math.ceil(book.rating) }).map((_, i) => (
                  <i key={`star-empty-${i}`} className="far fa-star text-accent"></i>
                ))}
              </div>
              <span className="ml-2 text-neutral-dark">({book.rating.toFixed(1)}/5 from {book.reviews.length} reviews)</span>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-heading font-semibold text-primary mb-2">Description</h2>
              <p className="text-neutral-dark">{book.description}</p>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {book.categories.map(category => (
                <span key={category} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                  {category}
                </span>
              ))}
            </div>
            
            <div className="flex items-center text-sm text-neutral-dark">
              <span className="mr-4"><i className="far fa-calendar-alt mr-1"></i> Published: {book.published}</span>
              <span><i className="far fa-file-alt mr-1"></i> Pages: {book.pages}</span>
            </div>
          </div>
        </div>
        
        {/* Reviews Section */}
        <div className="border-t border-neutral p-6">
          <h2 className="text-2xl font-heading font-semibold text-primary mb-4">Reviews</h2>
          
          {/* Add Review Form */}
          <div className="mb-8 bg-neutral-light p-4 rounded-lg">
            {!isAuthenticated ? (
              <div className="py-2">
                <p className="text-neutral-dark mb-2">You need to be logged in to leave a review.</p>
                <Link href="/login" className="bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded-md text-sm font-medium inline-block transition-colors">
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
                  <label className="block text-neutral-dark mb-2">Your Rating</label>
                  <div className="flex star-rating mb-1">
                    {renderStarRating()}
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="reviewComment" className="block text-neutral-dark mb-2">Your Review</label>
                  <textarea 
                    id="reviewComment"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    rows="4" 
                    className="w-full px-3 py-2 border border-neutral rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Share your thoughts about this book..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md font-medium transition-colors"
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
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ReviewItem review={review} />
                </div>
              ))
            ) : (
              <div className="text-center py-6 bg-neutral-light rounded-lg">
                <i className="far fa-comment text-3xl text-neutral-dark mb-2"></i>
                <p className="text-neutral-dark">No reviews yet. Be the first to review this book!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetailPage;
