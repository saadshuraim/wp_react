import { useContext, useEffect, useState } from 'react';
import { Link } from 'wouter';
import { BooksContext } from '../context/BooksContext';
import { useAuth } from '../hooks/useAuth';
import { useFavorites } from '../hooks/useFavorites';
import BookCard from '../components/BookCard';

const FavoritesPage = () => {
  const { books } = useContext(BooksContext);
  const { isAuthenticated } = useAuth();
  const { favorites } = useFavorites();
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (isAuthenticated) {
      // Get favorite books from the favorites IDs
      const favBooks = books.filter(book => favorites.includes(book.id));
      setFavoriteBooks(favBooks);
    } else {
      setFavoriteBooks([]);
    }
    setLoading(false);
  }, [books, favorites, isAuthenticated]);
  
  if (!isAuthenticated) {
    return (
      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 animate-fade-in">
        <div className="flex">
          <div className="flex-shrink-0">
            <i className="fas fa-exclamation-triangle text-yellow-500"></i>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              You need to be logged in to view your favorites.
            </p>
            <p className="mt-2">
              <Link href="/login" className="text-yellow-700 font-medium underline">
                Login now
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <section className="page-transition">
      <h1 className="text-3xl font-heading font-bold text-primary mb-6">Your Favorite Books</h1>
      
      {favoriteBooks.length === 0 ? (
        <div className="bg-neutral-light p-8 rounded-lg text-center animate-fade-in">
          <div className="text-6xl text-neutral-dark mb-4">
            <i className="far fa-heart"></i>
          </div>
          <h2 className="text-xl font-semibold text-neutral-dark mb-2">No Favorites Yet</h2>
          <p className="text-neutral-dark mb-4">You haven't added any books to your favorites.</p>
          <Link href="/" className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md font-medium inline-block transition-colors">
            Browse Books
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteBooks.map((book, index) => (
            <div 
              key={book.id} 
              className="animate-fade-in" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <BookCard book={book} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default FavoritesPage;
