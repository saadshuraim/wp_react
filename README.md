# BookHaven - Online Bookstore Application

## Project Information
- **Course:** Web Programming
- **Assignment:** 02
- **Assigned By:** UBAID ULLAH
- **Student:** Saad Rashid
- **Roll No:** 22k-4108
- **Section:** BSAI-6B
- **University:** FAST University, Karachi

## Project Overview
BookHaven is a fully functional online bookstore platform built with React. It provides users with a rich, interactive experience to browse, search, and manage books. The application implements all required features including user authentication, book management, favorites system, and reviews functionality.

## Features Implemented

### 1. Homepage with Book Browsing and Search
- Dynamic display of available books with cover images, titles, and authors
- Advanced search functionality with debounced input for performance optimization
- Genre-based filtering system
- Responsive grid layout with elegant book card designs

### 2. Book Detail Pages
- Comprehensive book information display (author, genre, description, etc.)
- Review system allowing users to:
  - Read existing reviews
  - Submit new reviews with ratings
  - See average ratings
- Related books recommendation section
- Interactive UI elements

### 3. Book Addition System
- Complete form with validation for adding new books to the collection
- Support for book details including:
  - Title, author, genre, publication date
  - Cover image URL
  - Description and other metadata
- Client-side validation with error messaging

### 4. Navigation System
- React Router implementation with nested routes
- Responsive navigation bar design
- Mobile-friendly hamburger menu for smaller screens
- Breadcrumb navigation for improved UX

### 5. State Management
- Comprehensive React Hooks implementation:
  - useState for local component state
  - useEffect for side effects and lifecycle management
  - useContext for global state management
  - Custom hooks for reusable logic
- Context API for global state (Authentication and Books contexts)

### 6. User Authentication
- Complete login/registration system
- Protected routes for authenticated users
- User profile information display
- Secure authentication state persistence

### 7. Favorites System
- Ability to mark books as favorites
- Dedicated favorites page to view and manage favorite books
- Persistent favorites storage across sessions
- Remove from favorites functionality

## Technical Implementation

### Frontend Technologies
- React for component-based UI
- React Router for navigation
- Context API and Hooks for state management
- Tailwind CSS for styling
- Responsive design for all device sizes

### Design Features
- Clean and intuitive interface
- Custom book card designs that reflect book genres
- Elegant typography
- Decorative elements and animations

### Performance Optimizations
- Debounced search input
- Memoized components
- Conditional rendering
- Responsive image loading
- Accessibility considerations with ARIA attributes

## Running the Application
1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm run dev`
4. Open https://localhost:5173 in your browser

## Project Structure
- `/client/src/components`: Reusable UI components
- `/client/src/pages`: Main application pages
- `/client/src/context`: Context providers for global state
- `/client/src/hooks`: Custom React hooks
- `/client/src/services`: API service functions
- `/client/src/assets`: Static assets (images, icons)

## Conclusion
The BookHaven application successfully implements all the required features of the assignment while providing an engaging user experience. The project demonstrates proficiency in React development, including component architecture, state management, routing, and form handling. 