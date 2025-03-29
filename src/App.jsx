import { useState, useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import { AuthProvider } from "./context/AuthContext";
import { BooksProvider } from "./context/BooksContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import BookDetailPage from "./pages/BookDetailPage";
import AddBookPage from "./pages/AddBookPage";
import FavoritesPage from "./pages/FavoritesPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/not-found";

function App() {
  const [location] = useLocation();

  // Apply page transition animation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <AuthProvider>
      <BooksProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          
          <main className="flex-grow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <Switch>
                <Route path="/" component={HomePage} />
                <Route path="/book/:id" component={BookDetailPage} />
                <Route path="/add-book" component={AddBookPage} />
                <Route path="/favorites" component={FavoritesPage} />
                <Route path="/login" component={LoginPage} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </main>
          
          <Footer />
        </div>
      </BooksProvider>
    </AuthProvider>
  );
}

export default App;
