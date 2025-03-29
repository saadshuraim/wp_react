import { useState, useContext } from 'react';
import { useLocation, Link } from 'wouter';
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
  
  // Animated clock icon from HomePage
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
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return (
      <section className="page-transition max-w-7xl mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="parchment-bg p-8 rounded-lg shadow-md border-2 border-amber-800">
            <div className="text-center mb-8">
              <i className="fas fa-exclamation-triangle text-3xl text-amber-800 mb-4"></i>
              <h2 className="text-2xl font-bold victorian-text text-neutral-900 mb-4">
                Access Restricted
              </h2>
              <p className="text-neutral-900 victorian-text mb-8">
                You must be a registered member of our library to contribute a new literary work.
              </p>
              
              <div className="mt-6">
                <Link href="/login" 
                  className="bg-gradient-to-r from-green-900 to-neutral-700 text-white px-6 py-3 rounded-md font-medium inline-block transition-colors hover:shadow-md text-lg z-50 relative"
                >
                  Proceed to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
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
    const defaultCoverUrl = 'httpss://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80';
    
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
    <section className="page-transition max-w-7xl mx-auto px-4">
      <div className="mb-6 mt-8">
        <a href="/" 
           onClick={(e) => { e.preventDefault(); setLocation('/'); }}
           className="inline-flex items-center quill-hover text-neutral-900 hover:text-accent-gold transition-colors">
          <i className="fas fa-arrow-left mr-2"></i> Return to Library
        </a>
      </div>
      
      <div className="parchment-bg rounded-lg victorian-border relative p-6 shadow-md max-w-2xl mx-auto">
        {/* Decorative corner elements */}
        <div className="absolute top-0 left-0 w-12 md:w-16 h-12 md:h-16 opacity-20 hidden sm:block">
          <svg viewBox="0 0 100 100" fill="none" xmlns="https://www.w3.org/2000/svg">
            <path d="M0 0 L100 0 L100 20 L20 20 L20 100 L0 100 Z" fill="#2D3A25"/>
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 w-12 md:w-16 h-12 md:h-16 opacity-20 transform rotate-180 hidden sm:block">
          <svg viewBox="0 0 100 100" fill="none" xmlns="https://www.w3.org/2000/svg">
            <path d="M0 0 L100 0 L100 20 L20 20 L20 100 L0 100 Z" fill="#2D3A25"/>
          </svg>
        </div>
        
        <div className="relative z-10">
          <h1 className="text-3xl font-heading victorian-text font-bold text-neutral-900 mb-6 flex items-center">
            <ClockIcon /> <span className="align-middle">Catalogue a New Literary Work</span>
          </h1>
          
          <div className="ornate-divider">
            <span></span>
          </div>
          
          <form 
            className="animate-fade-in mt-6"
            onSubmit={handleSubmit}
          >
            <div className="mb-6">
              <label htmlFor="bookTitle" className="block text-neutral-900 victorian-text mb-2">
                Title <span className="text-amber-800">*</span>
              </label>
              <input 
                type="text" 
                id="bookTitle" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border-2 border-neutral-700 rounded-lg focus:ring-2 focus:ring-amber-800 focus:border-amber-800 bg-neutral-50"
                placeholder="Enter the title of the literary work"
              />
              {errors.title && (
                <div className="text-amber-800 text-sm mt-1 victorian-text">{errors.title}</div>
              )}
            </div>
            
            <div className="mb-6">
              <label htmlFor="bookAuthor" className="block text-neutral-900 victorian-text mb-2">
                Author <span className="text-amber-800">*</span>
              </label>
              <input 
                type="text" 
                id="bookAuthor" 
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3 py-2 border-2 border-neutral-700 rounded-lg focus:ring-2 focus:ring-amber-800 focus:border-amber-800 bg-neutral-50"
                placeholder="Enter the author's full name"
              />
              {errors.author && (
                <div className="text-amber-800 text-sm mt-1 victorian-text">{errors.author}</div>
              )}
            </div>
            
            <div className="mb-6">
              <label htmlFor="bookDescription" className="block text-neutral-900 victorian-text mb-2">
                Description <span className="text-amber-800">*</span>
              </label>
              <textarea 
                id="bookDescription" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="5" 
                className="w-full px-3 py-2 border-2 border-neutral-700 rounded-lg focus:ring-2 focus:ring-amber-800 focus:border-amber-800 bg-neutral-50"
                placeholder="Enter a thorough description of the literary work"
              ></textarea>
              {errors.description && (
                <div className="text-amber-800 text-sm mt-1 victorian-text">{errors.description}</div>
              )}
            </div>
            
            <div className="mb-6">
              <label htmlFor="bookCoverUrl" className="block text-neutral-900 victorian-text mb-2">Cover Image URL</label>
              <input 
                type="url" 
                id="bookCoverUrl" 
                value={coverUrl}
                onChange={(e) => setCoverUrl(e.target.value)}
                className="w-full px-3 py-2 border-2 border-neutral-700 rounded-lg focus:ring-2 focus:ring-amber-800 focus:border-amber-800 bg-neutral-50"
                placeholder="Enter URL to the book's cover illustration"
              />
              <p className="text-sm text-neutral-700 mt-1 victorian-text">Leave empty to use a default cover image from our collection</p>
            </div>
            
            <div className="mb-8">
              <label className="block text-neutral-900 victorian-text mb-3">Literary Categories</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.filter(c => c !== 'All').map(category => (
                  <label key={category} className="inline-flex items-center victorian-text text-neutral-700 hover:text-neutral-900 transition-colors">
                    <input 
                      type="checkbox" 
                      className="form-checkbox text-amber-800 h-5 w-5 border-neutral-700 rounded focus:ring-amber-800" 
                      value={category}
                      checked={selectedCategories.includes(category)}
                      onChange={handleCategoryChange}
                    />
                    <span className="ml-2">{category}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="ornate-divider">
              <span></span>
            </div>
            
            <div className="flex justify-between mt-6">
              <button 
                type="button" 
                onClick={handleCancel}
                className="bg-neutral-50 border border-neutral-700 text-neutral-900 hover:bg-neutral-100 px-4 py-2 rounded-md font-medium transition-colors victorian-text"
              >
                Cancel Addition
              </button>
              <button 
                type="submit" 
                className="bg-gradient-to-r from-green-900 to-neutral-700 text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center hover:shadow-md"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 mr-2 relative">
                      <svg viewBox="0 0 100 100" xmlns="https://www.w3.org/2000/svg" className="animate-spin">
                        <circle cx="50" cy="50" r="45" fill="transparent" stroke="currentColor" strokeWidth="8" strokeDasharray="150" strokeDashoffset="25" />
                      </svg>
                    </div>
                    Cataloguing...
                  </>
                ) : (
                  <>
                    <i className="fas fa-feather-alt mr-2"></i> Add to Collection
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddBookPage;
