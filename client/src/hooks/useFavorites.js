import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const { isAuthenticated } = useAuth();
  
  // Load favorites from localStorage when auth state changes
  useEffect(() => {
    if (isAuthenticated) {
      const storedFavorites = localStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } else {
      setFavorites([]);
    }
  }, [isAuthenticated]);
  
  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (isAuthenticated && favorites.length > 0) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites, isAuthenticated]);
  
  // Add a book to favorites
  const addFavorite = (bookId) => {
    if (!isAuthenticated) return false;
    
    if (!favorites.includes(bookId)) {
      setFavorites([...favorites, bookId]);
      return true;
    }
    return false;
  };
  
  // Remove a book from favorites
  const removeFavorite = (bookId) => {
    if (!isAuthenticated) return false;
    
    if (favorites.includes(bookId)) {
      setFavorites(favorites.filter(id => id !== bookId));
      return true;
    }
    return false;
  };
  
  // Toggle favorite status
  const toggleFavorite = (bookId) => {
    if (!isAuthenticated) return false;
    
    if (favorites.includes(bookId)) {
      removeFavorite(bookId);
    } else {
      addFavorite(bookId);
    }
    return true;
  };
  
  // Check if a book is in favorites
  const isFavorite = (bookId) => {
    return favorites.includes(bookId);
  };
  
  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite
  };
};
