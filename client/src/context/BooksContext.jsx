import { createContext, useState, useEffect } from 'react';
import { books as initialBooks } from '../data/mockData';

export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState(initialBooks);
  const [filteredBooks, setFilteredBooks] = useState(initialBooks);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Effect for searching and filtering
  useEffect(() => {
    let result = [...books];
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(book => 
        book.title.toLowerCase().includes(term) || 
        book.author.toLowerCase().includes(term)
      );
    }
    
    // Filter by category
    if (activeCategory && activeCategory !== 'All') {
      result = result.filter(book => 
        book.categories && book.categories.includes(activeCategory)
      );
    }
    
    setFilteredBooks(result);
  }, [books, searchTerm, activeCategory]);

  // Function to add a new book
  const addBook = (newBook) => {
    const bookToAdd = {
      ...newBook,
      id: books.length + 1,
      rating: 0,
      reviews: []
    };
    
    setBooks([...books, bookToAdd]);
    return bookToAdd;
  };

  // Function to add a review to a book
  const addReview = (bookId, review) => {
    const updatedBooks = books.map(book => {
      if (book.id === bookId) {
        // Calculate new rating average
        const totalRatings = book.reviews.reduce((sum, r) => sum + r.rating, 0) + review.rating;
        const newRating = +(totalRatings / (book.reviews.length + 1)).toFixed(1);
        
        return {
          ...book,
          reviews: [...book.reviews, { ...review, id: Date.now() }],
          rating: newRating
        };
      }
      return book;
    });
    
    setBooks(updatedBooks);
  };

  // Get a book by ID
  const getBook = (id) => {
    return books.find(book => book.id === Number(id)) || null;
  };

  return (
    <BooksContext.Provider
      value={{
        books,
        filteredBooks,
        searchTerm,
        setSearchTerm,
        activeCategory,
        setActiveCategory,
        addBook,
        addReview,
        getBook
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};
