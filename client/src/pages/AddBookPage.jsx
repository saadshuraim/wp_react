import { useState, useContext } from 'react';
import { useLocation } from 'wouter';
import { BooksContext } from '../context/BooksContext';
import { useAuth } from '../hooks/useAuth';
import { categories } from '../data/mockData';

const AddBookPage = () => {
  const [, setLocation] = useLocation();
  const { addBook } = useContext(BooksContext);
  const { isAuthenticated } = useAuth();
  
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return (
      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6 animate-fade-in">
        <div className="flex">
          <div className="flex-shrink-0">
            <i className="fas fa-exclamation-triangle text-yellow-500"></i>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              You need to be logged in to add a new book.
            </p>
            <p className="mt-2">
              <a 
                href="/login" 
                onClick={(e) => { e.preventDefault(); setLocation('/login'); }} 
                className="text-yellow-700 font-medium underline"
              >
                Login now
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    
    if (e.target.checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!author.trim()) {
      newErrors.author = 'Author is required';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Use default cover image if none provided
    const defaultCoverUrl = 'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80';
    
    const newBook = {
      title,
      author,
      description,
      coverImage: coverUrl || defaultCoverUrl,
      categories: selectedCategories.length > 0 ? selectedCategories : ['Uncategorized'],
      published: new Date().getFullYear().toString(),
      pages: Math.floor(Math.random() * 500) + 100 // Random page count for demo purposes
    };
    
    // Simulate API call delay
    setTimeout(() => {
      addBook(newBook);
      setIsSubmitting(false);
      
      // Reset form
      setTitle('');
      setAuthor('');
      setDescription('');
      setCoverUrl('');
      setSelectedCategories([]);
      
      // Redirect to homepage
      setLocation('/');
    }, 1000);
  };
  
  const handleCancel = () => {
    setLocation('/');
  };
  
  return (
    <section className="page-transition max-w-2xl mx-auto">
      <h1 className="text-3xl font-heading font-bold text-primary mb-6">Add New Book</h1>
      
      <form 
        className="bg-white rounded-lg shadow-lg p-6 animate-fade-in"
        onSubmit={handleSubmit}
      >
        <div className="mb-6">
          <label htmlFor="bookTitle" className="block text-neutral-dark mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            id="bookTitle" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-neutral rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Enter book title"
          />
          {errors.title && (
            <div className="text-red-500 text-sm mt-1">{errors.title}</div>
          )}
        </div>
        
        <div className="mb-6">
          <label htmlFor="bookAuthor" className="block text-neutral-dark mb-2">
            Author <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            id="bookAuthor" 
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-3 py-2 border border-neutral rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Enter author name"
          />
          {errors.author && (
            <div className="text-red-500 text-sm mt-1">{errors.author}</div>
          )}
        </div>
        
        <div className="mb-6">
          <label htmlFor="bookDescription" className="block text-neutral-dark mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea 
            id="bookDescription" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="5" 
            className="w-full px-3 py-2 border border-neutral rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Enter book description"
          ></textarea>
          {errors.description && (
            <div className="text-red-500 text-sm mt-1">{errors.description}</div>
          )}
        </div>
        
        <div className="mb-6">
          <label htmlFor="bookCoverUrl" className="block text-neutral-dark mb-2">Cover Image URL</label>
          <input 
            type="url" 
            id="bookCoverUrl" 
            value={coverUrl}
            onChange={(e) => setCoverUrl(e.target.value)}
            className="w-full px-3 py-2 border border-neutral rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Enter URL to book cover image"
          />
          <p className="text-sm text-neutral-dark mt-1">Leave empty to use a default cover image</p>
        </div>
        
        <div className="mb-6">
          <label className="block text-neutral-dark mb-2">Categories</label>
          <div className="flex flex-wrap gap-2">
            {categories.filter(c => c !== 'All').map(category => (
              <label key={category} className="inline-flex items-center">
                <input 
                  type="checkbox" 
                  className="form-checkbox text-primary h-5 w-5" 
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={handleCategoryChange}
                />
                <span className="ml-2">{category}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end">
          <button 
            type="button" 
            onClick={handleCancel}
            className="bg-neutral hover:bg-neutral-dark text-primary px-4 py-2 rounded-md font-medium mr-2 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <i className="fas fa-plus mr-1"></i> Add Book
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddBookPage;
