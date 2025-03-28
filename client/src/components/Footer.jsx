import { Link } from 'wouter';

const Footer = () => {
  return (
    <footer className="bg-primary text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center">
              <svg className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="ml-2 font-heading font-bold text-xl">BookHaven</span>
            </div>
            <p className="mt-2 text-sm text-white/70">
              FAST University Karachi<br />
              Artificial Intelligence Department<br />
              Saad Rashid | 22K-4108 | BSAI-6B<br />
              Assignment 2 (React App) - Web Programming
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Navigation</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="/" className="text-white/70 hover:text-white">Home</Link></li>
                <li><Link href="/add-book" className="text-white/70 hover:text-white">Add Book</Link></li>
                <li><Link href="/favorites" className="text-white/70 hover:text-white">Favorites</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Categories</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="/" className="text-white/70 hover:text-white">Artificial Intelligence</Link></li>
                <li><Link href="/" className="text-white/70 hover:text-white">Computer Science</Link></li>
                <li><Link href="/" className="text-white/70 hover:text-white">Pakistani Literature</Link></li>
                <li><Link href="/" className="text-white/70 hover:text-white">Fiction</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Connect</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="https://github.com" className="text-white/70 hover:text-white">GitHub</a></li>
                <li><a href="https://twitter.com" className="text-white/70 hover:text-white">Twitter</a></li>
                <li><a href="https://facebook.com" className="text-white/70 hover:text-white">Facebook</a></li>
                <li><a href="https://linkedin.com" className="text-white/70 hover:text-white">LinkedIn</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/10 md:flex md:items-center md:justify-between">
          <p className="text-sm text-white/70">
            &copy; {new Date().getFullYear()} BookHaven - FAST University Karachi AI Department. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="https://github.com" className="text-white/70 hover:text-white">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://twitter.com" className="text-white/70 hover:text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://facebook.com" className="text-white/70 hover:text-white">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://linkedin.com" className="text-white/70 hover:text-white">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
