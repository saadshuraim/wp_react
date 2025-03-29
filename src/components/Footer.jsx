import { Link } from 'wouter';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="copper-bg relative mt-20 py-10 border-t-2 border-amber-900">
      {/* Decorative gear elements */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
        <div className="relative w-16 h-16">
          <svg viewBox="0 0 100 100" xmlns="https://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" fill="#B87333" stroke="#8B4513" strokeWidth="2" />
            <path d="M50,10 L55,50 L50,55 L45,50 Z M50,90 L45,50 L50,45 L55,50 Z M10,50 L50,45 L55,50 L50,55 Z M90,50 L50,55 L45,50 L50,45 Z" fill="#8B4513" />
            <circle cx="50" cy="50" r="10" fill="#8B4513" />
            <circle cx="50" cy="50" r="5" fill="#DAA520" />
          </svg>
        </div>
      </div>
      
      {/* Border pattern */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-900 via-amber-700 to-amber-900"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Site info */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4 steampunk-text text-amber-100">BookHaven</h2>
            <p className="text-amber-200 mb-4">
              Journey through literary history with our curated collection of books from every era, brought to you by the AI Department at FAST University Karachi.
            </p>
            <div className="flex flex-col space-y-2">
              <a href="httpss://github.com/saadshuraim" target="_blank" rel="noopener noreferrer" 
                 className="text-amber-200 hover:text-amber-100 transition-colors">
                <i className="fab fa-github mr-2"></i> github.com/saadshuraim
              </a>
              <a href="httpss://www.linkedin.com/in/saad-rashid-990724214/" target="_blank" rel="noopener noreferrer" 
                 className="text-amber-200 hover:text-amber-100 transition-colors">
                <i className="fab fa-linkedin mr-2"></i> linkedin.com/in/saad-rashid-990724214
              </a>
              <a href="mailto:k224108@nu.edu.pk" 
                 className="text-amber-200 hover:text-amber-100 transition-colors">
                <i className="fas fa-envelope mr-2"></i> k224108@nu.edu.pk
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 steampunk-text text-amber-100">Destinations</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-amber-200 hover:text-amber-100 transition-colors quill-hover">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="text-amber-200 hover:text-amber-100 transition-colors quill-hover">
                  Favorites
                </Link>
              </li>
              <li>
                <Link href="/add-book" className="text-amber-200 hover:text-amber-100 transition-colors quill-hover">
                  Add Book
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-amber-200 hover:text-amber-100 transition-colors quill-hover">
                  Login
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4 steampunk-text text-amber-100">Contact the Librarian</h3>
            <address className="not-italic">
              <p className="text-amber-200 mb-2">
                <i className="fas fa-map-marker-alt mr-2 text-amber-400"></i>
                FAST University Karachi
              </p>
              <p className="text-amber-200 mb-2">
                <i className="fas fa-envelope mr-2 text-amber-400"></i>
                <a href="mailto:info@bookhaven.com" className="hover:text-amber-100 transition-colors">
                  info@bookhaven.com
                </a>
              </p>
              <p className="text-amber-200">
                <i className="fas fa-phone mr-2 text-amber-400"></i>
                <a href="tel:+923001234567" className="hover:text-amber-100 transition-colors">
                  +92 300 1234567
                </a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-amber-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-amber-300 text-sm mb-4 md:mb-0 steampunk-text">
            &copy; {currentYear} BookHaven Time Travel. All rights reserved through the ages.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
