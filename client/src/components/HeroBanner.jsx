import { Link } from 'wouter';

const HeroBanner = () => {
  return (
    <div className="bg-gradient-to-r from-primary to-secondary rounded-xl shadow-lg mb-8 overflow-hidden">
      <div className="md:flex items-center">
        <div className="p-8 md:w-2/3">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4 animate-fade-in">
            Welcome to BookHaven
          </h1>
          <p className="text-white/90 mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Discover a world of knowledge curated by the AI Department at FAST University Karachi.
          </p>
          <Link href="/#books-section">
            <a className="bg-accent hover:bg-accent-dark text-white px-6 py-2 rounded-md font-medium transition-colors inline-block animate-fade-in" style={{ animationDelay: '0.4s' }}>
              Explore Books
            </a>
          </Link>
        </div>
        <div className="hidden md:block md:w-1/3">
          <img 
            src="https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
            alt="Books collection" 
            className="h-full w-full object-cover" 
          />
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
